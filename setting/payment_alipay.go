package setting

var (
	AlipayEnabled    bool
	AlipayAppId      string
	AlipayPrivateKey string // 应用私钥（RSA2）
	AlipayPublicKey  string // 支付宝公钥
	AlipayNotifyUrl  string // 异步通知地址，如 https://your-domain.com/api/alipay/notify
	AlipayReturnUrl  string // 同步跳转地址，如 https://your-domain.com/console/topup
	AlipayUnitPrice  float64 = 7.3 // 每单位额度对应的人民币金额
	AlipayMinTopUp   int     = 1
	AlipaySandbox    bool    // 是否使用沙箱环境
)
