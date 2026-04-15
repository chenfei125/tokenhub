import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLang, SEO } from './seoI18n';

const SEO_LINKS = [
  { to: '/cheap-ai-api',   label: 'Cheap AI API' },
  { to: '/deepseek-api',   label: 'DeepSeek API' },
  { to: '/minimax-api',    label: 'MiniMax API' },
  { to: '/ai-api-pricing', label: 'AI API Pricing' },
];

export default function OpenAiAlternative() {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const c = SEO.openAiAlternative[lang] || SEO.openAiAlternative['en'];

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
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · OpenAI Alternative</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>{c.h1}</h1>
        <p className='text-lg text-semi-color-text-1'>{c.intro}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link to='/console'>
            <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-8' icon={<IconArrowRight />} iconPosition='right'>
              Get API Key
            </Button>
          </Link>
          <Link to='/ai-api-pricing'>
            <Button size='large' className='!rounded-3xl !px-8'>Compare Pricing</Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-3'>{c.problemTitle}</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>{c.problemIntro}</p>
        <div className='space-y-3'>
          {c.problemItems.map((item, i) => (
            <div key={i} className='flex gap-3 p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <X size={16} className='text-red-400 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-semi-color-text-0 text-sm'>{item.title}</p>
                <p className='text-sm text-semi-color-text-2 mt-1'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.lookForTitle}</h2>
        <ul className='space-y-2'>
          {c.lookForItems.map((item, i) => (
            <li key={i} className='flex items-start gap-2 text-sm text-semi-color-text-1'>
              <Check size={14} className='text-green-500 mt-0.5 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.whyTitle}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {c.whyItems.map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

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
