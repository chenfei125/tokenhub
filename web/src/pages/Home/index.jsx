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

import React, { useEffect, useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { API } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { IconPlay, IconArrowRight } from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import { Check, X, Zap, Globe, Shield, Puzzle } from 'lucide-react';

// ── 多语言营销文案 ──────────────────────────────────────────────────────────
const MARKETING = {
  'zh-CN': {
    hero: {
      badge: '面向全球开发者的低成本 AI API 平台',
      title: '最高节省 70% AI API 成本',
      subtitle: '接入 DeepSeek、MiniMax 等高性能模型，全球可用，无地区限制，稳定路由，价格更低。',
      description: '兼容 OpenAI API 格式，接入简单，几分钟即可开始调用。',
      primaryCta: '立即开始',
      secondaryCta: '查看价格',
    },
    features: {
      title: '为什么选择 TokenHub',
      items: [
        { title: '更低成本', description: '相比官方 API，成本最高可降低 70%，更适合高频调用和商业化项目。' },
        { title: '全球可用', description: '面向海外用户提供稳定访问，无地区限制，降低接入门槛。' },
        { title: '高稳定性', description: '多通道路由与自动切换机制，提升可用性与请求成功率。' },
        { title: '快速集成', description: '兼容 OpenAI API 格式，便于快速迁移现有应用和工作流。' },
      ],
    },
    comparison: {
      title: '为什么要花更多钱？',
      official: { title: '官方 API', items: ['价格更高', '限制更多', '接入和可用性更严格'] },
      tokenhub: { title: 'TokenHub', items: ['价格更低', '访问更稳定', '面向全球开发者'] },
    },
    models: {
      title: '支持的模型',
      items: ['DeepSeek — 低成本高性价比推理模型', 'MiniMax — 适合聊天、创意生成与多场景应用', '更多模型持续接入中'],
    },
    trust: {
      title: '为开发者与分销场景而构建',
      items: ['安全的 API Key 管理', '按量计费', '无隐藏费用', '持续监控可用性'],
    },
    audience: {
      title: '适合谁使用',
      items: ['AI SaaS 开发者', 'API Reseller', '自动化工具开发者', '需要降低模型调用成本的团队'],
    },
    finalCta: {
      title: '用更低成本，构建更高利润的 AI 产品',
      subtitle: '立即获取 API Key，开始接入。',
      button: '获取 API Key',
    },
  },
  'zh-TW': {
    hero: {
      badge: '面向全球開發者的低成本 AI API 平台',
      title: '最高節省 70% AI API 成本',
      subtitle: '接入 DeepSeek、MiniMax 等高效能模型，全球可用，無地區限制，穩定路由，價格更低。',
      description: '相容 OpenAI API 格式，整合簡單，幾分鐘即可開始呼叫。',
      primaryCta: '立即開始',
      secondaryCta: '查看價格',
    },
    features: {
      title: '為什麼選擇 TokenHub',
      items: [
        { title: '更低成本', description: '相較於官方 API，成本最高可降低 70%，更適合高頻調用與商業化專案。' },
        { title: '全球可用', description: '面向海外用戶提供穩定存取，無地區限制，降低接入門檻。' },
        { title: '高穩定性', description: '多通道路由與自動切換機制，提高可用性與請求成功率。' },
        { title: '快速整合', description: '相容 OpenAI API 格式，方便快速遷移既有應用與工作流程。' },
      ],
    },
    comparison: {
      title: '為什麼要花更多錢？',
      official: { title: '官方 API', items: ['價格更高', '限制更多', '接入與可用性要求更嚴格'] },
      tokenhub: { title: 'TokenHub', items: ['價格更低', '存取更穩定', '面向全球開發者'] },
    },
    models: {
      title: '支援的模型',
      items: ['DeepSeek — 低成本高性價比推理模型', 'MiniMax — 適合聊天、創意生成與多場景應用', '更多模型持續接入中'],
    },
    trust: {
      title: '為開發者與分銷場景打造',
      items: ['安全的 API Key 管理', '按量計費', '無隱藏費用', '持續監控可用性'],
    },
    audience: {
      title: '適合誰使用',
      items: ['AI SaaS 開發者', 'API Reseller', '自動化工具開發者', '需要降低模型呼叫成本的團隊'],
    },
    finalCta: {
      title: '用更低成本，打造更高利潤的 AI 產品',
      subtitle: '立即取得 API Key，開始接入。',
      button: '取得 API Key',
    },
  },
  en: {
    hero: {
      badge: 'Low-cost AI API platform for global developers',
      title: 'Save up to 70% on AI API costs',
      subtitle: 'Access powerful models like DeepSeek and MiniMax with global availability, stable routing, and lower pricing.',
      description: 'Compatible with the OpenAI API format. Simple integration and ready to use in minutes.',
      primaryCta: 'Get Started',
      secondaryCta: 'View Pricing',
    },
    features: {
      title: 'Why TokenHub',
      items: [
        { title: 'Lower Cost', description: 'Cut API expenses by up to 70% compared with official providers, ideal for high-volume usage and commercial products.' },
        { title: 'Global Access', description: 'Built for international users with stable access and fewer regional barriers.' },
        { title: 'High Stability', description: 'Multi-channel routing and automatic failover help improve uptime and request success rate.' },
        { title: 'Fast Integration', description: 'OpenAI-compatible API format makes migration from existing apps and workflows much easier.' },
      ],
    },
    comparison: {
      title: 'Why pay more?',
      official: { title: 'Official APIs', items: ['Higher pricing', 'More access limits', 'Stricter availability and usage constraints'] },
      tokenhub: { title: 'TokenHub', items: ['Lower pricing', 'More stable access', 'Built for global developers'] },
    },
    models: {
      title: 'Supported Models',
      items: ['DeepSeek — cost-efficient reasoning models', 'MiniMax — great for chat, creativity, and broad application scenarios', 'More models coming soon'],
    },
    trust: {
      title: 'Built for developers and resellers',
      items: ['Secure API key management', 'Pay-as-you-go billing', 'No hidden fees', 'Ongoing uptime monitoring'],
    },
    audience: {
      title: 'Who is it for',
      items: ['AI SaaS builders', 'API resellers', 'Automation tool developers', 'Teams that need lower model costs'],
    },
    finalCta: {
      title: 'Build higher-margin AI products at lower cost',
      subtitle: 'Get your API key and start integrating today.',
      button: 'Get API Key',
    },
  },
  fr: {
    hero: {
      badge: 'Plateforme AI API à faible coût pour les développeurs du monde entier',
      title: "Réduisez jusqu'à 70 % vos coûts d'API IA",
      subtitle: 'Accédez à des modèles puissants comme DeepSeek et MiniMax avec une disponibilité mondiale, un routage stable et des tarifs plus bas.',
      description: "Compatible avec le format API d'OpenAI. Intégration simple et mise en service en quelques minutes.",
      primaryCta: 'Commencer',
      secondaryCta: 'Voir les tarifs',
    },
    features: {
      title: 'Pourquoi choisir TokenHub',
      items: [
        { title: 'Coût réduit', description: "Réduisez vos dépenses API jusqu'à 70 % par rapport aux fournisseurs officiels, idéal pour les usages intensifs et les produits commerciaux." },
        { title: 'Accès mondial', description: 'Conçu pour les utilisateurs internationaux avec un accès stable et moins de barrières régionales.' },
        { title: 'Grande stabilité', description: "Le routage multi-canaux et le basculement automatique améliorent la disponibilité et le taux de réussite des requêtes." },
        { title: 'Intégration rapide', description: 'Le format compatible OpenAI facilite la migration depuis vos applications et workflows existants.' },
      ],
    },
    comparison: {
      title: 'Pourquoi payer plus ?',
      official: { title: 'API officielles', items: ['Tarifs plus élevés', 'Davantage de restrictions', "Contraintes d'accès et d'utilisation plus strictes"] },
      tokenhub: { title: 'TokenHub', items: ['Tarifs plus bas', 'Accès plus stable', 'Pensé pour les développeurs mondiaux'] },
    },
    models: {
      title: 'Modèles pris en charge',
      items: ['DeepSeek — modèles de raisonnement économiques', "MiniMax — idéal pour le chat, la créativité et divers cas d'usage", "D'autres modèles arrivent bientôt"],
    },
    trust: {
      title: 'Conçu pour les développeurs et les revendeurs',
      items: ["Gestion sécurisée des clés API", "Facturation à l'usage", 'Aucun frais caché', 'Surveillance continue de la disponibilité'],
    },
    audience: {
      title: 'Pour qui',
      items: ['Créateurs de SaaS IA', "Revendeurs d'API", "Développeurs d'outils d'automatisation", 'Équipes cherchant à réduire le coût des modèles'],
    },
    finalCta: {
      title: "Créez des produits IA à plus forte marge et à moindre coût",
      subtitle: "Obtenez votre clé API et commencez l'intégration dès aujourd'hui.",
      button: 'Obtenir une clé API',
    },
  },
  ja: {
    hero: {
      badge: 'グローバル開発者向けの低コスト AI API プラットフォーム',
      title: 'AI API コストを最大 70% 削減',
      subtitle: 'DeepSeek や MiniMax などの高性能モデルを、グローバル対応・安定ルーティング・低価格で利用できます。',
      description: 'OpenAI API 形式に対応。既存システムにも導入しやすく、数分で利用開始できます。',
      primaryCta: '今すぐ始める',
      secondaryCta: '料金を見る',
    },
    features: {
      title: 'TokenHub を選ぶ理由',
      items: [
        { title: '低コスト', description: '公式 API と比べて最大 70% のコスト削減。高頻度利用や商用プロダクトに最適です。' },
        { title: 'グローバル対応', description: '海外ユーザー向けに安定したアクセスを提供し、地域制限のハードルを下げます。' },
        { title: '高い安定性', description: 'マルチチャネルルーティングと自動フェイルオーバーにより、可用性と成功率を向上します。' },
        { title: '迅速な導入', description: 'OpenAI 互換 API により、既存アプリやワークフローからの移行が簡単です。' },
      ],
    },
    comparison: {
      title: 'なぜもっと高く払うのですか？',
      official: { title: '公式 API', items: ['価格が高い', '制限が多い', '利用条件がより厳しい'] },
      tokenhub: { title: 'TokenHub', items: ['より低価格', 'より安定したアクセス', 'グローバル開発者向け'] },
    },
    models: {
      title: '対応モデル',
      items: ['DeepSeek — 低コストで高効率な推論モデル', 'MiniMax — チャット、創作、幅広い用途に最適', '今後さらに追加予定'],
    },
    trust: {
      title: '開発者とリセラーのために構築',
      items: ['安全な API キー管理', '従量課金', '隠れた料金なし', '継続的な稼働監視'],
    },
    audience: {
      title: 'こんな方に最適',
      items: ['AI SaaS 開発者', 'API リセラー', '自動化ツール開発者', 'モデル利用コストを下げたいチーム'],
    },
    finalCta: {
      title: 'より低コストで、より高収益な AI プロダクトを構築',
      subtitle: 'API キーを取得して、すぐに統合を始めましょう。',
      button: 'API キーを取得',
    },
  },
  ru: {
    hero: {
      badge: 'Недорогая AI API платформа для разработчиков по всему миру',
      title: 'Сократите расходы на AI API до 70%',
      subtitle: 'Подключайте мощные модели, такие как DeepSeek и MiniMax, с глобальным доступом, стабильной маршрутизацией и более низкой ценой.',
      description: 'Совместимо с форматом OpenAI API. Простая интеграция и быстрый запуск за считанные минуты.',
      primaryCta: 'Начать',
      secondaryCta: 'Посмотреть цены',
    },
    features: {
      title: 'Почему TokenHub',
      items: [
        { title: 'Ниже стоимость', description: 'Снижайте расходы на API до 70% по сравнению с официальными провайдерами. Отлично подходит для высоких нагрузок и коммерческих продуктов.' },
        { title: 'Глобальный доступ', description: 'Платформа для международных пользователей со стабильным доступом и меньшими региональными ограничениями.' },
        { title: 'Высокая стабильность', description: 'Маршрутизация по нескольким каналам и автоматическое переключение повышают доступность и успешность запросов.' },
        { title: 'Быстрая интеграция', description: 'Совместимость с OpenAI API упрощает миграцию существующих приложений и рабочих процессов.' },
      ],
    },
    comparison: {
      title: 'Зачем платить больше?',
      official: { title: 'Официальные API', items: ['Более высокая цена', 'Больше ограничений', 'Более строгие условия доступа и использования'] },
      tokenhub: { title: 'TokenHub', items: ['Ниже цена', 'Стабильнее доступ', 'Для разработчиков по всему миру'] },
    },
    models: {
      title: 'Поддерживаемые модели',
      items: ['DeepSeek — экономичные модели для reasoning-задач', 'MiniMax — подходит для чата, креатива и широкого спектра сценариев', 'Скоро появятся новые модели'],
    },
    trust: {
      title: 'Создано для разработчиков и реселлеров',
      items: ['Безопасное управление API-ключами', 'Оплата по мере использования', 'Без скрытых комиссий', 'Постоянный мониторинг доступности'],
    },
    audience: {
      title: 'Для кого это',
      items: ['AI SaaS разработчики', 'API реселлеры', 'Разработчики инструментов автоматизации', 'Команды, которым нужно снизить стоимость моделей'],
    },
    finalCta: {
      title: 'Создавайте более прибыльные AI-продукты с меньшими затратами',
      subtitle: 'Получите API-ключ и начните интеграцию уже сегодня.',
      button: 'Получить API-ключ',
    },
  },
  vi: {
    hero: {
      badge: 'Nền tảng AI API chi phí thấp cho nhà phát triển toàn cầu',
      title: 'Tiết kiệm đến 70% chi phí AI API',
      subtitle: 'Truy cập các mô hình mạnh mẽ như DeepSeek và MiniMax với khả năng dùng toàn cầu, định tuyến ổn định và mức giá thấp hơn.',
      description: 'Tương thích với định dạng OpenAI API. Tích hợp đơn giản và có thể sử dụng chỉ trong vài phút.',
      primaryCta: 'Bắt đầu ngay',
      secondaryCta: 'Xem giá',
    },
    features: {
      title: 'Vì sao chọn TokenHub',
      items: [
        { title: 'Chi phí thấp hơn', description: 'Giảm tới 70% chi phí API so với nhà cung cấp chính thức, phù hợp cho lưu lượng lớn và sản phẩm thương mại.' },
        { title: 'Truy cập toàn cầu', description: 'Được xây dựng cho người dùng quốc tế với khả năng truy cập ổn định và ít rào cản khu vực hơn.' },
        { title: 'Độ ổn định cao', description: 'Định tuyến đa kênh và chuyển đổi tự động giúp tăng uptime và tỷ lệ thành công của yêu cầu.' },
        { title: 'Tích hợp nhanh', description: 'Tương thích OpenAI API giúp di chuyển từ ứng dụng và quy trình hiện có dễ dàng hơn.' },
      ],
    },
    comparison: {
      title: 'Tại sao phải trả nhiều hơn?',
      official: { title: 'API chính thức', items: ['Giá cao hơn', 'Nhiều giới hạn hơn', 'Điều kiện truy cập và sử dụng nghiêm ngặt hơn'] },
      tokenhub: { title: 'TokenHub', items: ['Giá thấp hơn', 'Truy cập ổn định hơn', 'Dành cho nhà phát triển toàn cầu'] },
    },
    models: {
      title: 'Các mô hình được hỗ trợ',
      items: ['DeepSeek — mô hình suy luận hiệu quả về chi phí', 'MiniMax — phù hợp cho chat, sáng tạo và nhiều tình huống ứng dụng', 'Sắp có thêm nhiều mô hình'],
    },
    trust: {
      title: 'Được xây dựng cho nhà phát triển và reseller',
      items: ['Quản lý API key an toàn', 'Thanh toán theo mức sử dụng', 'Không phí ẩn', 'Giám sát uptime liên tục'],
    },
    audience: {
      title: 'Phù hợp với ai',
      items: ['Nhà phát triển AI SaaS', 'API reseller', 'Nhà phát triển công cụ tự động hóa', 'Các nhóm muốn giảm chi phí gọi mô hình'],
    },
    finalCta: {
      title: 'Xây dựng sản phẩm AI lợi nhuận cao hơn với chi phí thấp hơn',
      subtitle: 'Lấy API key và bắt đầu tích hợp ngay hôm nay.',
      button: 'Nhận API Key',
    },
  },
};

const LANG_OPTIONS = [
  { key: 'en',    label: 'EN' },
  { key: 'zh-CN', label: '简中' },
  { key: 'zh-TW', label: '繁中' },
  { key: 'fr',    label: 'FR' },
  { key: 'ja',    label: 'JA' },
  { key: 'ru',    label: 'RU' },
  { key: 'vi',    label: 'VI' },
];

const FEATURE_ICONS = [Zap, Globe, Shield, Puzzle];

// ── 语言切换器 ──────────────────────────────────────────────────────────────
const LangSwitcher = ({ lang, onChange }) => (
  <div className='fixed top-16 right-4 z-50 flex gap-1 flex-wrap justify-end max-w-[200px]'>
    {LANG_OPTIONS.map((opt) => (
      <button
        key={opt.key}
        onClick={() => onChange(opt.key)}
        className={[
          'px-2 py-0.5 text-xs rounded border transition-colors',
          lang === opt.key
            ? 'border-semi-color-primary bg-semi-color-primary text-white'
            : 'border-semi-color-border bg-semi-color-bg-0 text-semi-color-text-2 hover:border-semi-color-primary hover:text-semi-color-primary',
        ].join(' ')}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// ── 营销首页组件 ──────────────────────────────────────────────────────────────
const MarketingHome = ({ lang, onLangChange }) => {
  const c = MARKETING[lang] || MARKETING['en'];
  const isMobile = useIsMobile();

  return (
    <div className='w-full overflow-x-hidden'>

      <LangSwitcher lang={lang} onChange={onLangChange} />

      {/* ── Hero ── */}
      <section className='relative w-full min-h-[580px] flex items-center justify-center overflow-hidden border-b border-semi-color-border'>
        <div className='blur-ball blur-ball-indigo' />
        <div className='blur-ball blur-ball-teal' />
        <div className='relative z-10 flex flex-col items-center text-center px-4 py-24 max-w-3xl mx-auto'>
          <span className='inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full border border-semi-color-border text-semi-color-text-2 bg-semi-color-fill-0'>
            {c.hero.badge}
          </span>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-semi-color-text-0 leading-tight mb-4'>
            {c.hero.title}
          </h1>
          <p className='text-base md:text-lg text-semi-color-text-1 mb-2 max-w-xl'>
            {c.hero.subtitle}
          </p>
          <p className='text-sm text-semi-color-text-2 mb-8 max-w-lg'>
            {c.hero.description}
          </p>
          <div className='flex flex-row gap-3 flex-wrap justify-center'>
            <Link to='/console'>
              <Button
                theme='solid'
                type='primary'
                size={isMobile ? 'default' : 'large'}
                className='!rounded-3xl !px-8'
                icon={<IconPlay />}
              >
                {c.hero.primaryCta}
              </Button>
            </Link>
            <Link to='/ai-api-pricing'>
              <Button
                size={isMobile ? 'default' : 'large'}
                className='!rounded-3xl !px-8'
              >
                {c.hero.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className='w-full py-20 px-4'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-semi-color-text-0 mb-12'>
            {c.features.title}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {c.features.items.map((item, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={i}
                  className='flex flex-col gap-3 p-6 rounded-xl border border-semi-color-border bg-semi-color-bg-1 hover:border-semi-color-primary transition-colors'
                >
                  <div className='w-10 h-10 rounded-lg bg-semi-color-primary-light-default flex items-center justify-center'>
                    <Icon size={20} className='text-semi-color-primary' />
                  </div>
                  <h3 className='font-semibold text-semi-color-text-0'>{item.title}</h3>
                  <p className='text-sm text-semi-color-text-2 leading-relaxed'>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className='w-full py-20 px-4 bg-semi-color-fill-0'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-semi-color-text-0 mb-12'>
            {c.comparison.title}
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='p-6 rounded-xl border border-semi-color-border bg-semi-color-bg-1'>
              <h3 className='font-semibold text-semi-color-text-1 mb-4 flex items-center gap-2'>
                <X size={16} className='text-red-400' />
                {c.comparison.official.title}
              </h3>
              <ul className='space-y-3'>
                {c.comparison.official.items.map((item, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm text-semi-color-text-2'>
                    <X size={14} className='text-red-400 mt-0.5 flex-shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className='p-6 rounded-xl border border-semi-color-primary bg-semi-color-primary-light-default'>
              <h3 className='font-semibold text-semi-color-text-0 mb-4 flex items-center gap-2'>
                <Check size={16} className='text-green-500' />
                {c.comparison.tokenhub.title}
              </h3>
              <ul className='space-y-3'>
                {c.comparison.tokenhub.items.map((item, i) => (
                  <li key={i} className='flex items-start gap-2 text-sm text-semi-color-text-0'>
                    <Check size={14} className='text-green-500 mt-0.5 flex-shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Models + Trust + Audience (三列) ── */}
      <section className='w-full py-20 px-4'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h2 className='text-lg font-bold text-semi-color-text-0 mb-4'>{c.models.title}</h2>
            <ul className='space-y-3'>
              {c.models.items.map((item, i) => (
                <li key={i} className='text-sm text-semi-color-text-2 flex items-start gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-semi-color-primary mt-1.5 flex-shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-lg font-bold text-semi-color-text-0 mb-4'>{c.trust.title}</h2>
            <ul className='space-y-3'>
              {c.trust.items.map((item, i) => (
                <li key={i} className='text-sm text-semi-color-text-2 flex items-start gap-2'>
                  <Check size={14} className='text-green-500 mt-0.5 flex-shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-lg font-bold text-semi-color-text-0 mb-4'>{c.audience.title}</h2>
            <ul className='space-y-3'>
              {c.audience.items.map((item, i) => (
                <li key={i} className='text-sm text-semi-color-text-2 flex items-start gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-semi-color-primary mt-1.5 flex-shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className='w-full py-24 px-4 bg-semi-color-fill-0 border-t border-semi-color-border'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-semi-color-text-0 mb-3'>
            {c.finalCta.title}
          </h2>
          <p className='text-semi-color-text-2 mb-8'>{c.finalCta.subtitle}</p>
          <Link to='/console'>
            <Button
              theme='solid'
              type='primary'
              size='large'
              className='!rounded-3xl !px-10'
              icon={<IconArrowRight />}
              iconPosition='right'
            >
              {c.finalCta.button}
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

// ── 主页面组件 ────────────────────────────────────────────────────────────────
const Home = () => {
  const [lang, setLang] = useState('en');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch {}
      }
    };
    checkNoticeAndShow();
  }, []);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      <MarketingHome lang={lang} onLangChange={setLang} />
    </div>
  );
};

export default Home;
