'use client';
import { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function RegisterPage() {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as 'admin' | 'support' | 'patient' | 'provider',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.firstName.trim()) newErrors.push('First name is required');
    if (!formData.lastName.trim()) newErrors.push('Last name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!formData.company.trim()) newErrors.push('Company is required');
    if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Auto sign in after registration
    signIn(formData.email, formData.role);
    setIsLoading(false);
    
    // Redirect to appropriate demo
    window.location.href = '/case-studies/saas';
  };

  const roleDescriptions = {
    admin: 'Full system access and management capabilities',
    support: 'Customer support and limited admin access',
    patient: 'Healthcare patient portal access',
    provider: 'Healthcare provider and clinical access',
  };

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Create Demo Account</CardTitle>
          <CardDescription>
            Sign up to access all interactive case studies and demos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <Input
                placeholder="Your Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
              <p className="text-xs text-gray-600 mt-1">
                {roleDescriptions[formData.role]}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>
            
            {errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <ul className="text-sm text-red-600 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Demo Account'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          This is a demo environment. No real accounts are created.
        </p>
      </div>
    </>
  );
}