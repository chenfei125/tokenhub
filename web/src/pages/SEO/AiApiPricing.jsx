import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';

const SEO_LINKS = [
  { to: '/cheap-ai-api', label: 'Cheap AI API' },
  { to: '/openai-alternative', label: 'OpenAI Alternative' },
  { to: '/deepseek-api', label: 'DeepSeek API Access' },
  { to: '/minimax-api', label: 'MiniMax API Access' },
];

const PRICING_ROWS = [
  { model: 'GPT-4o', provider: 'OpenAI', input: '$2.50', output: '$10.00', note: 'Official pricing' },
  { model: 'GPT-4o mini', provider: 'OpenAI', input: '$0.15', output: '$0.60', note: 'Official pricing' },
  { model: 'DeepSeek-V3', provider: 'TokenHub', input: '$0.07', output: '$0.28', note: 'Via TokenHub' },
  { model: 'DeepSeek-R1', provider: 'TokenHub', input: '$0.14', output: '$0.55', note: 'Via TokenHub' },
  { model: 'MiniMax-Text-01', provider: 'TokenHub', input: '$0.10', output: '$0.40', note: 'Via TokenHub' },
];

export default function AiApiPricing() {
  useEffect(() => {
    document.title = 'AI API Pricing Comparison | Save Cost on LLM APIs | TokenHub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Compare AI API pricing across providers. See how much you can save using DeepSeek and MiniMax via TokenHub vs OpenAI.');
  }, []);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · AI API Pricing</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>
          AI API Pricing Comparison
        </h1>
        <p className='text-lg text-semi-color-text-1'>
          Compare costs across major AI API providers. Understand the pricing structure of LLMs and see how much you can save by choosing the right model and platform.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link to='/console'>
            <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-8' icon={<IconArrowRight />} iconPosition='right'>
              Get API Key
            </Button>
          </Link>
          <Link to='/cheap-ai-api'>
            <Button size='large' className='!rounded-3xl !px-8'>Learn About Cheap AI APIs</Button>
          </Link>
        </div>
      </section>

      {/* H2: How AI API pricing works */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>How AI API Pricing Works</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          Most AI APIs are priced per token, where a token is roughly 4 characters of text. Pricing is split between input tokens (your prompt) and output tokens (the model's response). Output tokens are typically more expensive because they require more computation.
        </p>
        <p className='text-semi-color-text-1 leading-relaxed'>
          When evaluating API costs, consider your usage pattern: read-heavy applications (document summarization, classification) spend most tokens on input, while generative applications (content creation, coding) tend to consume more output tokens.
        </p>
      </section>

      {/* H2: Pricing comparison table */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>LLM API Pricing Comparison</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          Prices are shown per 1 million tokens (input / output). TokenHub prices reflect access through the aggregated platform:
        </p>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-semi-color-border'>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>Model</th>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>Provider</th>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>Input /M tokens</th>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>Output /M tokens</th>
                <th className='text-left py-3 text-semi-color-text-2 font-medium'>Note</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_ROWS.map((row, i) => (
                <tr key={i} className='border-b border-semi-color-border last:border-0'>
                  <td className='py-3 pr-4 font-medium text-semi-color-text-0'>{row.model}</td>
                  <td className={`py-3 pr-4 ${row.provider === 'TokenHub' ? 'text-semi-color-primary font-medium' : 'text-semi-color-text-2'}`}>{row.provider}</td>
                  <td className='py-3 pr-4 text-semi-color-text-1'>{row.input}</td>
                  <td className='py-3 pr-4 text-semi-color-text-1'>{row.output}</td>
                  <td className='py-3 text-semi-color-text-2 text-xs'>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className='text-xs text-semi-color-text-2 mt-3'>Prices are approximate and may change. Check the console for current rates.</p>
      </section>

      {/* H2: Cost structure */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Understanding AI API Cost Structure</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          API costs for AI products are determined by several factors beyond the per-token rate:
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            { title: 'Token consumption', desc: 'Total input + output tokens across all requests. Use prompt compression and context management to reduce waste.' },
            { title: 'Model selection', desc: 'Larger models cost more. Use the smallest model that satisfies your quality requirement for each task.' },
            { title: 'Request volume', desc: 'High-volume applications benefit most from per-token pricing over flat subscriptions.' },
            { title: 'Context window usage', desc: 'Sending long conversation histories on every request multiplies costs quickly. Implement context trimming strategies.' },
          ].map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H2: Why TokenHub cheaper */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Why Is TokenHub Cheaper Than Direct API Access?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          TokenHub aggregates demand across many developers and negotiates access at better rates than individual developer plans. Several structural advantages contribute to lower costs:
        </p>
        <ul className='space-y-3'>
          {[
            { title: 'Aggregated access', desc: 'Volume across the platform enables better pricing that individual accounts cannot access.' },
            { title: 'Efficient model routing', desc: 'Requests are routed to the most cost-effective available channel, reducing overhead.' },
            { title: 'No premium markup', desc: 'TokenHub passes savings to developers rather than charging enterprise margins on top.' },
            { title: 'Cost-efficient model catalog', desc: 'Models like DeepSeek deliver strong results at a fraction of the price of GPT-4 class models.' },
          ].map((item, i) => (
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
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>Pay Less for the Same AI Quality</h2>
        <p className='text-semi-color-text-2 mb-6'>Access DeepSeek, MiniMax and more at lower cost. No commitment required.</p>
        <Link to='/console'>
          <Button theme='solid' type='primary' size='large' className='!rounded-3xl !px-10' icon={<IconArrowRight />} iconPosition='right'>
            Get API Key
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
