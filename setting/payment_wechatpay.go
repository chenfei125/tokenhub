package setting

var (
	WechatPayEnabled    bool
	WechatPayAppId      string // 公众号/小程序 AppId（H5支付可填空）
	WechatPayMchId      string // 商户号
	WechatPayApiV3Key   string // API v3 密钥
	WechatPaySerialNo   string // 商户证书序列号
	WechatPayPrivateKey string // 商户私钥（PEM格式）
	WechatPayNotifyUrl  string // 异步通知地址，如 https://your-domain.com/api/wechatpay/notify
	WechatPayReturnUrl  string // 支付完成后跳转地址
	WechatPayUnitPrice  float64 = 7.3 // 每单位额度对应的人民币金额
	WechatPayMinTopUp   int     = 1
)
