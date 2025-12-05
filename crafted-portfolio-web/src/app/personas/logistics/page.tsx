'use client';
import { useState } from 'react';

type Pos = { id: string; lat: number; lng: number };

export default function Page() {
  const [positions, setPositions] = useState<Pos[]>([
    { id: 'van-12', lat: 37.7749, lng: -122.4194 },
    { id: 'truck-7', lat: 34.0522, lng: -118.2437 },
  ]);
  const [inventory] = useState<{ sku: string; qty: number }[]>([
    { sku: 'SKU-001', qty: 124 },
    { sku: 'SKU-002', qty: 87 },
  ]);
  const [orders, setOrders] = useState<string[]>(['Received', 'Picking', 'In-transit']);
  const [drivers] = useState<string[]>(['Driver A — Van 12', 'Driver B — Truck 7']);

  const dispatch = () => setOrders(prev => [...prev, 'Delivered']);
  const move = () =>
    setPositions(prev =>
      prev.map(p => ({
        ...p,
        lat: p.lat + (Math.random() - 0.5) * 0.01,
        lng: p.lng + (Math.random() - 0.5) * 0.01,
      }))
    );
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Logistics Command Center</h1>
      <p className='text-sm text-gray-600'>
        Live map mock, inventory, order flow, drivers, dispatch.
      </p>

      <section className='grid md:grid-cols-3 gap-4'>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Live Map (mock)</h2>
          <div className='text-sm'>Static JSON simulates GPS positions.</div>
          <ul className='text-sm list-disc pl-5 mt-2'>
            {positions.map(p => (
              <li key={p.id}>
                {p.id}: {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
              </li>
            ))}
          </ul>
          <button className='mt-2 border px-2 py-1 rounded' onClick={move}>
            Simulate movement
          </button>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Inventory Dashboard</h2>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            {inventory.map(i => (
              <div key={i.sku} className='bg-gray-100 p-3 rounded'>
                {i.sku} — {i.qty}
              </div>
            ))}
          </div>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Order Flow</h2>
          <div className='text-sm'>{orders.join(' → ')}</div>
        </div>
      </section>

      <section className='grid md:grid-cols-2 gap-4'>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Driver Roster</h2>
          <ul className='text-sm list-disc pl-5'>
            {drivers.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className='border rounded p-4'>
          <h2 className='font-medium mb-2'>Dispatch Simulator</h2>
          <button className='bg-black text-white px-3 py-1 rounded' onClick={dispatch}>
            Dispatch (mock)
          </button>
        </div>
      </section>

      <section className='border rounded p-4'>
        <h2 className='font-medium mb-2'>Optimize Your Operations With Us</h2>
        <form action='https://formspree.io/f/logistics' method='POST' className='space-y-2'>
          <input
            name='email'
            required
            className='border px-2 py-1 w-full'
            placeholder='your@email'
          />
          <textarea
            name='message'
            className='border px-2 py-1 w-full'
            placeholder='Data flows & tracking needs'
          />
          <button className='bg-blue-600 text-white px-3 py-1 rounded'>Submit</button>
        </form>
      </section>
    </div>
  );
}
