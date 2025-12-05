'use client';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Grid } from '@/components/ui/Grid';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

export default function ShopPage() {
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const products: Product[] = [
    {
      id: 1,
      name: 'SaaS Admin Dashboard Template',
      price: 299,
      description: 'Complete admin dashboard with user management, analytics, and RBAC.',
      category: 'Templates',
      image: '🏢',
      inStock: true,
    },
    {
      id: 2,
      name: 'AI Workflow Builder',
      price: 499,
      description: 'Visual workflow builder for AI operations and job management.',
      category: 'Tools',
      image: '🤖',
      inStock: true,
    },
    {
      id: 3,
      name: 'E-commerce API Suite',
      price: 399,
      description: 'Complete e-commerce backend with cart, inventory, and payment processing.',
      category: 'APIs',
      image: '🛒',
      inStock: true,
    },
    {
      id: 4,
      name: 'Healthcare Compliance Kit',
      price: 799,
      description: 'HIPAA-compliant components and workflows for healthcare applications.',
      category: 'Compliance',
      image: '🏥',
      inStock: false,
    },
    {
      id: 5,
      name: 'Logistics Tracking System',
      price: 599,
      description: 'Real-time tracking, inventory management, and dispatch optimization.',
      category: 'Tools',
      image: '🚚',
      inStock: true,
    },
    {
      id: 6,
      name: 'FinTech Trading Platform',
      price: 999,
      description: 'Professional trading interface with compliance and risk management.',
      category: 'Platform',
      image: '💹',
      inStock: true,
    },
  ];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch =
      search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className='pt-20'>
      <Container>
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900'>Shop Demo</h1>
              <p className='text-lg text-gray-600 mt-2'>
                Explore our collection of enterprise development tools and templates
              </p>
            </div>
            <Button asChild>
              <a href='/shop/cart' className='flex items-center space-x-2'>
                <span>🛒</span>
                <span>Cart ({cartItemCount})</span>
              </a>
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <Input
                placeholder='Search products...'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className='px-4 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-950'
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Grid cols={3} gap={6}>
          {filteredProducts.map(product => (
            <Card key={product.id} className='h-full flex flex-col'>
              <CardHeader>
                <div className='flex items-center justify-between mb-3'>
                  <div className='text-4xl'>{product.image}</div>
                  <Badge variant={product.inStock ? 'default' : 'destructive'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                <CardTitle className='text-lg'>{product.name}</CardTitle>
                <Badge variant='outline' className='w-fit'>
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent className='flex-1 flex flex-col'>
                <p className='text-gray-600 text-sm mb-4 flex-1'>{product.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold text-gray-900'>${product.price}</span>
                  <Button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className='ml-4'
                  >
                    {product.inStock ? 'Add to Cart' : 'Unavailable'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg'>No products found matching your criteria.</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => {
                setSearch('');
                setFilter('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {cartItemCount > 0 && (
          <div className='fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg'>
            <div className='text-sm font-medium mb-1'>{cartItemCount} items in cart</div>
            <div className='text-lg font-bold'>${cartTotal}</div>
            <Button asChild size='sm' className='mt-2 bg-white text-blue-600 hover:bg-gray-100'>
              <a href='/shop/cart'>View Cart</a>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
