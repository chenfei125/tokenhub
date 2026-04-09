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

export default function SettingsPaymentGatewayAlipay(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    AlipayEnabled: false,
    AlipayAppId: '',
    AlipayPrivateKey: '',
    AlipayPublicKey: '',
    AlipayNotifyUrl: '',
    AlipayReturnUrl: '',
    AlipayUnitPrice: 7.3,
    AlipayMinTopUp: 1,
    AlipaySandbox: false,
  });
  const [originInputs, setOriginInputs] = useState({});
  const formApiRef = useRef(null);

  useEffect(() => {
    if (props.options && formApiRef.current) {
      const currentInputs = {
        AlipayEnabled: props.options.AlipayEnabled || false,
        AlipayAppId: props.options.AlipayAppId || '',
        AlipayPrivateKey: props.options.AlipayPrivateKey || '',
        AlipayPublicKey: props.options.AlipayPublicKey || '',
        AlipayNotifyUrl: props.options.AlipayNotifyUrl || '',
        AlipayReturnUrl: props.options.AlipayReturnUrl || '',
        AlipayUnitPrice:
          props.options.AlipayUnitPrice !== undefined
            ? parseFloat(props.options.AlipayUnitPrice)
            : 7.3,
        AlipayMinTopUp:
          props.options.AlipayMinTopUp !== undefined
            ? parseFloat(props.options.AlipayMinTopUp)
            : 1,
        AlipaySandbox: props.options.AlipaySandbox || false,
      };
      setInputs(currentInputs);
      setOriginInputs({ ...currentInputs });
      formApiRef.current.setValues(currentInputs);
    }
  }, [props.options]);

  const handleFormChange = (values) => {
    setInputs(values);
  };

  const submitAlipaySetting = async () => {
    setLoading(true);
    try {
      const options = [];

      if (originInputs['AlipayEnabled'] !== inputs.AlipayEnabled) {
        options.push({ key: 'AlipayEnabled', value: inputs.AlipayEnabled ? 'true' : 'false' });
      }
      if (inputs.AlipayAppId) {
        options.push({ key: 'AlipayAppId', value: inputs.AlipayAppId });
      }
      if (inputs.AlipayPrivateKey) {
        options.push({ key: 'AlipayPrivateKey', value: inputs.AlipayPrivateKey });
      }
      if (inputs.AlipayPublicKey) {
        options.push({ key: 'AlipayPublicKey', value: inputs.AlipayPublicKey });
      }
      if (inputs.AlipayNotifyUrl !== undefined) {
        options.push({ key: 'AlipayNotifyUrl', value: inputs.AlipayNotifyUrl || '' });
      }
      if (inputs.AlipayReturnUrl !== undefined) {
        options.push({ key: 'AlipayReturnUrl', value: inputs.AlipayReturnUrl || '' });
      }
      if (inputs.AlipayUnitPrice !== undefined && inputs.AlipayUnitPrice !== null) {
        options.push({ key: 'AlipayUnitPrice', value: inputs.AlipayUnitPrice.toString() });
      }
      if (inputs.AlipayMinTopUp !== undefined && inputs.AlipayMinTopUp !== null) {
        options.push({ key: 'AlipayMinTopUp', value: inputs.AlipayMinTopUp.toString() });
      }
      if (originInputs['AlipaySandbox'] !== inputs.AlipaySandbox) {
        options.push({ key: 'AlipaySandbox', value: inputs.AlipaySandbox ? 'true' : 'false' });
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
        <Form.Section text={t('支付宝设置')}>
          <Banner
            type='info'
            description={t('异步通知地址') + `: ${props.options.ServerAddress ? removeTrailingSlash(props.options.ServerAddress) : t('网站地址')}/api/alipay/notify`}
          />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Switch
                field='AlipayEnabled'
                size='default'
                checkedText='|'
                uncheckedText='O'
                label={t('启用支付宝')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Switch
                field='AlipaySandbox'
                size='default'
                checkedText='|'
                uncheckedText='O'
                label={t('沙箱模式')}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayAppId'
                label={t('应用 ID (AppId)')}
                placeholder={t('支付宝开放平台应用 AppId')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayPrivateKey'
                label={t('应用私钥')}
                placeholder={t('RSA2 应用私钥，敏感信息不显示')}
                type='password'
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Input
                field='AlipayPublicKey'
                label={t('支付宝公钥')}
                placeholder={t('支付宝公钥，敏感信息不显示')}
                type='password'
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }} style={{ marginTop: 16 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.InputNumber
                field='AlipayUnitPrice'
                precision={2}
                label={t('充值单价（CNY/单位额度）')}
                placeholder={t('例如：7.3')}
              />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.InputNumber
                field='AlipayMinTopUp'
                label={t('最低充值数量')}
                placeholder={t('例如：1')}
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24, xxl: 24 }} style={{ marginTop: 16 }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='AlipayNotifyUrl'
                label={t('异步通知地址（可选）')}
                placeholder={t('留空则自动使用：服务器地址/api/alipay/notify')}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Input
                field='AlipayReturnUrl'
                label={t('同步跳转地址（可选）')}
                placeholder={t('留空则自动跳转到充值页面')}
              />
            </Col>
          </Row>
          <Button onClick={submitAlipaySetting} style={{ marginTop: 16 }}>
            {t('更新支付宝设置')}
          </Button>
        </Form.Section>
      </Form>
    </Spin>
  );
}
