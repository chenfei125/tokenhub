import React, { useEffect, useState, useRef } from 'react';
import {
  Banner,
  Button,
  Form,
  Row,
  Col,
  Spin,
} from '@douyinfe/semi-ui';
import {
  API,
  removeTrailingSlash,
  showError,
  showSuccess,
} from '../../../helpers';
import { useTranslation } from 'react-i18next';

export default function SettingsPaymentGatewayWechatPay(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    WechatPayEnabled: false,
    WechatPayAppId: '',
    WechatPayMchId: '',
    WechatPayApiV3Key: '',
    WechatPaySerialNo: '',
    WechatPayPrivateKey: '',
    WechatPayNotifyUrl: '',
    WechatPayReturnUrl: '',
    WechatPayUnitPrice: 7.3,
    WechatPayMinTopUp: 1,
  });
  const [originInputs, setOriginInputs] = useState({});
  const formApiRef = useRef(null);

  useEffect(() => {
    if (props.options && formApiRef.current) {
      const currentInputs = {
        WechatPayEnabled: props.options.WechatPayEnabled || false,
        WechatPayAppId: props.options.WechatPayAppId || '',
        WechatPayMchId: props.options.WechatPayMchId || '',
        WechatPayApiV3Key: props.options.WechatPayApiV3Key || '',
        WechatPaySerialNo: props.options.WechatPaySerialNo || '',
        WechatPayPrivateKey: props.options.WechatPayPrivateKey || '',
        WechatPayNotifyUrl: props.options.WechatPayNotifyUrl || '',
        WechatPayReturnUrl: props.options.WechatPayReturnUrl || '',
        WechatPayUnitPrice:
          props.options.WechatPayUnitPrice !== undefined
            ? parseFloat(props.options.WechatPayUnitPrice)
            : 7.3,
        WechatPayMinTopUp:
          props.options.WechatPayMinTopUp !== undefined
            ? parseFloat(props.options.WechatPayMinTopUp)
            : 1,
      };
      setInputs(currentInputs);
      setOriginInputs({ ...currentInputs });
      formApiRef.current.setValues(currentInputs);
    }
  }, [props.options]);

  const handleFormChange = (values) => {
    setInputs(values);
  };

  const submitWechatPaySetting = async () => {
    setLoading(true);
    try {
      const options = [];

      if (originInputs['WechatPayEnabled'] !== inputs.WechatPayEnabled) {
        options.push({ key: 'WechatPayEnabled', value: inputs.WechatPayEnabled ? 'true' : 'false' });
      }
      if (inputs.WechatPayAppId !== undefined) {
        options.push({ key: 'WechatPayAppId', value: inputs.WechatPayAppId || '' });
      }
      if (inputs.WechatPayMchId) {
        options.push({ key: 'WechatPayMchId', value: inputs.WechatPayMchId });
      }
      if (inputs.WechatPayApiV3Key) {
        options.push({ key: 'WechatPayApiV3Key', value: inputs.WechatPayApiV3Key });
      }
      if (inputs.WechatPaySerialNo) {
        options.push({ key: 'WechatPaySerialNo', value: inputs.WechatPaySerialNo });
      }
      if (inputs.WechatPayPrivateKey) {
        options.push({ key: 'WechatPayPrivateKey', value: inputs.WechatPayPrivateKey });
      }
      if (inputs.WechatPayNotifyUrl !== undefined) {
        options.push({ key: 'WechatPayNotifyUrl', value: inputs.WechatPayNotifyUrl || '' });
      }
      if (inputs.WechatPayReturnUrl !== undefined) {
        options.push({ key: 'WechatPayReturnUrl', value: inputs.WechatPayReturnUrl || '' });
      }
      if (inputs.WechatPayUnitPrice !== undefined && inputs.WechatPayUnitPrice !== null) {
        options.push({ key: 'WechatPayUnitPrice', value: inputs.WechatPayUnitPrice.toString() });
      }
      if (inputs.WechatPayMinTopUp !== undefined && inputs.WechatPayMinTopUp !== null) {
        options.push({ key: 'WechatPayMinTopUp', value: inputs.WechatPayMinTopUp.toString() });
      }

      const requestQueue = options.map((opt) =>
        API.put('/api/option/', { key: opt.key, value: opt.value }),
      );

      const results = await Promise.all(requestQueue);
      const errorResults = results.filter((res) => !res.data.success);
      if (errorResults.length > 0) {
        errorResults.forEach((res) => showError(res.data.message));
      } else {
        showSuccess(t('更新成功'));
        setOriginInputs({ ...inputs });
        props.refresh?.();
      }
    } catch (error) {
      showError(t('更新失败'));
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Form
        initValues={inputs}
        onValueChange={handleFormChange}
        getFormApi={(api) => (formApiRef.current = api)}
      >
        <Form.Section text={t('微信支付设置')}>
          <Banner
            type='info'
            description={t('回调通知地址') + `: ${props.options.ServerAddress ? removeTrailingSlash(props.options.ServerAddress) : t('网站地址')}/api/wechatpay/notify`}
          />
          <Banner
            type='warning'
            description={t('PC端使用 Native 扫码支付，手机端使用 H5 支付。需在微信支付商户平台开通对应权限。')}
            style={{ marginTop: 8 }}
          />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Switch
                field='WechatPayEnabled'
                size='default'
                checkedText='|'
                uncheckedText='O'
                label={t('启用微信支付')}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='WechatPayMchId'
                label={t('商户号 (MchId)')}
                placeholder={t('微信支付商户号')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='WechatPayAppId'
                label={t('AppId（可选）')}
                placeholder={t('公众号/小程序 AppId')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='WechatPaySerialNo'
                label={t('证书序列号')}
                placeholder={t('商户 API 证书序列号')}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }} style={{ marginTop: 16 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='WechatPayApiV3Key'
                label={t('API v3 密钥')}
                placeholder={t('商户平台设置的 APIv3 密钥，敏感信息不显示')}
                type='password'
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='WechatPayPrivateKey'
                label={t('商户私钥')}
                placeholder={t('PEM 格式私钥，敏感信息不显示')}
                type='password'
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }} style={{ marginTop: 16 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.InputNumber
                field='WechatPayUnitPrice'
                precision={2}
                label={t('充值单价（CNY/单位额度）')}
                placeholder={t('例如：7.3')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.InputNumber
                field='WechatPayMinTopUp'
                label={t('最低充值数量')}
                placeholder={t('例如：1')}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }} style={{ marginTop: 16 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='WechatPayNotifyUrl'
                label={t('回调通知地址（可选）')}
                placeholder={t('留空则自动使用：服务器地址/api/wechatpay/notify')}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='WechatPayReturnUrl'
                label={t('支付完成跳转地址（可选）')}
                placeholder={t('留空则跳转到充值页面')}
              />
            </Col>
          </Row>
          <Button onClick={submitWechatPaySetting} style={{ marginTop: 16 }}>
            {t('更新微信支付设置')}
          </Button>
        </Form.Section>
      </Form>
    </Spin>
  );
}
