import React, { useEffect } from 'react';
import { Button, Typography } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

const SEO_LINKS = [
  { to: '/openai-alternative', label: 'Best OpenAI Alternative' },
  { to: '/deepseek-api', label: 'DeepSeek API Access' },
  { to: '/minimax-api', label: 'MiniMax API Access' },
  { to: '/ai-api-pricing', label: 'AI API Pricing Comparison' },
];

export default function CheapAiApi() {
  useEffect(() => {
    document.title = 'Cheap AI API – Save 70% Cost Compared to OpenAI | TokenHub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Find the cheapest AI API for developers. Save up to 70% compared to OpenAI with global access and stable routing.');
  }, []);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      {/* H1 */}
      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · Cheap AI API</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>
          Cheap AI API for Developers
        </h1>
        <p className='text-lg text-semi-color-text-1'>
          Save up to 70% on AI API costs compared to official providers. Access powerful models like DeepSeek and MiniMax with global availability, stable routing, and an OpenAI-compatible interface.
        </p>
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

      {/* H2: What is an AI API */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>What is an AI API?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          An AI API (Application Programming Interface) gives developers programmatic access to large language models (LLMs) like GPT, DeepSeek, and MiniMax. Instead of building or hosting your own model, you send requests to an API endpoint and receive generated text, code, or analysis in return.
        </p>
        <p className='text-semi-color-text-1 leading-relaxed'>
          AI APIs are used in products ranging from chatbots and coding assistants to document summarizers, content generators, and automated data pipelines. The cost of these API calls directly affects the unit economics of any AI-powered product.
        </p>
      </section>

      {/* H2: Why official APIs are expensive */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Why Are Official AI APIs So Expensive?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          Major AI providers price their APIs to cover infrastructure, research, and ongoing model improvements — and to maintain margins. For developers building high-volume or commercial products, these prices add up quickly.
        </p>
        <ul className='space-y-2 text-semi-color-text-1'>
          {[
            'Pricing is set for enterprise budgets, not developer-scale usage',
            'Rate limits and regional restrictions add friction',
            'Premium model pricing even when a smaller model would suffice',
            'No built-in cost controls or multi-provider routing',
          ].map((item, i) => (
            <li key={i} className='flex items-start gap-2 text-sm'>
              <span className='w-1.5 h-1.5 rounded-full bg-semi-color-primary mt-2 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* H2: How to reduce AI costs */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>How to Reduce AI API Costs</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          There are several strategies developers use to lower their AI API spend:
        </p>
        <ol className='space-y-3 text-semi-color-text-1'>
          {[
            { title: 'Use cost-efficient models', desc: 'Models like DeepSeek offer comparable quality at a fraction of the cost of top-tier GPT or Claude models.' },
            { title: 'Route requests intelligently', desc: 'Multi-provider routing sends requests to the most available and cost-effective model for each use case.' },
            { title: 'Choose aggregator platforms', desc: 'API aggregators consolidate access to multiple providers under one endpoint, often at negotiated rates.' },
            { title: 'Pay only for what you use', desc: 'Avoid flat-rate subscriptions for variable workloads. Pay-as-you-go keeps costs proportional to usage.' },
          ].map((item, i) => (
            <li key={i} className='flex gap-3'>
              <span className='font-bold text-semi-color-primary'>{i + 1}.</span>
              <span><strong>{item.title}</strong> — {item.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* H2: TokenHub solution */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>The TokenHub Solution</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          TokenHub is a low-cost AI API platform designed for developers and teams who need reliable model access without overpaying. It aggregates access to multiple high-quality models and routes requests efficiently to keep costs down.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            'Up to 70% lower cost than official APIs',
            'OpenAI-compatible API format',
            'Global access, no regional restrictions',
            'Stable multi-channel routing',
            'Pay-as-you-go, no hidden fees',
            'Access to DeepSeek, MiniMax, and more',
          ].map((item, i) => (
            <div key={i} className='flex items-center gap-2 text-sm text-semi-color-text-1'>
              <Check size={14} className='text-green-500 flex-shrink-0' />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className='rounded-xl border border-semi-color-border bg-semi-color-fill-0 p-8 text-center'>
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>Start Using a Cheaper AI API Today</h2>
        <p className='text-semi-color-text-2 mb-6'>Get your API key and integrate in minutes. No commitment required.</p>
        <Link to='/console'>
          <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-10' icon={<IconArrowRight />} iconPosition='right'>
            Get API Key
          </Button>
        </Link>
      </section>

      {/* Internal links */}
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
