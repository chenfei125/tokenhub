import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';

const SEO_LINKS = [
  { to: '/cheap-ai-api', label: 'Cheap AI API' },
  { to: '/openai-alternative', label: 'OpenAI Alternative' },
  { to: '/minimax-api', label: 'MiniMax API Access' },
  { to: '/ai-api-pricing', label: 'AI API Pricing Comparison' },
];

export default function DeepSeekApi() {
  useEffect(() => {
    document.title = 'DeepSeek API Access | Low Cost AI API | TokenHub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Access DeepSeek API globally with lower cost and OpenAI-compatible integration.');
  }, []);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · DeepSeek API</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>
          DeepSeek API Access
        </h1>
        <p className='text-lg text-semi-color-text-1'>
          Access DeepSeek models through a globally available, OpenAI-compatible API at significantly lower cost. Integrate in minutes using your existing OpenAI SDK setup.
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

      {/* H2: What is DeepSeek */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>What is DeepSeek?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          DeepSeek is a family of large language models developed for high-efficiency reasoning and general-purpose text generation. Its models are designed to deliver strong performance at a fraction of the cost of top-tier proprietary models, making them particularly well-suited for developers who need to balance quality with budget.
        </p>
        <p className='text-semi-color-text-1 leading-relaxed'>
          DeepSeek models have gained traction in the developer community due to their competitive benchmark results and transparent pricing. The DeepSeek-V3 and DeepSeek-R1 series, in particular, have been widely adopted for coding tasks, analysis, and reasoning-heavy applications.
        </p>
      </section>

      {/* H2: Use cases */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>DeepSeek API Use Cases</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          DeepSeek models are versatile and can power a wide range of developer applications:
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            { title: 'Code generation & review', desc: 'Generate, complete, and review code across multiple languages. Useful for IDE integrations and CI pipelines.' },
            { title: 'Document analysis', desc: 'Summarize, extract, and classify content from large documents at low per-token cost.' },
            { title: 'Reasoning tasks', desc: 'Chain-of-thought reasoning makes DeepSeek suitable for structured problem-solving workflows.' },
            { title: 'Chatbots and assistants', desc: 'Build conversational AI products with strong language understanding at reduced inference cost.' },
            { title: 'Data processing pipelines', desc: 'Run high-volume batch jobs where cost efficiency per request is critical.' },
            { title: 'Research and experimentation', desc: 'Experiment with large-scale prompts without worrying about prohibitive API costs.' },
          ].map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H2: Why cheaper */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Why Is DeepSeek API Access Cheaper?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          DeepSeek models are designed for efficiency. Their architecture achieves competitive results with fewer computational resources, which translates directly into lower inference costs. Compared to GPT-4 class models, DeepSeek can deliver comparable quality for many tasks at a much lower price per token.
        </p>
        <p className='text-semi-color-text-1 leading-relaxed'>
          Through TokenHub, you access DeepSeek via an aggregated platform that further optimizes routing to reduce latency and cost. You get the full benefit of DeepSeek's pricing without dealing with direct access complexity.
        </p>
      </section>

      {/* H2: How to use via TokenHub */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>How to Access DeepSeek API via TokenHub</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          Getting started takes just a few minutes. Because TokenHub uses an OpenAI-compatible API format, you only need to change two lines in your existing code:
        </p>
        <div className='rounded-lg border border-semi-color-border bg-semi-color-fill-0 p-4 font-mono text-sm text-semi-color-text-1 space-y-2 mb-4'>
          <p className='text-semi-color-text-2 text-xs mb-2'>// Before (OpenAI)</p>
          <p>{'base_url = "https://api.openai.com/v1"'}</p>
          <p>{'api_key  = "sk-..."'}</p>
          <p className='text-semi-color-text-2 text-xs mt-4 mb-2'>// After (TokenHub)</p>
          <p>{'base_url = "https://your-tokenhub-domain/v1"'}</p>
          <p>{'api_key  = "<your TokenHub key>"'}</p>
          <p className='text-semi-color-text-2 text-xs mt-4 mb-2'>// Then select the model</p>
          <p>{'model    = "deepseek-v3"   // or deepseek-r1, etc.'}</p>
        </div>
        <ul className='space-y-2'>
          {[
            'Sign up and get your API key from the console',
            'Set the base URL to your TokenHub endpoint',
            'Specify a DeepSeek model in your request',
            'Your existing OpenAI SDK calls work without other changes',
          ].map((item, i) => (
            <li key={i} className='flex items-center gap-2 text-sm text-semi-color-text-1'>
              <Check size={14} className='text-green-500 flex-shrink-0' />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className='rounded-xl border border-semi-color-border bg-semi-color-fill-0 p-8 text-center'>
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>Start Using DeepSeek API Today</h2>
        <p className='text-semi-color-text-2 mb-6'>Lower cost, global access, OpenAI-compatible. No configuration overhead.</p>
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
