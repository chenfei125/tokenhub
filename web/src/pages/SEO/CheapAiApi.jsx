import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLang, SEO } from './seoI18n';

const SEO_LINKS = [
  { to: '/openai-alternative', label: 'OpenAI Alternative' },
  { to: '/deepseek-api',       label: 'DeepSeek API' },
  { to: '/minimax-api',        label: 'MiniMax API' },
  { to: '/ai-api-pricing',     label: 'AI API Pricing' },
];

export default function CheapAiApi() {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const c = SEO.cheapAiApi[lang] || SEO.cheapAiApi['en'];

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
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · Cheap AI API</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>{c.h1}</h1>
        <p className='text-lg text-semi-color-text-1'>{c.intro}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link to='/console'>
            <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-8' icon={<IconArrowRight />} iconPosition='right'>
              Get API Key
            </Button>
          </Link>
          <Link to='/ai-api-pricing'>
            <Button size='large' className='!rounded-3xl !px-8'>View Pricing</Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.whatTitle}</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>{c.what1}</p>
        <p className='text-semi-color-text-1 leading-relaxed'>{c.what2}</p>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.whyExpensiveTitle}</h2>
        <ul className='space-y-2'>
          {c.whyExpensiveItems.map((item, i) => (
            <li key={i} className='flex items-start gap-2 text-sm text-semi-color-text-1'>
              <span className='w-1.5 h-1.5 rounded-full bg-semi-color-primary mt-2 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>{c.howReduceTitle}</h2>
        <ol className='space-y-3'>
          {c.howReduceItems.map((item, i) => (
            <li key={i} className='flex gap-3'>
              <span className='font-bold text-semi-color-primary flex-shrink-0'>{i + 1}.</span>
              <span className='text-sm text-semi-color-text-1'>
                <strong>{item.title}</strong> — {item.desc}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-3'>{c.solutionTitle}</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>{c.solutionIntro}</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {c.solutionItems.map((item, i) => (
            <div key={i} className='flex items-center gap-2 text-sm text-semi-color-text-1'>
              <Check size={14} className='text-green-500 flex-shrink-0' />
              {item}
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
