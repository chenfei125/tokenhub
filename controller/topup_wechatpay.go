package controller

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting"
	"github.com/QuantumNous/new-api/setting/operation_setting"
	"github.com/QuantumNous/new-api/setting/system_setting"

	"github.com/gin-gonic/gin"
	"github.com/go-pay/gopay"
	wechat "github.com/go-pay/gopay/wechat/v3"
	"github.com/thanhpk/randstr"
)

const PaymentMethodWechatPay = "wechatpay"

type WechatPayRequest struct {
	Amount int64 `json:"amount"`
}

func newWechatPayClient() (*wechat.ClientV3, error) {
	if setting.WechatPayMchId == "" || setting.WechatPayApiV3Key == "" ||
		setting.WechatPaySerialNo == "" || setting.WechatPayPrivateKey == "" {
		return nil, fmt.Errorf("微信支付配置不完整")
	}
	client, err := wechat.NewClientV3(
		setting.WechatPayMchId,
		setting.WechatPaySerialNo,
		setting.WechatPayApiV3Key,
		setting.WechatPayPrivateKey,
	)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func getWechatPayMinTopup() int64 {
	minTopup := setting.WechatPayMinTopUp
	if operation_setting.GetQuotaDisplayType() == operation_setting.QuotaDisplayTypeTokens {
		minTopup = minTopup * int(common.QuotaPerUnit)
	}
	return int64(minTopup)
}

func getWechatPayMoney(amount float64, group string) float64 {
	originalAmount := amount
	if operation_setting.GetQuotaDisplayType() == operation_setting.QuotaDisplayTypeTokens {
		amount = amount / common.QuotaPerUnit
	}
	topupGroupRatio := common.GetTopupGroupRatio(group)
	if topupGroupRatio == 0 {
		topupGroupRatio = 1
	}
	discount := 1.0
	if ds, ok := operation_setting.GetPaymentSetting().AmountDiscount[int(originalAmount)]; ok {
		if ds > 0 {
			discount = ds
		}
	}
	return amount * setting.WechatPayUnitPrice * topupGroupRatio * discount
}

func RequestWechatPayAmount(c *gin.Context) {
	var req WechatPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "参数错误"})
		return
	}
	if req.Amount < getWechatPayMinTopup() {
		c.JSON(200, gin.H{"message": "error", "data": fmt.Sprintf("充值数量不能小于 %d", getWechatPayMinTopup())})
		return
	}
	id := c.GetInt("id")
	group, err := model.GetUserGroup(id, true)
	if err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "获取用户分组失败"})
		return
	}
	payMoney := getWechatPayMoney(float64(req.Amount), group)
	if payMoney <= 0.01 {
		c.JSON(200, gin.H{"message": "error", "data": "充值金额过低"})
		return
	}
	c.JSON(200, gin.H{"message": "success", "data": strconv.FormatFloat(payMoney, 'f', 2, 64)})
}

