'use client';
import { useState } from 'react';

type Job = { id: number; status: 'queued' | 'running' | 'done'; promptId?: number };
type Prompt = { id: number; name: string; text: string };

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, status: 'queued' },
    { id: 2, status: 'running' },
    { id: 3, status: 'done' },
  ]);
  const [prompts, setPrompts] = useState<Prompt[]>([
    { id: 1, name: 'Blog Intro', text: 'Write an intro about...' },
    { id: 2, name: 'Product Summary', text: 'Summarize key features...' },
  ]);
  const [filter, setFilter] = useState<string>('All');
  const [q, setQ] = useState<string>('');
  const visible = jobs.filter(j => (filter === 'All' ? true : j.status === filter.toLowerCase()));

  const enqueueJob = (promptId?: number) =>
    setJobs(prev => [...prev, { id: Date.now(), status: 'queued', promptId }]);
  const advanceJob = (id: number) =>
    setJobs(prev =>
      prev.map(j =>
        j.id === id ? { ...j, status: j.status === 'queued' ? 'running' : 'done' } : j
      )
    );
  const addPrompt = (name: string, text: string) =>
    setPrompts(prev => [...prev, { id: Date.now(), name, text }]);
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>AI Content Ops Hub</h1>
      <p className='text-sm text-gray-600'>Mock AI jobs queue, prompts, workflows, search.</p>

      <section className='grid md:grid-cols-3 gap-4'>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Jobs Queue</h2>
          <div className='text-sm mb-2'>
            Queued: {jobs.filter(j => j.status === 'queued').length} • Running:{' '}
            {jobs.filter(j => j.status === 'running').length} • Done:{' '}
            {jobs.filter(j => j.status === 'done').length}
          </div>
          <button className='border px-2 py-1 rounded' onClick={() => enqueueJob()}>
            Enqueue Job
          </button>
          <ul className='text-sm list-disc pl-5 mt-2'>
            {visible.map(j => (
              <li key={j.id} className='flex items-center justify-between'>
                <span>
                  Job #{j.id} — {j.status}
                </span>
                {j.status !== 'done' && (
                  <button className='text-blue-600' onClick={() => advanceJob(j.id)}>
                    Advance
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Prompt Management</h2>
          <ul className='text-sm list-disc pl-5'>
            {prompts
              .filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()))
              .map(p => (
                <li key={p.id} className='flex items-center justify-between'>
                  <span>{p.name}</span>
                  <div className='flex gap-2'>
                    <button className='border px-2 py-1 rounded' onClick={() => enqueueJob(p.id)}>
                      Run
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <div className='mt-3 flex gap-2'>
            <input className='border px-2 py-1' placeholder='New prompt name' id='pname' />
            <input className='border px-2 py-1' placeholder='Text' id='ptext' />
            <button
              className='bg-black text-white px-3 py-1 rounded'
              onClick={() => {
                const n =
                  (document.getElementById('pname') as HTMLInputElement)?.value || 'Untitled';
                const t = (document.getElementById('ptext') as HTMLInputElement)?.value || '';
                addPrompt(n, t);
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Workflow Builder</h2>
          <div className='text-sm'>Compose steps visually (mock).</div>
        </div>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Search & Filters</h2>
        <div className='flex gap-2'>
          <input
            className='border px-2 py-1'
            placeholder='Search prompts'
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select
            className='border px-2 py-1'
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Queued</option>
            <option>Running</option>
            <option>Done</option>
          </select>
        </div>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Get AI Integration Consultation</h2>
        <form action='https://formspree.io/f/ai' method='POST' className='space-y-2'>
          <input
            name='email'
            required
            className='border px-2 py-1 w-full'
            placeholder='your@email'
          />
          <textarea
            name='message'
            className='border px-2 py-1 w-full'
            placeholder='What workflows to automate?'
          />
          <button className='bg-blue-600 text-white px-3 py-1 rounded'>Submit</button>
        </form>
      </section>
    </div>
  );
}
