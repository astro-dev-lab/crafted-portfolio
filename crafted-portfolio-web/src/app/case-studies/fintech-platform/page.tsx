'use client';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Separator } from '@/components/ui/Separator';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED';
}

interface Portfolio {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  positions: Array<{
    symbol: string;
    shares: number;
    avgCost: number;
    currentPrice: number;
    unrealizedPnL: number;
  }>;
}

export default function FinTechPlatformPage() {
  const [selectedTab, setSelectedTab] = useState<'trading' | 'portfolio' | 'compliance'>('trading');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [quantity, setQuantity] = useState('100');
  const [limitPrice, setLimitPrice] = useState('150.00');
  const [isLive, setIsLive] = useState(true);

  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.15, changePercent: 1.45 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -15.20, changePercent: -0.55 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 310.45, change: 5.30, changePercent: 1.74 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.67, change: 8.45, changePercent: 3.56 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 420.90, change: -3.25, changePercent: -0.77 },
    { symbol: 'META', name: 'Meta Platforms', price: 315.20, change: 12.80, changePercent: 4.24 },
  ]);

  const [portfolio] = useState<Portfolio>({
    totalValue: 250750.35,
    dayChange: 3250.45,
    dayChangePercent: 1.31,
    cashBalance: 25000.00,
    positions: [
      { symbol: 'AAPL', shares: 500, avgCost: 145.20, currentPrice: 150.25, unrealizedPnL: 2525.00 },
      { symbol: 'MSFT', shares: 200, avgCost: 305.50, currentPrice: 310.45, unrealizedPnL: 990.00 },
      { symbol: 'GOOGL', shares: 50, avgCost: 2800.00, currentPrice: 2750.80, unrealizedPnL: -2460.00 },
      { symbol: 'TSLA', shares: 150, avgCost: 240.00, currentPrice: 245.67, unrealizedPnL: 850.50 },
    ]
  });

  const [trades] = useState<Trade[]>([
    { 
      id: 'T001', 
      symbol: 'AAPL', 
      type: 'BUY', 
      quantity: 100, 
      price: 150.25, 
      timestamp: new Date(Date.now() - 1000 * 60 * 15), 
      status: 'EXECUTED' 
    },
    { 
      id: 'T002', 
      symbol: 'MSFT', 
      type: 'SELL', 
      quantity: 50, 
      price: 310.45, 
      timestamp: new Date(Date.now() - 1000 * 60 * 45), 
      status: 'EXECUTED' 
    },
    { 
      id: 'T003', 
      symbol: 'TSLA', 
      type: 'BUY', 
      quantity: 25, 
      price: 245.00, 
      timestamp: new Date(Date.now() - 1000 * 60 * 30), 
      status: 'PENDING' 
    },
  ]);

  // Simulate real-time price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const priceChange = (Math.random() - 0.5) * 2; // Random change between -1 and +1
          const newPrice = Math.max(stock.price + priceChange, 1);
          const change = newPrice - (stock.price - stock.change);
          const changePercent = (change / (newPrice - change)) * 100;
          
          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const selectedStockData = stocks.find(s => s.symbol === selectedStock);
  const orderValue = selectedStockData ? (parseFloat(quantity) || 0) * selectedStockData.price : 0;

  const complianceChecks = [
    { name: 'KYC Verification', status: 'PASSED', score: 98 },
    { name: 'AML Screening', status: 'PASSED', score: 95 },
    { name: 'Risk Assessment', status: 'REVIEW', score: 87 },
    { name: 'Position Limits', status: 'PASSED', score: 100 },
    { name: 'Regulatory Compliance', status: 'PASSED', score: 92 },
  ];

  return (
    <div className="pt-20 pb-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">FinTech Trading Platform</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Professional-grade trading interface with real-time data and compliance tools
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {isLive ? 'Live Market Data' : 'Market Closed'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                >
                  {isLive ? 'Pause Feed' : 'Resume Feed'}
                </Button>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'TypeScript', 'WebSocket', 'D3.js', 'Redux Toolkit', 'Node.js', 'PostgreSQL', 'Redis'].map(tech => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'trading', label: 'Live Trading', icon: '📈' },
                { id: 'portfolio', label: 'Portfolio', icon: '💼' },
                { id: 'compliance', label: 'Compliance', icon: '🛡️' }
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
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Trading Interface */}
          {selectedTab === 'trading' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Market Watch */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Market Watch</CardTitle>
                    <Badge variant={isLive ? 'default' : 'secondary'}>
                      {isLive ? 'LIVE' : 'DELAYED'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stocks.map(stock => (
                        <div
                          key={stock.symbol}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                            selectedStock === stock.symbol ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedStock(stock.symbol)}
                        >
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-gray-600">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${stock.price.toFixed(2)}</div>
                            <div className={`text-sm ${
                              stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Trades */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Trades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trades.map(trade => (
                        <div key={trade.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={trade.type === 'BUY' ? 'default' : 'destructive'}
                              className="min-w-0"
                            >
                              {trade.type}
                            </Badge>
                            <div>
                              <div className="font-medium">{trade.symbol}</div>
                              <div className="text-sm text-gray-600">{trade.quantity} shares</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${trade.price.toFixed(2)}</div>
                            <div className="text-sm text-gray-600">
                              {trade.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          <Badge 
                            variant={trade.status === 'EXECUTED' ? 'secondary' : trade.status === 'PENDING' ? 'outline' : 'destructive'}
                          >
                            {trade.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Entry */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Place Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stock Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Symbol</label>
                      <select
                        value={selectedStock}
                        onChange={(e) => setSelectedStock(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {stocks.map(stock => (
                          <option key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - ${stock.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Action</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={tradeAction === 'buy' ? 'default' : 'outline'}
                          onClick={() => setTradeAction('buy')}
                          className="w-full"
                        >
                          Buy
                        </Button>
                        <Button
                          variant={tradeAction === 'sell' ? 'destructive' : 'outline'}
                          onClick={() => setTradeAction('sell')}
                          className="w-full"
                        >
                          Sell
                        </Button>
                      </div>
                    </div>

                    {/* Order Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Order Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={orderType === 'market' ? 'default' : 'outline'}
                          onClick={() => setOrderType('market')}
                          size="sm"
                        >
                          Market
                        </Button>
                        <Button
                          variant={orderType === 'limit' ? 'default' : 'outline'}
                          onClick={() => setOrderType('limit')}
                          size="sm"
                        >
                          Limit
                        </Button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="100"
                      />
                    </div>

                    {/* Limit Price */}
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Limit Price</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={limitPrice}
                          onChange={(e) => setLimitPrice(e.target.value)}
                          placeholder="150.00"
                        />
                      </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span>Estimated Total:</span>
                          <span className="font-medium">
                            ${orderValue.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Commission:</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${tradeAction === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                      disabled={!quantity || (orderType === 'limit' && !limitPrice)}
                    >
                      {tradeAction === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                    </Button>

                    <div className="text-xs text-gray-500 text-center">
                      🔒 Demo mode - No real trades executed
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Portfolio View */}
          {selectedTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Portfolio Summary */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-gray-900">
                      ${portfolio.totalValue.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Total Portfolio Value</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className={`text-2xl font-bold ${
                      portfolio.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {portfolio.dayChange >= 0 ? '+' : ''}${portfolio.dayChange.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Day P&L</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className={`text-2xl font-bold ${
                      portfolio.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {portfolio.dayChangePercent >= 0 ? '+' : ''}{portfolio.dayChangePercent.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-600">Day Change %</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-gray-900">
                      ${portfolio.cashBalance.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Cash Balance</p>
                  </CardContent>
                </Card>
              </div>

              {/* Positions */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.positions.map(position => (
                      <div key={position.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium text-lg">{position.symbol}</div>
                          <div className="text-sm text-gray-600">
                            {position.shares} shares @ ${position.avgCost.toFixed(2)} avg
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${(position.shares * position.currentPrice).toLocaleString()}
                          </div>
                          <div className={`text-sm ${
                            position.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {position.unrealizedPnL >= 0 ? '+' : ''}${position.unrealizedPnL.toFixed(2)} P&L
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Compliance Dashboard */}
          {selectedTab === 'compliance' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complianceChecks.map(check => (
                  <Card key={check.name}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{check.name}</CardTitle>
                        <Badge 
                          variant={check.status === 'PASSED' ? 'secondary' : 
                                 check.status === 'REVIEW' ? 'outline' : 'destructive'}
                        >
                          {check.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Compliance Score</span>
                          <span className="text-sm font-medium">{check.score}/100</span>
                        </div>
                        <Progress value={check.score} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Risk Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Position Limits</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Single Position:</span>
                          <span className="text-green-600">15% / 25% max</span>
                        </div>
                        <Progress value={60} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Sector Concentration:</span>
                          <span className="text-green-600">35% / 50% max</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Daily Limits</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Trading Volume:</span>
                          <span className="text-green-600">$45K / $100K max</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span>Loss Limit:</span>
                          <span className="text-green-600">$1.2K / $5K max</span>
                        </div>
                        <Progress value={24} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Regulatory Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">FINRA Compliance</span>
                          <Badge variant="secondary">✓</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">SEC Reporting</span>
                          <Badge variant="secondary">✓</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Risk Assessment</span>
                          <Badge variant="outline">Under Review</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Trading Platform Features</h3>
            <p className="text-blue-800 text-sm mb-3">
              This FinTech platform demonstrates advanced trading capabilities with real-time data simulation, 
              comprehensive portfolio management, and enterprise-grade compliance tools.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Real-time Features:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Live market data feeds</li>
                  <li>Real-time P&L calculations</li>
                  <li>Instant order execution</li>
                </ul>
              </div>
              <div>
                <strong>Risk Management:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Position limit monitoring</li>
                  <li>Automated compliance checks</li>
                  <li>Risk assessment scoring</li>
                </ul>
              </div>
              <div>
                <strong>Professional Tools:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Advanced order types</li>
                  <li>Portfolio analytics</li>
                  <li>Regulatory reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t">
            <Button asChild variant="outline">
              <a href="/case-studies/logistics" className="flex items-center">
                ← Previous: Logistics Command Center
              </a>
            </Button>
            <Button asChild>
              <a href="/">Return to Portfolio</a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}\n