func RequestWechatPayPay(c *gin.Context) {
	var req WechatPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "参数错误"})
		return
	}
	if req.Amount < getWechatPayMinTopup() {
		c.JSON(200, gin.H{"message": "error", "data": fmt.Sprintf("充值数量不能小于 %d", getWechatPayMinTopup())})
		return
	}
	if req.Amount > 10000 {
		c.JSON(200, gin.H{"message": "error", "data": "充值数量不能大于 10000"})
		return
	}

	id := c.GetInt("id")
	group, err := model.GetUserGroup(id, true)
	if err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "获取用户分组失败"})
		return
	}

	payMoney := getWechatPayMoney(float64(req.Amount), group)
	if payMoney <= 0.01 {
		c.JSON(200, gin.H{"message": "error", "data": "充值金额过低"})
		return
	}

	// 微信支付金额单位为分，最低1分
	totalFen := int64(payMoney * 100)
	if totalFen <= 0 {
		totalFen = 1
	}

	tradeNo := fmt.Sprintf("wechat-%d-%d-%s", id, time.Now().UnixMilli(), randstr.String(6))

	client, err := newWechatPayClient()
	if err != nil {
		log.Println("创建微信支付客户端失败:", err)
		c.JSON(200, gin.H{"message": "error", "data": "微信支付配置错误"})
		return
	}

	notifyUrl := setting.WechatPayNotifyUrl
	if notifyUrl == "" {
		notifyUrl = system_setting.ServerAddress + "/api/wechatpay/notify"
	}

	appId := setting.WechatPayAppId

	// 判断是否为手机端，选择 H5 或 Native
	isMobile := isMobileUserAgent(c.GetHeader("User-Agent"))

	if isMobile {
		// H5 支付（手机浏览器）
		bm := make(gopay.BodyMap)
		bm.Set("appid", appId)
		bm.Set("mchid", setting.WechatPayMchId)
		bm.Set("description", common.SystemName+"充值")
		bm.Set("out_trade_no", tradeNo)
		bm.Set("notify_url", notifyUrl)
		bm.SetBodyMap("amount", func(b gopay.BodyMap) {
			b.Set("total", totalFen)
			b.Set("currency", "CNY")
		})
		bm.SetBodyMap("scene_info", func(b gopay.BodyMap) {
			b.Set("payer_client_ip", c.ClientIP())
			b.SetBodyMap("h5_info", func(b gopay.BodyMap) {
				b.Set("type", "Wap")
			})
		})

		rsp, err := client.V3TransactionH5(context.Background(), bm)
		if err != nil || rsp.Code != 0 {
			log.Println("拉起微信H5支付失败:", err, rsp)
			c.JSON(200, gin.H{"message": "error", "data": "拉起支付失败"})
			return
		}

		topUp := &model.TopUp{
			UserId:        id,
			Amount:        req.Amount,
			Money:         payMoney,
			TradeNo:       tradeNo,
			PaymentMethod: PaymentMethodWechatPay,
			CreateTime:    time.Now().Unix(),
			Status:        common.TopUpStatusPending,
		}
		if err = topUp.Insert(); err != nil {
			c.JSON(200, gin.H{"message": "error", "data": "创建订单失败"})
			return
		}

		returnUrl := setting.WechatPayReturnUrl
		if returnUrl == "" {
			returnUrl = system_setting.ServerAddress + "/console/topup"
		}

		c.JSON(200, gin.H{
			"message": "success",
			"data": gin.H{
				"pay_type": "h5",
				"pay_url":  rsp.Response.H5Url + "&redirect_url=" + returnUrl,
				"trade_no": tradeNo,
			},
		})
	} else {
		// Native 支付（PC 扫码）
		bm := make(gopay.BodyMap)
		bm.Set("appid", appId)
		bm.Set("mchid", setting.WechatPayMchId)
		bm.Set("description", common.SystemName+"充值")
		bm.Set("out_trade_no", tradeNo)
		bm.Set("notify_url", notifyUrl)
		bm.SetBodyMap("amount", func(b gopay.BodyMap) {
			b.Set("total", totalFen)
			b.Set("currency", "CNY")
		})

		rsp, err := client.V3TransactionNative(context.Background(), bm)
		if err != nil || rsp.Code != 0 {
			log.Println("拉起微信Native支付失败:", err, rsp)
			c.JSON(200, gin.H{"message": "error", "data": "拉起支付失败"})
			return
		}

		topUp := &model.TopUp{
			UserId:        id,
			Amount:        req.Amount,
			Money:         payMoney,
			TradeNo:       tradeNo,
			PaymentMethod: PaymentMethodWechatPay,
			CreateTime:    time.Now().Unix(),
			Status:        common.TopUpStatusPending,
		}
		if err = topUp.Insert(); err != nil {
			c.JSON(200, gin.H{"message": "error", "data": "创建订单失败"})
			return
		}

		c.JSON(200, gin.H{
			"message": "success",
			"data": gin.H{
				"pay_type": "native",
				"code_url": rsp.Response.CodeUrl, // 前端用 qrcode 渲染二维码
				"trade_no": tradeNo,
			},
		})
	}
}

// WechatPayNotify 处理微信支付回调通知
func WechatPayNotify(c *gin.Context) {
	// 解析通知
	notifyReq, err := wechat.V3ParseNotify(c.Request)
	if err != nil {
		log.Println("解析微信支付通知失败:", err)
		c.JSON(http.StatusBadRequest, gin.H{"code": "FAIL", "message": "解析失败"})
		return
	}

	// 解密通知内容（AES-GCM，使用 APIv3Key）
	result, err := notifyReq.DecryptPayCipherText(setting.WechatPayApiV3Key)
	if err != nil {
		log.Println("微信支付通知解密失败:", err)
		c.JSON(http.StatusBadRequest, gin.H{"code": "FAIL", "message": "解密失败"})
		return
	}

	if result.TradeState != "SUCCESS" {
		c.JSON(http.StatusOK, gin.H{"code": "SUCCESS", "message": "OK"})
		return
	}

	outTradeNo := result.OutTradeNo

	LockOrder(outTradeNo)
	defer UnlockOrder(outTradeNo)

	if err := model.RechargeWechatPay(outTradeNo); err != nil {
		log.Println("微信支付充值失败:", err, outTradeNo)
	} else {
		log.Printf("微信支付充值成功: %s", outTradeNo)
	}

	c.JSON(http.StatusOK, gin.H{"code": "SUCCESS", "message": "OK"})
}

// isMobileUserAgent 判断是否为手机端
func isMobileUserAgent(ua string) bool {
	mobileKeywords := []string{"Mobile", "Android", "iPhone", "iPad", "Windows Phone"}
	for _, kw := range mobileKeywords {
		for i := 0; i+len(kw) <= len(ua); i++ {
			if ua[i:i+len(kw)] == kw {
				return true
			}
		}
	}
	return false
}

// QueryWechatPayOrder 查询订单状态（供前端轮询）
func QueryWechatPayOrder(c *gin.Context) {
	tradeNo := c.Query("trade_no")
	if tradeNo == "" {
		c.JSON(200, gin.H{"message": "error", "data": "缺少订单号"})
		return
	}
	userId := c.GetInt("id")
	topUp := model.GetTopUpByTradeNo(tradeNo)
	if topUp == nil || topUp.UserId != userId {
		c.JSON(200, gin.H{"message": "error", "data": "订单不存在"})
		return
	}
	c.JSON(200, gin.H{"message": "success", "data": gin.H{"status": topUp.Status, "trade_no": tradeNo}})
}

// 消除 strconv unused import
var _ = strconv.Itoa
