'use client';
import { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';

type Message = { id: number; from: string; text: string };

export default function Page() {
  const { user, signIn, signOut } = useAuth();
  const [role, setRole] = useState('patient');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'provider', text: 'Please review your latest lab results.' },
    { id: 2, from: 'patient', text: 'Thanks, will do.' },
  ]);
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (!user) return;
    if (!text) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from: user.role === 'provider' ? 'provider' : 'patient', text },
    ]);
    setText('');
  };
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Patient Portal Simulation</h1>
      <p className='text-sm text-gray-600'>
        Mock auth roles, messaging, appointments, lab results, notifications.
      </p>

      <section className='grid md:grid-cols-3 gap-4'>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Mock Auth</h2>
          {user ? (
            <div className='text-sm flex items-center gap-2'>
              <span>
                Signed in as {user.email} ({user.role})
              </span>
              <button onClick={signOut} className='border px-2 py-1 rounded'>
                Sign Out
              </button>
            </div>
          ) : (
            <div className='space-y-2'>
              <input
                className='border px-2 py-1 w-full'
                placeholder='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <select
                className='border px-2 py-1 w-full'
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value='patient'>patient</option>
                <option value='provider'>provider</option>
              </select>
              <button
                className='bg-black text-white px-3 py-1 rounded'
                onClick={() =>
                  signIn(email || 'patient@example.com', role as 'patient' | 'provider')
                }
              >
                Sign In (mock)
              </button>
            </div>
          )}
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Secure Messaging</h2>
          <ul className='text-sm list-disc pl-5'>
            {messages.map(m => (
              <li key={m.id}>
                <span className='font-medium'>{m.from}:</span> {m.text}
              </li>
            ))}
          </ul>
          <div className='mt-3 flex gap-2'>
            <input
              className='border px-2 py-1 w-full'
              placeholder='Type a message'
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button className='bg-black text-white px-3 py-1 rounded' onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Appointments</h2>
          <ul className='text-sm list-disc pl-5'>
            <li>Dec 12 — Telehealth check‑in</li>
            <li>Jan 3 — Follow‑up visit</li>
          </ul>
        </div>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Lab Results</h2>
        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-gray-100 p-3 rounded'>CBC — Normal</div>
          <div className='bg-gray-100 p-3 rounded'>A1C — 5.4%</div>
        </div>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Notification Preferences</h2>
        <label className='block text-sm'>
          <input type='checkbox' className='mr-2' /> Email alerts
        </label>
        <label className='block text-sm'>
          <input type='checkbox' className='mr-2' /> SMS reminders
        </label>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Book a Healthcare Systems Consultation</h2>
        <form action='https://formspree.io/f/health' method='POST' className='space-y-2'>
          <input
            name='email'
            required
            className='border px-2 py-1 w-full'
            placeholder='your@email'
          />
          <textarea
            name='message'
            className='border px-2 py-1 w-full'
            placeholder='HIPAA needs & workflows'
          />
          <button className='bg-blue-600 text-white px-3 py-1 rounded'>Submit</button>
        </form>
      </section>
    </div>
  );
}
