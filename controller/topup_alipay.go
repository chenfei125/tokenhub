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
	"github.com/go-pay/gopay/alipay"
	"github.com/thanhpk/randstr"
)

const PaymentMethodAlipay = "alipay"

type AlipayPayRequest struct {
	Amount int64 `json:"amount"`
}

func newAlipayClient() (*alipay.Client, error) {
	if setting.AlipayAppId == "" || setting.AlipayPrivateKey == "" || setting.AlipayPublicKey == "" {
		return nil, fmt.Errorf("支付宝配置不完整")
	}
	client, err := alipay.NewClient(setting.AlipayAppId, setting.AlipayPrivateKey, !setting.AlipaySandbox)
	if err != nil {
		return nil, err
	}
	// 设置支付宝公钥用于自动验签
	client.AutoVerifySign([]byte(setting.AlipayPublicKey))
	return client, nil
}

func getAlipayMinTopup() int64 {
	minTopup := setting.AlipayMinTopUp
	if operation_setting.GetQuotaDisplayType() == operation_setting.QuotaDisplayTypeTokens {
		minTopup = minTopup * int(common.QuotaPerUnit)
	}
	return int64(minTopup)
}

func getAlipayPayMoney(amount float64, group string) float64 {
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
	return amount * setting.AlipayUnitPrice * topupGroupRatio * discount
}

func RequestAlipayAmount(c *gin.Context) {
	var req AlipayPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "参数错误"})
		return
	}
	if req.Amount < getAlipayMinTopup() {
		c.JSON(200, gin.H{"message": "error", "data": fmt.Sprintf("充值数量不能小于 %d", getAlipayMinTopup())})
		return
	}
	id := c.GetInt("id")
	group, err := model.GetUserGroup(id, true)
	if err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "获取用户分组失败"})
		return
	}
	payMoney := getAlipayPayMoney(float64(req.Amount), group)
	if payMoney <= 0.01 {
		c.JSON(200, gin.H{"message": "error", "data": "充值金额过低"})
		return
	}
	c.JSON(200, gin.H{"message": "success", "data": strconv.FormatFloat(payMoney, 'f', 2, 64)})
}

func RequestAlipayPay(c *gin.Context) {
	var req AlipayPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(200, gin.H{"message": "error", "data": "参数错误"})
		return
	}
	if req.Amount < getAlipayMinTopup() {
		c.JSON(200, gin.H{"message": "error", "data": fmt.Sprintf("充值数量不能小于 %d", getAlipayMinTopup())})
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

	payMoney := getAlipayPayMoney(float64(req.Amount), group)
	if payMoney <= 0.01 {
		c.JSON(200, gin.H{"message": "error", "data": "充值金额过低"})
		return
	}

	tradeNo := fmt.Sprintf("alipay-%d-%d-%s", id, time.Now().UnixMilli(), randstr.String(6))

	client, err := newAlipayClient()
	if err != nil {
		log.Println("创建支付宝客户端失败:", err)
		c.JSON(200, gin.H{"message": "error", "data": "支付宝配置错误"})
		return
	}

	returnUrl := setting.AlipayReturnUrl
	if returnUrl == "" {
		returnUrl = system_setting.ServerAddress + "/console/topup"
	}
	notifyUrl := setting.AlipayNotifyUrl
	if notifyUrl == "" {
		notifyUrl = system_setting.ServerAddress + "/api/alipay/notify"
	}

	bm := make(gopay.BodyMap)
	bm.Set("subject", common.SystemName+"充值")
	bm.Set("out_trade_no", tradeNo)
	bm.Set("total_amount", strconv.FormatFloat(payMoney, 'f', 2, 64))
	bm.Set("return_url", returnUrl)
	bm.Set("notify_url", notifyUrl)

	payUrl, err := client.TradePagePay(context.Background(), bm)
	if err != nil {
		log.Println("拉起支付宝支付失败:", err)
		c.JSON(200, gin.H{"message": "error", "data": "拉起支付失败"})
		return
	}

	topUp := &model.TopUp{
		UserId:        id,
		Amount:        req.Amount,
		Money:         payMoney,
		TradeNo:       tradeNo,
		PaymentMethod: PaymentMethodAlipay,
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
			"pay_url":  payUrl,
			"trade_no": tradeNo,
		},
	})
}

// AlipayNotify 处理支付宝异步通知
func AlipayNotify(c *gin.Context) {
	// 解析通知内容
	notifyReq, err := alipay.ParseNotifyResult(c.Request)
	if err != nil {
		log.Println("解析支付宝通知失败:", err)
		c.String(http.StatusBadRequest, "fail")
		return
	}

	// 验证签名
	ok, err := alipay.VerifySign(setting.AlipayPublicKey, notifyReq)
	if err != nil || !ok {
		log.Println("支付宝通知验签失败:", err)
		c.String(http.StatusBadRequest, "fail")
		return
	}

	// 只处理支付成功状态
	if notifyReq.TradeStatus != "TRADE_SUCCESS" && notifyReq.TradeStatus != "TRADE_FINISHED" {
		c.String(http.StatusOK, "success")
		return
	}

	outTradeNo := notifyReq.OutTradeNo

	LockOrder(outTradeNo)
	defer UnlockOrder(outTradeNo)

	if err := model.RechargeAlipay(outTradeNo); err != nil {
		log.Println("支付宝充值失败:", err, outTradeNo)
	} else {
		log.Printf("支付宝充值成功: %s", outTradeNo)
	}

	c.String(http.StatusOK, "success")
}

// QueryAlipayOrder 查询订单状态（供前端轮询）
func QueryAlipayOrder(c *gin.Context) {
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
