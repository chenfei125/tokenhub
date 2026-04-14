import React, { useEffect } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { Check } from 'lucide-react';

const SEO_LINKS = [
  { to: '/cheap-ai-api', label: 'Cheap AI API' },
  { to: '/openai-alternative', label: 'OpenAI Alternative' },
  { to: '/deepseek-api', label: 'DeepSeek API Access' },
  { to: '/ai-api-pricing', label: 'AI API Pricing Comparison' },
];

export default function MiniMaxApi() {
  useEffect(() => {
    document.title = 'MiniMax API for Chat & AI Applications | TokenHub';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Use MiniMax API for chat, content generation and AI apps at a lower cost.');
  }, []);

  return (
    <div className='max-w-3xl mx-auto px-4 py-16 space-y-12'>

      <section>
        <p className='text-sm text-semi-color-text-2 mb-2'>TokenHub · MiniMax API</p>
        <h1 className='text-4xl font-bold text-semi-color-text-0 mb-4'>
          MiniMax API Access
        </h1>
        <p className='text-lg text-semi-color-text-1'>
          Build chat, content, and AI applications using MiniMax models — globally accessible, OpenAI-compatible, and available at lower cost through TokenHub.
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

      {/* H2: What is MiniMax */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>What is MiniMax?</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-3'>
          MiniMax is a multimodal large language model platform with strong capabilities in conversational AI, creative content generation, and long-context understanding. Its models are designed for high-quality, real-world application scenarios, offering competitive performance for chat, storytelling, summarization, and multi-turn conversation.
        </p>
        <p className='text-semi-color-text-1 leading-relaxed'>
          MiniMax's MoE (Mixture of Experts) architecture allows it to handle diverse tasks efficiently. The models are well-suited to applications that require nuanced, human-like dialogue or rich content generation at scale.
        </p>
      </section>

      {/* H2: Application scenarios */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>MiniMax API Application Scenarios</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          MiniMax models excel in use cases that benefit from their conversational depth and creative fluency:
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[
            { title: 'Conversational chatbots', desc: 'High-quality multi-turn conversation for customer service, virtual assistants, and companion apps.' },
            { title: 'Content generation', desc: 'Marketing copy, blog posts, creative writing, and product descriptions at scale.' },
            { title: 'Long-context summarization', desc: 'Summarize lengthy documents, meeting transcripts, and reports accurately.' },
            { title: 'Customer support automation', desc: 'Route, classify, and respond to user queries with natural language understanding.' },
            { title: 'Educational applications', desc: 'Interactive tutoring, Q&A, and explanatory content for learning platforms.' },
            { title: 'Workflow automation', desc: 'Integrate into no-code or low-code workflows for intelligent document and data processing.' },
          ].map((item, i) => (
            <div key={i} className='p-4 rounded-lg border border-semi-color-border bg-semi-color-bg-1'>
              <p className='font-medium text-semi-color-text-0 text-sm mb-1'>{item.title}</p>
              <p className='text-xs text-semi-color-text-2'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* H2: Cost advantages */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>Cost Advantages of Using MiniMax via TokenHub</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          Accessing MiniMax through TokenHub provides several cost and operational advantages over going directly through first-party providers:
        </p>
        <ul className='space-y-3'>
          {[
            { title: 'Lower per-token pricing', desc: 'TokenHub passes through access at reduced rates compared to many first-party developer plans.' },
            { title: 'No regional friction', desc: 'Access MiniMax from anywhere in the world without worrying about availability limitations.' },
            { title: 'Unified billing', desc: 'Manage DeepSeek, MiniMax, and other models under one account and one invoice.' },
            { title: 'Consistent API format', desc: 'Use the same OpenAI-compatible SDK calls — just swap the model name.' },
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

      {/* H2: How to use */}
      <section>
        <h2 className='text-2xl font-bold text-semi-color-text-0 mb-4'>How to Use MiniMax API via TokenHub</h2>
        <p className='text-semi-color-text-1 leading-relaxed mb-4'>
          TokenHub's OpenAI-compatible interface means integration is fast. Here's how to get started:
        </p>
        <ol className='space-y-3 text-semi-color-text-1'>
          {[
            'Create an account and generate an API key from the TokenHub console.',
            'Set your base URL to your TokenHub endpoint.',
            'Specify a MiniMax model in your API request (e.g., MiniMax-Text-01 or abab6.5s-chat).',
            'All standard OpenAI SDK parameters — messages, temperature, max_tokens — work as expected.',
            'Monitor usage and cost from the dashboard in real time.',
          ].map((item, i) => (
            <li key={i} className='flex gap-3'>
              <span className='font-bold text-semi-color-primary flex-shrink-0'>{i + 1}.</span>
              <span className='text-sm'>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Final CTA */}
      <section className='rounded-xl border border-semi-color-border bg-semi-color-fill-0 p-8 text-center'>
        <h2 className='text-xl font-bold text-semi-color-text-0 mb-2'>Start Building with MiniMax API</h2>
        <p className='text-semi-color-text-2 mb-6'>Lower cost. Global access. OpenAI-compatible. Get your key and start building.</p>
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
