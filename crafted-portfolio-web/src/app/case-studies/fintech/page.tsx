'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function FinTechPage() {
  const [selectedTab, setSelectedTab] = useState<'trading' | 'portfolio' | 'compliance'>('trading');

  return (
    <div className='pt-20 pb-12'>
      <Container>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>FinTech Trading Hub</h1>
            <p className='text-lg text-gray-600 mb-6'>
              Professional trading interface with real-time market data, compliance tools, and audit
              trails.
            </p>
            <div className='flex flex-wrap gap-2 mb-6'>
              {['React', 'TypeScript', 'WebSocket', 'D3.js', 'Redux', 'Node.js'].map(tech => (
                <Badge key={tech} variant='secondary'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className='border-b mb-6'>
            <nav className='flex space-x-8'>
              {[
                { id: 'trading', label: 'Live Trading', icon: '📈' },
                { id: 'portfolio', label: 'Portfolio', icon: '💼' },
                { id: 'compliance', label: 'Compliance', icon: '🛡️' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className='mr-2'>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className='grid lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Market Watch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {[
                      {
                        symbol: 'AAPL',
                        name: 'Apple Inc.',
                        price: 150.25,
                        change: 2.15,
                        percent: 1.45,
                      },
                      {
                        symbol: 'GOOGL',
                        name: 'Alphabet Inc.',
                        price: 2750.8,
                        change: -15.2,
                        percent: -0.55,
                      },
                      {
                        symbol: 'MSFT',
                        name: 'Microsoft Corp.',
                        price: 310.45,
                        change: 5.3,
                        percent: 1.74,
                      },
                      {
                        symbol: 'TSLA',
                        name: 'Tesla Inc.',
                        price: 245.67,
                        change: 8.45,
                        percent: 3.56,
                      },
                    ].map(stock => (
                      <div
                        key={stock.symbol}
                        className='flex items-center justify-between p-3 border rounded-lg'
                      >
                        <div>
                          <div className='font-medium'>{stock.symbol}</div>
                          <div className='text-sm text-gray-600'>{stock.name}</div>
                        </div>
                        <div className='text-right'>
                          <div className='font-medium'>${stock.price.toFixed(2)}</div>
                          <div
                            className={`text-sm ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (
                            {stock.percent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Place Order</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700 mb-2 block'>Symbol</label>
                    <select className='w-full p-2 border border-gray-300 rounded-md'>
                      <option>AAPL - $150.25</option>
                      <option>GOOGL - $2750.80</option>
                      <option>MSFT - $310.45</option>
                    </select>
                  </div>

                  <div className='grid grid-cols-2 gap-2'>
                    <Button variant='default' className='bg-green-600 hover:bg-green-700'>
                      Buy
                    </Button>
                    <Button variant='destructive'>Sell</Button>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-4'>
                    <div className='text-sm space-y-2'>
                      <div className='flex justify-between'>
                        <span>Estimated Total:</span>
                        <span className='font-medium'>$15,025.00</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Commission:</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                  </div>

                  <Button className='w-full'>Place Order</Button>

                  <div className='text-xs text-gray-500 text-center'>
                    🔒 Demo mode - No real trades executed
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg'>
            <h3 className='font-semibold text-blue-900 mb-2'>FinTech Platform Features</h3>
            <p className='text-blue-800 text-sm mb-3'>
              This demo showcases professional trading capabilities with real-time data simulation,
              portfolio management, and enterprise-grade compliance tools.
            </p>
            <div className='grid md:grid-cols-3 gap-4 text-sm'>
              <div>
                <strong>Real-time Features:</strong>
                <ul className='list-disc list-inside mt-1 space-y-1'>
                  <li>Live market data feeds</li>
                  <li>Real-time P&L calculations</li>
                  <li>Instant order execution</li>
                </ul>
              </div>
              <div>
                <strong>Risk Management:</strong>
                <ul className='list-disc list-inside mt-1 space-y-1'>
                  <li>Position limit monitoring</li>
                  <li>Automated compliance checks</li>
                  <li>Risk assessment scoring</li>
                </ul>
              </div>
              <div>
                <strong>Professional Tools:</strong>
                <ul className='list-disc list-inside mt-1 space-y-1'>
                  <li>Advanced order types</li>
                  <li>Portfolio analytics</li>
                  <li>Regulatory reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex justify-between items-center mt-8 pt-8 border-t'>
            <Button asChild variant='outline'>
              <Link href='/case-studies/logistics'>← Previous: Logistics Command Center</Link>
            </Button>
            <Button asChild>
              <Link href='/'>Return to Portfolio</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
