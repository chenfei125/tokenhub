/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useState, useEffect } from 'react';
import { Typography, Toast, Tooltip } from '@douyinfe/semi-ui';
import { IconCopy } from '@douyinfe/semi-icons';
import { Key } from 'lucide-react';
import CompactModeToggle from '../../common/ui/CompactModeToggle';

const { Text } = Typography;

const TokensDescription = ({ compactMode, setCompactMode, t }) => {
  const [serverAddress, setServerAddress] = useState('');

  useEffect(() => {
    let addr = '';
    try {
      const status = JSON.parse(localStorage.getItem('status') || '{}');
      addr = status.server_address || '';
    } catch (_) {}
    if (!addr) addr = window.location.origin;
    setServerAddress(addr);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(serverAddress).then(() => {
      Toast.success(t('已复制'));
    }).catch(() => {
      Toast.error(t('复制失败'));
    });
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
      {/* 第一行：令牌管理标题 + 紧凑模式切换 */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 w-full'>
        <div className='flex items-center text-blue-500'>
          <Key size={16} className='mr-2' />
          <Text>{t('令牌管理')}</Text>
        </div>
        <CompactModeToggle
          compactMode={compactMode}
          setCompactMode={setCompactMode}
          t={t}
        />
      </div>

      {/* 第二行：API 接口地址 + 复制按钮 */}
      <div className='flex items-center gap-2 flex-wrap'>
        <Text type='tertiary' size='small'>{t('API 接口 默认')}</Text>
        <Text type='tertiary' size='small'>｜</Text>
        <Text
          size='small'
          style={{ fontFamily: 'monospace', userSelect: 'all' }}
        >
          {serverAddress}
        </Text>
        <Tooltip content={t('复制接口地址')}>
          <span
            onClick={handleCopy}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
          >
            <IconCopy
              size='small'
              style={{ color: 'var(--semi-color-text-2)', fontSize: 14 }}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default TokensDescription;
