'use client';
import { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';

export default function LoginPage() {
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' as 'admin' | 'support' | 'patient' | 'provider',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    signIn(formData.email || 'demo@example.com', formData.role);
    setIsLoading(false);
    
    // Redirect based on role
    if (formData.role === 'admin' || formData.role === 'support') {
      window.location.href = '/case-studies/saas';
    } else {
      window.location.href = '/case-studies/healthcare';
    }
  };

  const demoAccounts = [
    { email: 'admin@company.com', role: 'admin', description: 'Full access to all systems' },
    { email: 'support@company.com', role: 'support', description: 'Customer support access' },
    { email: 'patient@hospital.com', role: 'patient', description: 'Patient portal access' },
    { email: 'doctor@hospital.com', role: 'provider', description: 'Healthcare provider access' },
  ];

  const fillDemo = (email: string, role: string) => {
    setFormData({ ...formData, email, role: role as any });
  };

  if (user) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Already Signed In</CardTitle>
          <CardDescription>
            You're currently signed in as {user.email} ({user.role})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <a href="/case-studies/saas">View SaaS Demo</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="/">Back to Homepage</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Sign In to Demo</CardTitle>
          <CardDescription>
            Access interactive case studies with role-based features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-950"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              >
                <option value="admin">Admin</option>
                <option value="support">Support</option>
                <option value="patient">Patient</option>
                <option value="provider">Provider</option>
              </select>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Demo Accounts</CardTitle>
          <CardDescription>
            Click any account below to auto-fill the form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <div
                key={account.email}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => fillDemo(account.email, account.role)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{account.email}</span>
                    <Badge variant="outline" className="text-xs">{account.role}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{account.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}