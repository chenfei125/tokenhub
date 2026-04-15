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
import { useTranslation } from 'react-i18next';

// ── 多语言营销文案 ────────────────────────────────────────────────────────────
const MARKETING = {
  'zh-CN': {
    hero: {
      badge: '面向全球开发者的 AI API 聚合平台',
      title: 'AI API 成本，直接砍掉一半',
      subtitle: 'DeepSeek-V3 每百万 token 仅需 $0.28，GPT-4o 要价 $10。同等效果，接近零成本迁移。',
      description: '兼容 OpenAI API 格式，修改两行代码即可切换，几分钟完成接入。',
      primaryCta: '免费获取 API Key',
      secondaryCta: '查看价格',
    },
    stats: ['最高节省 70%', '40+ 模型可选', '全球无限制访问', '兼容 OpenAI SDK'],
    code: {
      title: '迁移只需两行',
      subtitle: '其他代码无需改动',
    },
    pricing: {
      title: '真实价格对比',
      subtitle: '按每百万 token 计算（输入 / 输出）',
      badge: '经 TokenHub 访问',
      note: '价格仅供参考，实际以控制台为准',
    },
    features: {
      title: '为什么选择 TokenHub',
      items: [
        { title: '大幅降低成本', description: 'DeepSeek-V3 仅需 GPT-4o 价格的 3%，效果媲美主流模型，适合高频调用场景。' },
        { title: '全球稳定访问', description: '无地区封锁，全球开发者均可直接接入，无需科学上网。' },
        { title: '多通道路由', description: '自动切换可用通道，减少因单点故障导致的请求失败。' },
        { title: '即插即用', description: '完全兼容 OpenAI SDK，只换 base_url 和 api_key，其他代码不动。' },
      ],
    },
    comparison: {
      title: '官方 API 的问题',
      official: {
        title: '官方 API',
        items: ['高定价，企业才用得起', '部分地区无法访问', '单一供应商，故障无备选'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['价格直降，适合商业化产品', '全球可用，无地区限制', '多通道路由，稳定性更高'],
      },
    },
    models: {
      title: '支持的模型',
      items: [
        'DeepSeek-V3 — 低成本高效推理，适合绝大多数场景',
        'DeepSeek-R1 — 复杂推理与代码分析',
        'MiniMax-Text-01 — 对话、创意生成与长上下文',
        '更多模型持续上线中',
      ],
    },
    trust: {
      title: '适合开发者与分销商',
      items: ['API Key 多级权限管理', '按量计费，无月费', '实时用量与费用监控', '无隐藏收费'],
    },
    audience: {
      title: '适合哪些人',
      items: ['AI SaaS 创业者', 'API 分销商 / Reseller', '自动化工具开发者', '想降低推理成本的团队'],
    },
    explore: {
      title: '深入了解',
      items: [
        { title: 'OpenAI 替代方案', desc: '更低成本，兼容 OpenAI，全球可用', to: '/openai-alternative' },
        { title: 'DeepSeek API 接入', desc: '高效推理模型，代码与分析首选', to: '/deepseek-api' },
        { title: 'MiniMax API 接入', desc: '对话与创意生成，多场景适用', to: '/minimax-api' },
        { title: '低价 AI API', desc: '省下高达 70% 的 API 成本', to: '/cheap-ai-api' },
        { title: 'AI API 价格对比', desc: '各主流模型真实单价横向对比', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: '相同的模型，更低的价格',
      subtitle: '现在注册，立即获取 API Key 开始调用。',
      button: '免费开始',
    },
  },

  'zh-TW': {
    hero: {
      badge: '面向全球開發者的 AI API 聚合平台',
      title: 'AI API 成本，直接砍掉一半',
      subtitle: 'DeepSeek-V3 每百萬 token 僅需 $0.28，GPT-4o 要價 $10。同等效果，接近零成本遷移。',
      description: '相容 OpenAI API 格式，修改兩行程式碼即可切換，幾分鐘完成接入。',
      primaryCta: '免費取得 API Key',
      secondaryCta: '查看價格',
    },
    stats: ['最高節省 70%', '40+ 模型可選', '全球無限制存取', '相容 OpenAI SDK'],
    code: {
      title: '遷移只需兩行',
      subtitle: '其他程式碼無需更動',
    },
    pricing: {
      title: '真實價格比較',
      subtitle: '按每百萬 token 計算（輸入 / 輸出）',
      badge: '經 TokenHub 存取',
      note: '價格僅供參考，實際以控制台為準',
    },
    features: {
      title: '為什麼選擇 TokenHub',
      items: [
        { title: '大幅降低成本', description: 'DeepSeek-V3 僅需 GPT-4o 價格的 3%，效果媲美主流模型，適合高頻呼叫場景。' },
        { title: '全球穩定存取', description: '無地區封鎖，全球開發者均可直接接入，無需額外設定。' },
        { title: '多通道路由', description: '自動切換可用通道，減少因單點故障導致的請求失敗。' },
        { title: '即插即用', description: '完全相容 OpenAI SDK，只換 base_url 和 api_key，其他程式碼不動。' },
      ],
    },
    comparison: {
      title: '官方 API 的問題',
      official: {
        title: '官方 API',
        items: ['高定價，企業才用得起', '部分地區無法存取', '單一供應商，故障無備選'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['價格直降，適合商業化產品', '全球可用，無地區限制', '多通道路由，穩定性更高'],
      },
    },
    models: {
      title: '支援的模型',
      items: [
        'DeepSeek-V3 — 低成本高效推理，適合絕大多數場景',
        'DeepSeek-R1 — 複雜推理與程式碼分析',
        'MiniMax-Text-01 — 對話、創意生成與長上下文',
        '更多模型持續上線中',
      ],
    },
    trust: {
      title: '適合開發者與分銷商',
      items: ['API Key 多級權限管理', '按量計費，無月費', '即時用量與費用監控', '無隱藏收費'],
    },
    audience: {
      title: '適合哪些人',
      items: ['AI SaaS 創業者', 'API 分銷商 / Reseller', '自動化工具開發者', '想降低推理成本的團隊'],
    },
    explore: {
      title: '深入了解',
      items: [
        { title: 'OpenAI 替代方案', desc: '更低成本，相容 OpenAI，全球可用', to: '/openai-alternative' },
        { title: 'DeepSeek API 接入', desc: '高效推理模型，程式碼與分析首選', to: '/deepseek-api' },
        { title: 'MiniMax API 接入', desc: '對話與創意生成，多場景適用', to: '/minimax-api' },
        { title: '低價 AI API', desc: '省下高達 70% 的 API 成本', to: '/cheap-ai-api' },
        { title: 'AI API 價格對比', desc: '各主流模型真實單價橫向對比', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: '相同的模型，更低的價格',
      subtitle: '現在註冊，立即取得 API Key 開始呼叫。',
      button: '免費開始',
    },
  },

  en: {
    hero: {
      badge: 'AI API aggregation platform for global developers',
      title: 'Cut your AI API bill in half',
      subtitle: 'DeepSeek-V3 at $0.28/M tokens. GPT-4o charges $10. Same capability, near-zero migration effort.',
      description: 'OpenAI-compatible API. Change two lines of code and you\'re done.',
      primaryCta: 'Get Free API Key',
      secondaryCta: 'View Pricing',
    },
    stats: ['Up to 70% savings', '40+ models', 'Global, no restrictions', 'OpenAI SDK compatible'],
    code: {
      title: 'Two lines to migrate',
      subtitle: 'Everything else stays the same',
    },
    pricing: {
      title: 'Real pricing, side by side',
      subtitle: 'Per 1M tokens (input / output)',
      badge: 'Via TokenHub',
      note: 'Prices are approximate. Check the console for current rates.',
    },
    features: {
      title: 'Why developers choose TokenHub',
      items: [
        { title: 'Dramatically lower cost', description: 'DeepSeek-V3 costs 3% of what GPT-4o charges. Comparable quality for most tasks, at a fraction of the price.' },
        { title: 'Global access, no blocks', description: 'No regional restrictions. Developers worldwide can connect directly without workarounds.' },
        { title: 'Multi-channel routing', description: 'Requests automatically route around unavailable channels, reducing failed calls from single-point outages.' },
        { title: 'Drop-in replacement', description: 'Fully compatible with the OpenAI SDK. Swap base_url and api_key — nothing else changes.' },
      ],
    },
    comparison: {
      title: 'The problem with official APIs',
      official: {
        title: 'Official APIs',
        items: ['Enterprise pricing, not developer pricing', 'Restricted in multiple regions', 'Single provider — no fallback on outages'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['Fraction of the cost, built for products', 'Global access, no geo-blocks', 'Multi-channel routing for better reliability'],
      },
    },
    models: {
      title: 'Available models',
      items: [
        'DeepSeek-V3 — low-cost, high-quality reasoning for most use cases',
        'DeepSeek-R1 — advanced reasoning and code analysis',
        'MiniMax-Text-01 — chat, creative generation, long context',
        'More models added regularly',
      ],
    },
    trust: {
      title: 'Built for developers and resellers',
      items: ['Multi-level API key management', 'Pay-as-you-go, no monthly fee', 'Real-time usage and cost monitoring', 'No hidden charges'],
    },
    audience: {
      title: 'Who uses TokenHub',
      items: ['AI SaaS founders', 'API resellers', 'Automation tool builders', 'Teams cutting inference costs'],
    },
    explore: {
      title: 'Explore further',
      items: [
        { title: 'OpenAI Alternative', desc: 'Lower cost, OpenAI-compatible, globally available', to: '/openai-alternative' },
        { title: 'DeepSeek API', desc: 'Efficient reasoning model for code & analysis', to: '/deepseek-api' },
        { title: 'MiniMax API', desc: 'Chat and creative generation, multi-scenario', to: '/minimax-api' },
        { title: 'Cheap AI API', desc: 'Save up to 70% on API costs', to: '/cheap-ai-api' },
        { title: 'AI API Pricing', desc: 'Real per-token prices compared side by side', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: 'Same models. A fraction of the price.',
      subtitle: 'Sign up now, get your API key, and start calling in minutes.',
      button: 'Start for free',
    },
  },

  fr: {
    hero: {
      badge: 'Plateforme d\'agrégation AI API pour les développeurs mondiaux',
      title: 'Divisez votre facture AI API par deux',
      subtitle: 'DeepSeek-V3 à $0,28 par million de tokens. GPT-4o en facture $10. Qualité comparable, migration quasi instantanée.',
      description: 'Compatible avec l\'API OpenAI. Changez deux lignes de code et c\'est fait.',
      primaryCta: 'Obtenir une clé API gratuite',
      secondaryCta: 'Voir les tarifs',
    },
    stats: ['Jusqu\'à 70% d\'économies', '40+ modèles', 'Accès mondial sans restriction', 'Compatible OpenAI SDK'],
    code: {
      title: 'Deux lignes pour migrer',
      subtitle: 'Le reste de votre code ne change pas',
    },
    pricing: {
      title: 'Tarifs réels, côte à côte',
      subtitle: 'Par million de tokens (entrée / sortie)',
      badge: 'Via TokenHub',
      note: 'Prix indicatifs. Consultez la console pour les tarifs en vigueur.',
    },
    features: {
      title: 'Pourquoi les développeurs choisissent TokenHub',
      items: [
        { title: 'Coût radicalement réduit', description: 'DeepSeek-V3 coûte 3% du prix de GPT-4o. Qualité comparable pour la plupart des tâches.' },
        { title: 'Accès mondial sans blocage', description: 'Aucune restriction régionale. Les développeurs du monde entier se connectent directement.' },
        { title: 'Routage multi-canaux', description: 'Les requêtes contournent automatiquement les canaux indisponibles, réduisant les échecs.' },
        { title: 'Remplacement immédiat', description: 'Entièrement compatible avec le SDK OpenAI. Changez base_url et api_key, rien d\'autre.' },
      ],
    },
    comparison: {
      title: 'Le problème des API officielles',
      official: {
        title: 'API officielles',
        items: ['Tarification entreprise, pas développeur', 'Accès restreint dans plusieurs régions', 'Fournisseur unique — aucun repli en cas de panne'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['Fraction du coût, conçu pour les produits', 'Accès mondial, sans géo-blocage', 'Routage multi-canaux pour plus de fiabilité'],
      },
    },
    models: {
      title: 'Modèles disponibles',
      items: [
        'DeepSeek-V3 — raisonnement économique et performant',
        'DeepSeek-R1 — raisonnement avancé et analyse de code',
        'MiniMax-Text-01 — chat, génération créative, long contexte',
        'De nouveaux modèles ajoutés régulièrement',
      ],
    },
    trust: {
      title: 'Conçu pour développeurs et revendeurs',
      items: ['Gestion des clés API multi-niveaux', 'Paiement à l\'usage, sans abonnement', 'Monitoring en temps réel', 'Aucun frais caché'],
    },
    audience: {
      title: 'Qui utilise TokenHub',
      items: ['Fondateurs de SaaS IA', 'Revendeurs d\'API', 'Créateurs d\'outils d\'automatisation', 'Équipes réduisant les coûts d\'inférence'],
    },
    explore: {
      title: 'En savoir plus',
      items: [
        { title: 'Alternative à OpenAI', desc: 'Moins cher, compatible OpenAI, disponible partout', to: '/openai-alternative' },
        { title: 'API DeepSeek', desc: 'Modèle de raisonnement efficace pour code & analyse', to: '/deepseek-api' },
        { title: 'API MiniMax', desc: 'Génération créative et conversation multi-scénario', to: '/minimax-api' },
        { title: 'API IA pas chère', desc: 'Économisez jusqu\'à 70% sur vos coûts API', to: '/cheap-ai-api' },
        { title: 'Tarifs API IA', desc: 'Comparaison réelle des prix par token', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: 'Les mêmes modèles. Une fraction du prix.',
      subtitle: 'Inscrivez-vous, obtenez votre clé API et commencez en quelques minutes.',
      button: 'Commencer gratuitement',
    },
  },

  ja: {
    hero: {
      badge: 'グローバル開発者向け AI API アグリゲーションプラットフォーム',
      title: 'AI API コストを半分以下に',
      subtitle: 'DeepSeek-V3 は 100 万 token あたり $0.28。GPT-4o は $10。同等の品質で、移行コストはほぼゼロ。',
      description: 'OpenAI API 互換。2 行変えるだけで切り替え完了。',
      primaryCta: '無料で API Key を取得',
      secondaryCta: '料金を見る',
    },
    stats: ['最大 70% のコスト削減', '40 以上のモデル', 'グローバル・無制限アクセス', 'OpenAI SDK 互換'],
    code: {
      title: '移行は 2 行だけ',
      subtitle: '他のコードはそのまま',
    },
    pricing: {
      title: '実際の価格を比較',
      subtitle: '100 万 token あたり（入力 / 出力）',
      badge: 'TokenHub 経由',
      note: '価格は参考値です。最新料金はコンソールでご確認ください。',
    },
    features: {
      title: '開発者が TokenHub を選ぶ理由',
      items: [
        { title: '圧倒的なコスト削減', description: 'DeepSeek-V3 は GPT-4o の約 3% のコスト。ほとんどのタスクで同等の品質を実現。' },
        { title: 'グローバル・無制限アクセス', description: '地域制限なし。世界中の開発者が直接接続できます。' },
        { title: 'マルチチャネルルーティング', description: '利用不可のチャネルを自動回避し、リクエスト失敗を低減。' },
        { title: 'そのまま差し替え可能', description: 'OpenAI SDK と完全互換。base_url と api_key を変えるだけ。' },
      ],
    },
    comparison: {
      title: '公式 API の課題',
      official: {
        title: '公式 API',
        items: ['エンタープライズ向けの高価格設定', '一部地域でアクセス制限あり', '単一プロバイダー — 障害時の代替なし'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['プロダクト向けの低価格', 'グローバルアクセス・制限なし', 'マルチチャネルで安定性向上'],
      },
    },
    models: {
      title: '利用可能なモデル',
      items: [
        'DeepSeek-V3 — 低コストで高品質な汎用推論',
        'DeepSeek-R1 — 高度な推論とコード分析',
        'MiniMax-Text-01 — チャット・創作・長文コンテキスト',
        '随時新モデルを追加中',
      ],
    },
    trust: {
      title: '開発者とリセラーのために',
      items: ['多段階 API キー管理', '従量課金・月額費用なし', 'リアルタイム使用量・コスト監視', '隠れた料金なし'],
    },
    audience: {
      title: 'こんな方に最適',
      items: ['AI SaaS 創業者', 'API リセラー', '自動化ツール開発者', '推論コストを下げたいチーム'],
    },
    explore: {
      title: 'もっと詳しく',
      items: [
        { title: 'OpenAI の代替', desc: '低コスト、OpenAI 互換、世界中で利用可能', to: '/openai-alternative' },
        { title: 'DeepSeek API', desc: 'コードと分析に最適な高効率推論モデル', to: '/deepseek-api' },
        { title: 'MiniMax API', desc: 'チャット・創作・多用途シナリオ対応', to: '/minimax-api' },
        { title: '格安 AI API', desc: 'API コストを最大 70% 削減', to: '/cheap-ai-api' },
        { title: 'AI API 料金比較', desc: '主要モデルの実際のトークン単価を比較', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: '同じモデル。はるかに低いコスト。',
      subtitle: '今すぐ登録して API キーを取得し、すぐに使い始めましょう。',
      button: '無料で始める',
    },
  },

  ru: {
    hero: {
      badge: 'Агрегирующая AI API платформа для разработчиков по всему миру',
      title: 'Сократите расходы на AI API вдвое',
      subtitle: 'DeepSeek-V3 — $0,28 за миллион токенов. GPT-4o берёт $10. Сопоставимое качество, миграция за пару минут.',
      description: 'Совместимо с OpenAI API. Измените две строки кода — и всё готово.',
      primaryCta: 'Получить бесплатный API-ключ',
      secondaryCta: 'Посмотреть цены',
    },
    stats: ['До 70% экономии', '40+ моделей', 'Глобальный доступ без ограничений', 'Совместимо с OpenAI SDK'],
    code: {
      title: 'Миграция — две строки',
      subtitle: 'Остальной код не меняется',
    },
    pricing: {
      title: 'Реальные цены рядом',
      subtitle: 'На миллион токенов (ввод / вывод)',
      badge: 'Через TokenHub',
      note: 'Цены ориентировочные. Актуальные тарифы — в консоли.',
    },
    features: {
      title: 'Почему разработчики выбирают TokenHub',
      items: [
        { title: 'Значительно ниже стоимость', description: 'DeepSeek-V3 стоит 3% от цены GPT-4o. Сопоставимое качество для большинства задач.' },
        { title: 'Глобальный доступ без блокировок', description: 'Никаких региональных ограничений. Разработчики из любой точки мира подключаются напрямую.' },
        { title: 'Маршрутизация по нескольким каналам', description: 'Запросы автоматически обходят недоступные каналы, снижая число ошибок.' },
        { title: 'Прямая замена', description: 'Полная совместимость с OpenAI SDK. Смените base_url и api_key — больше ничего.' },
      ],
    },
    comparison: {
      title: 'Проблема официальных API',
      official: {
        title: 'Официальные API',
        items: ['Корпоративные цены, не для разработчиков', 'Ограничен в ряде регионов', 'Один провайдер — нет запасного варианта'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['Доступные цены для коммерческих продуктов', 'Глобальный доступ без геоблокировок', 'Мультиканальная маршрутизация для надёжности'],
      },
    },
    models: {
      title: 'Доступные модели',
      items: [
        'DeepSeek-V3 — экономичный и качественный reasoning для большинства задач',
        'DeepSeek-R1 — сложный reasoning и анализ кода',
        'MiniMax-Text-01 — чат, творческая генерация, длинный контекст',
        'Новые модели добавляются регулярно',
      ],
    },
    trust: {
      title: 'Создано для разработчиков и реселлеров',
      items: ['Многоуровневое управление API-ключами', 'Оплата по факту, без абонентской платы', 'Мониторинг использования в реальном времени', 'Никаких скрытых платежей'],
    },
    audience: {
      title: 'Кто использует TokenHub',
      items: ['Основатели AI SaaS', 'API-реселлеры', 'Разработчики инструментов автоматизации', 'Команды, снижающие затраты на инференс'],
    },
    explore: {
      title: 'Узнать больше',
      items: [
        { title: 'Альтернатива OpenAI', desc: 'Дешевле, совместимо с OpenAI, доступно по всему миру', to: '/openai-alternative' },
        { title: 'API DeepSeek', desc: 'Эффективная reasoning-модель для кода и анализа', to: '/deepseek-api' },
        { title: 'API MiniMax', desc: 'Чат и творческая генерация для разных сценариев', to: '/minimax-api' },
        { title: 'Дешёвый AI API', desc: 'Экономия до 70% на API-расходах', to: '/cheap-ai-api' },
        { title: 'Цены на AI API', desc: 'Реальное сравнение цен за токен по основным моделям', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: 'Те же модели. Значительно ниже цена.',
      subtitle: 'Зарегистрируйтесь, получите API-ключ и начните работу за несколько минут.',
      button: 'Начать бесплатно',
    },
  },

  vi: {
    hero: {
      badge: 'Nền tảng tổng hợp AI API cho nhà phát triển toàn cầu',
      title: 'Cắt giảm chi phí AI API xuống một nửa',
      subtitle: 'DeepSeek-V3 chỉ $0.28/triệu token. GPT-4o tính $10. Chất lượng tương đương, chi phí chuyển đổi gần như bằng 0.',
      description: 'Tương thích OpenAI API. Thay đổi hai dòng code là xong.',
      primaryCta: 'Lấy API Key miễn phí',
      secondaryCta: 'Xem giá',
    },
    stats: ['Tiết kiệm tới 70%', '40+ mô hình', 'Toàn cầu, không giới hạn', 'Tương thích OpenAI SDK'],
    code: {
      title: 'Chuyển đổi chỉ 2 dòng',
      subtitle: 'Phần còn lại giữ nguyên',
    },
    pricing: {
      title: 'Giá thực tế, so sánh trực tiếp',
      subtitle: 'Trên 1 triệu token (đầu vào / đầu ra)',
      badge: 'Qua TokenHub',
      note: 'Giá mang tính tham khảo. Kiểm tra console để biết giá hiện tại.',
    },
    features: {
      title: 'Vì sao nhà phát triển chọn TokenHub',
      items: [
        { title: 'Giảm mạnh chi phí', description: 'DeepSeek-V3 chỉ bằng 3% giá GPT-4o. Chất lượng tương đương cho phần lớn tác vụ.' },
        { title: 'Truy cập toàn cầu, không bị chặn', description: 'Không hạn chế khu vực. Nhà phát triển khắp nơi kết nối trực tiếp.' },
        { title: 'Định tuyến đa kênh', description: 'Tự động chuyển sang kênh khả dụng, giảm thiểu lỗi do sự cố đơn điểm.' },
        { title: 'Thay thế tức thì', description: 'Tương thích hoàn toàn với OpenAI SDK. Chỉ đổi base_url và api_key.' },
      ],
    },
    comparison: {
      title: 'Vấn đề với API chính thức',
      official: {
        title: 'API chính thức',
        items: ['Giá doanh nghiệp, không phải cho developer', 'Bị hạn chế ở nhiều khu vực', 'Một nhà cung cấp — không có phương án dự phòng'],
      },
      tokenhub: {
        title: 'TokenHub',
        items: ['Chi phí thấp, phù hợp cho sản phẩm thương mại', 'Truy cập toàn cầu, không chặn theo vùng', 'Định tuyến đa kênh cho độ tin cậy cao hơn'],
      },
    },
    models: {
      title: 'Các mô hình có sẵn',
      items: [
        'DeepSeek-V3 — lý luận chi phí thấp, chất lượng cao cho phần lớn tác vụ',
        'DeepSeek-R1 — lý luận nâng cao và phân tích code',
        'MiniMax-Text-01 — chat, sáng tạo, ngữ cảnh dài',
        'Thêm mô hình mới thường xuyên',
      ],
    },
    trust: {
      title: 'Dành cho nhà phát triển và reseller',
      items: ['Quản lý API key đa cấp', 'Thanh toán theo dùng, không phí tháng', 'Theo dõi lượng dùng và chi phí thời gian thực', 'Không có phí ẩn'],
    },
    audience: {
      title: 'Ai đang dùng TokenHub',
      items: ['Nhà sáng lập AI SaaS', 'API reseller', 'Nhà phát triển công cụ tự động hóa', 'Nhóm muốn giảm chi phí inference'],
    },
    explore: {
      title: 'Khám phá thêm',
      items: [
        { title: 'Thay thế OpenAI', desc: 'Rẻ hơn, tương thích OpenAI, dùng được toàn cầu', to: '/openai-alternative' },
        { title: 'API DeepSeek', desc: 'Mô hình lý luận hiệu quả cho code & phân tích', to: '/deepseek-api' },
        { title: 'API MiniMax', desc: 'Chat và sáng tạo nội dung, nhiều kịch bản', to: '/minimax-api' },
        { title: 'AI API giá rẻ', desc: 'Tiết kiệm tới 70% chi phí API', to: '/cheap-ai-api' },
        { title: 'So sánh giá AI API', desc: 'Giá token thực tế của các mô hình phổ biến', to: '/ai-api-pricing' },
      ],
    },
    finalCta: {
      title: 'Cùng mô hình. Giá thấp hơn nhiều.',
      subtitle: 'Đăng ký ngay, lấy API key và bắt đầu trong vài phút.',
      button: 'Bắt đầu miễn phí',
    },
  },
};

// ── 价格对比数据（language-agnostic） ─────────────────────────────────────────
const PRICING_DATA = [
  { model: 'GPT-4o',          provider: 'OpenAI',    input: '$2.50',  output: '$10.00', highlight: false },
  { model: 'GPT-4o mini',     provider: 'OpenAI',    input: '$0.15',  output: '$0.60',  highlight: false },
  { model: 'DeepSeek-V3',     provider: 'TokenHub',  input: '$0.07',  output: '$0.28',  highlight: true  },
  { model: 'DeepSeek-R1',     provider: 'TokenHub',  input: '$0.14',  output: '$0.55',  highlight: true  },
  { model: 'MiniMax-Text-01', provider: 'TokenHub',  input: '$0.10',  output: '$0.40',  highlight: true  },
];

const FEATURE_ICONS = [Zap, Globe, Shield, Puzzle];

function getLang(i18nLang) {
  if (i18nLang.startsWith('zh-TW') || i18nLang.startsWith('zh-Hant')) return 'zh-TW';
  if (i18nLang.startsWith('zh')) return 'zh-CN';
  if (MARKETING[i18nLang]) return i18nLang;
  const short = i18nLang.split('-')[0];
  if (MARKETING[short]) return short;
  return 'en';
}

// ── 营销首页组件 ───────────────────────────────────────────────────────────────
const MarketingHome = ({ lang }) => {
  const c = MARKETING[lang] || MARKETING['en'];
  const isMobile = useIsMobile();

  return (
    <div className='w-full overflow-x-hidden'>

      {/* ── Hero ── */}
      <section className='relative w-full min-h-[600px] flex items-center justify-center overflow-hidden border-b border-semi-color-border'>
        <div className='blur-ball blur-ball-indigo' />
        <div className='blur-ball blur-ball-teal' />
        <div className='relative z-10 flex flex-col items-center text-center px-4 py-24 max-w-3xl mx-auto'>
          <span className='inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full border border-semi-color-border text-semi-color-text-2 bg-semi-color-fill-0'>
            {c.hero.badge}
          </span>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-semi-color-text-0 leading-tight mb-5'>
            {c.hero.title}
          </h1>
          <p className='text-base md:text-lg text-semi-color-text-1 mb-3 max-w-2xl'>
            {c.hero.subtitle}
          </p>
          <p className='text-sm text-semi-color-text-2 mb-8 max-w-xl'>
            {c.hero.description}
          </p>
          <div className='flex flex-row gap-3 flex-wrap justify-center'>
            <Link to='/console'>
              <Button theme='solid' type='primary' size={isMobile ? 'default' : 'large'} className='!rounded-3xl !px-8' icon={<IconPlay />}>
                {c.hero.primaryCta}
              </Button>
            </Link>
            <Link to='/ai-api-pricing'>
              <Button size={isMobile ? 'default' : 'large'} className='!rounded-3xl !px-8'>
                {c.hero.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className='w-full border-b border-semi-color-border bg-semi-color-fill-0'>
        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4'>
          {c.stats.map((stat, i) => (
            <div key={i} className={`px-6 py-5 text-center ${i < c.stats.length - 1 ? 'border-r border-semi-color-border' : ''}`}>
              <p className='text-sm font-semibold text-semi-color-text-0'>{stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Code snippet ── */}
      <section className='w-full py-20 px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-semi-color-text-0 mb-2'>{c.code.title}</h2>
            <p className='text-semi-color-text-2'>{c.code.subtitle}</p>
          </div>
          <div className='rounded-xl border border-semi-color-border overflow-hidden'>
            {/* window bar */}
            <div className='flex items-center gap-1.5 px-4 py-3 bg-semi-color-fill-1 border-b border-semi-color-border'>
              <span className='w-3 h-3 rounded-full bg-red-400' />
              <span className='w-3 h-3 rounded-full bg-yellow-400' />
              <span className='w-3 h-3 rounded-full bg-green-400' />
            </div>
            <div className='p-5 font-mono text-sm bg-semi-color-fill-0 space-y-1 leading-relaxed'>
              <p className='text-semi-color-text-2 text-xs mb-3'># Before</p>
              <p><span className='text-red-400'>- </span><span className='text-semi-color-text-2'>base_url = </span><span className='text-green-500'>"https://api.openai.com/v1"</span></p>
              <p><span className='text-red-400'>- </span><span className='text-semi-color-text-2'>api_key  = </span><span className='text-green-500'>"sk-..."</span></p>
              <p className='text-semi-color-text-2 text-xs mt-4 mb-3'># After (TokenHub)</p>
              <p><span className='text-green-400'>+ </span><span className='text-semi-color-text-2'>base_url = </span><span className='text-green-500'>"https://your-tokenhub-domain/v1"</span></p>
              <p><span className='text-green-400'>+ </span><span className='text-semi-color-text-2'>api_key  = </span><span className='text-green-500'>"&lt;your TokenHub key&gt;"</span></p>
              <p className='text-semi-color-text-2 text-xs mt-4 mb-3'># Then pick a model</p>
              <p><span className='text-semi-color-text-2'>  model    = </span><span className='text-green-500'>"deepseek-v3"</span><span className='text-semi-color-text-2'>  # or deepseek-r1, minimax-text-01 ...</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing comparison ── */}
      <section className='w-full py-20 px-4 bg-semi-color-fill-0 border-t border-semi-color-border'>
        <div className='max-w-3xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-semi-color-text-0 mb-2'>{c.pricing.title}</h2>
            <p className='text-semi-color-text-2'>{c.pricing.subtitle}</p>
          </div>
          <div className='overflow-x-auto rounded-xl border border-semi-color-border bg-semi-color-bg-0'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-b border-semi-color-border bg-semi-color-fill-1'>
                  <th className='text-left px-4 py-3 text-semi-color-text-2 font-medium'>Model</th>
                  <th className='text-left px-4 py-3 text-semi-color-text-2 font-medium'>Provider</th>
                  <th className='text-right px-4 py-3 text-semi-color-text-2 font-medium'>Input</th>
                  <th className='text-right px-4 py-3 text-semi-color-text-2 font-medium'>Output</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_DATA.map((row, i) => (
                  <tr key={i} className={`border-b border-semi-color-border last:border-0 ${row.highlight ? 'bg-semi-color-primary-light-default' : ''}`}>
                    <td className='px-4 py-3 font-medium text-semi-color-text-0'>{row.model}</td>
                    <td className='px-4 py-3'>
                      {row.highlight ? (
                        <span className='inline-flex items-center gap-1.5 font-medium text-semi-color-text-0'>
                          {row.provider}
                          <span className='text-xs px-1.5 py-0.5 rounded border border-green-500 text-green-600 dark:text-green-400'>{c.pricing.badge}</span>
                        </span>
                      ) : (
                        <span className='text-semi-color-text-2'>{row.provider}</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${row.highlight ? 'text-green-600 dark:text-green-400' : 'text-semi-color-text-2'}`}>{row.input}</td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${row.highlight ? 'text-green-600 dark:text-green-400' : 'text-semi-color-text-2'}`}>{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='text-xs text-semi-color-text-2 mt-3 text-center'>{c.pricing.note}</p>
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
                <div key={i} className='flex flex-col gap-3 p-6 rounded-xl border border-semi-color-border bg-semi-color-bg-1 hover:border-semi-color-primary transition-colors'>
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
      <section className='w-full py-20 px-4 bg-semi-color-fill-0 border-t border-semi-color-border'>
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

      {/* ── Models + Trust + Audience ── */}
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

      {/* ── Explore ── */}
      <section className='w-full py-20 px-4 bg-semi-color-fill-0 border-t border-semi-color-border'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold text-center text-semi-color-text-0 mb-10'>
            {c.explore.title}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {c.explore.items.map((item, i) => (
              <Link key={i} to={item.to} className='block p-5 rounded-xl border border-semi-color-border bg-semi-color-bg-1 hover:border-semi-color-primary hover:shadow-sm transition-all group'>
                <p className='font-semibold text-semi-color-text-0 mb-1 group-hover:text-semi-color-primary transition-colors'>{item.title}</p>
                <p className='text-sm text-semi-color-text-2'>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className='w-full py-24 px-4 border-t border-semi-color-border'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-semi-color-text-0 mb-3'>
            {c.finalCta.title}
          </h2>
          <p className='text-semi-color-text-2 mb-8'>{c.finalCta.subtitle}</p>
          <Link to='/console'>
            <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-10' icon={<IconArrowRight />} iconPosition='right'>
              {c.finalCta.button}
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

// ── 主页面组件 ─────────────────────────────────────────────────────────────────
const Home = () => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
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
      <NoticeModal visible={noticeVisible} onClose={() => setNoticeVisible(false)} isMobile={isMobile} />
      <MarketingHome lang={lang} />
    </div>
  );
};

export default Home;
