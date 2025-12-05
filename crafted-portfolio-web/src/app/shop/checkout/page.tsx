'use client';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Separator } from '@/components/ui/Separator';

interface CheckoutStep {
  id: number;
  title: string;
  completed: boolean;
}

interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    phone: '(555) 123-4567',
    address: '123 Business St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    // Payment
    cardNumber: '4242 4242 4242 4242',
    expiryDate: '12/26',
    cvv: '123',
    nameOnCard: 'John Doe',
    billingAddress: 'same', // 'same' or 'different'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const steps: CheckoutStep[] = [
    { id: 1, title: 'Shipping Information', completed: currentStep > 1 },
    { id: 2, title: 'Payment Details', completed: currentStep > 2 },
    { id: 3, title: 'Review & Complete', completed: orderComplete },
  ];

  const orderSummary: OrderSummary = {
    subtotal: 798.00,
    tax: 63.84,
    shipping: 0,
    discount: 79.80,
    total: 782.04,
  };

  const cartItems = [
    { id: 1, name: 'SaaS Admin Dashboard Template', price: 299, quantity: 1, image: '🏢' },
    { id: 2, name: 'AI Workflow Builder', price: 499, quantity: 1, image: '🤖' },
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setOrderComplete(true);
    setIsProcessing(false);
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  if (orderComplete) {
    return (
      <div className="pt-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <div className="text-6xl mb-6">✅</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been successfully processed.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Order Number</p>
                  <p className="text-lg font-mono font-bold">#CP-{Date.now().toString().slice(-6)}</p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <a href="/">Return to Homepage</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/shop">Continue Shopping</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed ? 'bg-green-500 text-white' :
                      currentStep === step.id ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {step.completed ? '✓' : step.id}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      step.completed || currentStep === step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                        <Input
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">ZIP Code</label>
                        <Input
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</label>
                      <Input
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</label>
                        <Input
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                        <Input
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Name on Card</label>
                      <Input
                        value={formData.nameOnCard}
                        onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        🔒 This is a demo checkout. No real payment will be processed.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p>{formData.email} • {formData.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm">
                        <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                        <p>{formData.nameOnCard}</p>
                      </div>
                    </div>
                    <Button
                      onClick={processOrder}
                      disabled={isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? 'Processing Order...' : `Complete Order - $${orderSummary.total.toFixed(2)}`}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 3 && (
                  <Button onClick={handleNextStep}>
                    Continue
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">${item.price}</span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderSummary.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount (DEMO10)</span>
                      <span>-${orderSummary.discount.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}