import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLang, SEO } from './seoI18n';

const SEO_LINKS = [
  { to: '/cheap-ai-api',       label: 'Cheap AI API' },
  { to: '/openai-alternative', label: 'OpenAI Alternative' },
  { to: '/deepseek-api',       label: 'DeepSeek API Access' },
  { to: '/minimax-api',        label: 'MiniMax API Access' },
];

const PRICING_DATA = [
  { model: 'GPT-4o',          provider: 'OpenAI',    input: '$2.50',  output: '$10.00', highlight: false },
  { model: 'GPT-4o mini',     provider: 'OpenAI',    input: '$0.15',  output: '$0.60',  highlight: false },
  { model: 'DeepSeek-V3',     provider: 'TokenHub',  input: '$0.07',  output: '$0.28',  highlight: true  },
  { model: 'DeepSeek-R1',     provider: 'TokenHub',  input: '$0.14',  output: '$0.55',  highlight: true  },
  { model: 'MiniMax-Text-01', provider: 'TokenHub',  input: '$0.10',  output: '$0.40',  highlight: true  },
];

export default function AiApiPricing() {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const c = SEO.aiApiPricing[lang] || SEO.aiApiPricing['en'];

  useEffect(() => {
    document.title = c.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', c.description);
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', c.keywords);
  }, [c]);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · AI API Pricing</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>{c.h1}</h1>
        <p className='text-lg text-semi-color-text-1'>{c.intro}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link to='/console'>
            <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-8' icon={<IconArrowRight />} iconPosition='right'>
              Get API Key
            </Button>
          </Link>
          <Link to='/cheap-ai-api'>
            <Button size='large' className='!rounded-3xl !px-8'>Cheap AI API</Button>
          </Link>
        </div>
      </section>

      {/* Pricing table */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-2'>{c.pricingTitle}</h2>
        <p className='text-semi-color-text-2 mb-4 text-sm'>{c.pricingSubtitle}</p>
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
                        <span className='text-xs px-1.5 py-0.5 rounded border border-green-500 text-green-600 dark:text-green-400'>{c.priceBadge}</span>
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
        <p className='text-xs text-semi-color-text-2 mt-3'>{c.note}</p>
      </section>

      {/* How pricing works */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.howTitle}</h2>
        <p className='text-semi-color-text-1 leading-relaxed'>{c.how}</p>
      </section>

      {/* Cost factors */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.costTitle}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {c.costItems.map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TokenHub cheaper */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.whyTitle}</h2>
        <ul className='space-y-3'>
          {c.whyItems.map((item, i) => (
            <li key={i} className='flex gap-3 p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <Check size={16} className='text-green-500 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-semi-color-text-0 text-sm'>{item.title}</p>
                <p className='text-sm text-semi-color-text-2 mt-1'>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className='rounded-xl border border-semi-color-border bg-semi-color-fill-0 p-8 text-center'>
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>{c.ctaTitle}</h2>
        <p className='text-semi-color-text-2 mb-6'>{c.ctaSubtitle}</p>
        <Link to='/console'>
          <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-10' icon={<IconArrowRight />} iconPosition='right'>
            {c.ctaButton}
          </Button>
        </Link>
      </section>

      <section className='border-t border-semi-color-border pt-8'>
        <p className='text-sm text-semi-color-text-2 mb-3'>Related pages:</p>
        <div className='flex flex-wrap gap-3'>
          {SEO_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className='text-sm text-semi-color-primary hover:underline'>{l.label}</Link>
          ))}
          <Link to='/' className='text-sm text-semi-color-primary hover:underline'>← Back to Home</Link>
        </div>
      </section>

    </div>
  );
}
