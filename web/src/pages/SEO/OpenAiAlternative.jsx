import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check, X } from 'lucide-react';

const SEO_LINKS = [
  { to: '/cheap-ai-api', label: 'Cheap AI API' },
  { to: '/deepseek-api', label: 'DeepSeek API Access' },
  { to: '/minimax-api', label: 'MiniMax API Access' },
  { to: '/ai-api-pricing', label: 'AI API Pricing Comparison' },
];

const COMPARE_ROWS = [
  { label: 'Pricing', openai: 'Premium pricing', tokenhub: 'Up to 70% lower cost' },
  { label: 'Regional access', openai: 'Restricted in some regions', tokenhub: 'Global, no restrictions' },
  { label: 'API format', openai: 'OpenAI format', tokenhub: 'OpenAI-compatible' },
  { label: 'Model variety', openai: 'OpenAI models only', tokenhub: 'DeepSeek, MiniMax, and more' },
  { label: 'Billing', openai: 'Pay-as-you-go', tokenhub: 'Pay-as-you-go, no hidden fees' },
  { label: 'Routing', openai: 'Single provider', tokenhub: 'Multi-channel stable routing' },
];

export default function OpenAiAlternative() {
  useEffect(() => {
    document.title = 'Best OpenAI Alternative for Lower Cost | TokenHub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Looking for an OpenAI alternative? Reduce API costs and keep global access with TokenHub.');
  }, []);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · OpenAI Alternative</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>
          Best OpenAI Alternative
        </h1>
        <p className='text-lg text-semi-color-text-1'>
          Looking for a cost-effective OpenAI alternative with global access and stable routing? TokenHub gives you access to powerful AI models at significantly lower cost — with full OpenAI API compatibility.
        </p>
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

      {/* H2: OpenAI limitations */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>The Problem with OpenAI's Official API</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          OpenAI has pioneered the large language model space, but its official API comes with constraints that make it difficult for some developers and businesses to use at scale:
        </p>
        <div className='space-y-3'>
          {[
            { title: 'High pricing', desc: 'GPT-4 class models are priced for large enterprise budgets. For developers building consumer or high-volume products, costs scale quickly.' },
            { title: 'Regional restrictions', desc: 'OpenAI\'s API is not available in all countries. Developers in restricted regions face significant friction when accessing models.' },
            { title: 'Single-provider dependency', desc: 'Relying solely on one provider creates risk. Outages, policy changes, or price increases directly impact your product.' },
            { title: 'Limited model variety', desc: 'Official OpenAI API only covers OpenAI models, limiting your ability to use cost-efficient alternatives for specific tasks.' },
          ].map((item, i) => (
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

      {/* H2: Alternatives analysis */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>What to Look for in an OpenAI Alternative</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          Not every OpenAI alternative is built the same. When evaluating options, developers should consider:
        </p>
        <ul className='space-y-2 text-semi-color-text-1'>
          {[
            'API compatibility — does it work with existing OpenAI SDK code?',
            'Model quality — can it handle your use case reliably?',
            'Pricing transparency — are costs predictable with no hidden fees?',
            'Uptime and routing stability — is there redundancy to prevent failures?',
            'Global availability — can users in different regions access it?',
          ].map((item, i) => (
            <li key={i} className='flex items-start gap-2 text-sm'>
              <Check size={14} className='text-green-500 mt-0.5 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* H2: TokenHub advantages */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Why TokenHub is a Strong OpenAI Alternative</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          TokenHub is built specifically for developers who need reliable, low-cost AI API access without compromising on compatibility or quality. Here's what makes it a practical choice:
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            { title: 'OpenAI-compatible format', desc: 'Switch with minimal code changes. Just update the base URL and API key.' },
            { title: 'Lower cost', desc: 'Access models at up to 70% lower cost than OpenAI\'s official pricing.' },
            { title: 'Global availability', desc: 'No regional blocks. Accessible to developers worldwide.' },
            { title: 'Multiple models', desc: 'DeepSeek, MiniMax, and other high-performance models in one place.' },
            { title: 'Stable routing', desc: 'Multi-channel routing ensures requests go through even if one channel has issues.' },
            { title: 'Simple billing', desc: 'Pay for what you use. No subscription lock-in, no hidden charges.' },
          ].map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H2: Comparison table */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>OpenAI vs TokenHub — Side-by-Side Comparison</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-semi-color-border'>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>Feature</th>
                <th className='text-left py-3 pr-4 text-semi-color-text-2 font-medium'>OpenAI API</th>
                <th className='text-left py-3 text-semi-color-primary font-medium'>TokenHub</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={i} className='border-b border-semi-color-border last:border-0'>
                  <td className='py-3 pr-4 font-medium text-semi-color-text-0'>{row.label}</td>
                  <td className='py-3 pr-4 text-semi-color-text-2'>{row.openai}</td>
                  <td className='py-3 text-semi-color-text-0'>{row.tokenhub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section className='rounded-xl border border-semi-color-border bg-semi-color-fill-0 p-8 text-center'>
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>Switch to a Better OpenAI Alternative</h2>
        <p className='text-semi-color-text-2 mb-6'>OpenAI-compatible API. Lower cost. Global access. Get started in minutes.</p>
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
