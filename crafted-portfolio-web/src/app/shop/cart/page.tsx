'use client';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'SaaS Admin Dashboard Template',
      price: 299,
      quantity: 1,
      image: '🏢',
      category: 'Templates',
    },
    {
      id: 2,
      name: 'AI Workflow Builder',
      price: 499,
      quantity: 2,
      image: '🤖',
      category: 'Tools',
    },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 500 ? 0 : 29; // Free shipping over $500
  const total = subtotal + tax + shipping - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'DEMO10') {
      setDiscount(subtotal * 0.1); // 10% discount
      setIsPromoApplied(true);
    } else if (promoCode.toUpperCase() === 'FIRSTTIME') {
      setDiscount(50); // $50 off
      setIsPromoApplied(true);
    } else {
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-20">
        <Container>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Button asChild>
              <a href="/shop">Continue Shopping</a>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s) in your cart</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <Badge variant="outline" className="mt-1">{item.category}</Badge>
                      <div className="text-lg font-bold text-gray-900 mt-2">${item.price}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {/* Promo Code */}
                <div className="space-y-3">
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Promo Code
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    {isPromoApplied && discount > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ Promo code applied successfully!
                      </p>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      Try: DEMO10 (10% off) or FIRSTTIME ($50 off)
                    </div>
                  </div>
                </div>
                
                <Button asChild className="w-full" size="lg">
                  <a href="/shop/checkout">Proceed to Checkout</a>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <a href="/shop">Continue Shopping</a>
                </Button>
                
                {shipping > 0 && (
                  <div className="text-xs text-gray-600 text-center">
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}