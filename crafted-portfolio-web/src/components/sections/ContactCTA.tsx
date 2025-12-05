'use client';
import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const projectTypes = [
    { name: 'SaaS Platform', icon: '🏢', description: 'Admin dashboards, user management, analytics' },
    { name: 'AI Operations', icon: '🤖', description: 'ML pipelines, automation, job orchestration' },
    { name: 'E-Commerce', icon: '🛒', description: 'Product catalogs, checkout flows, inventory' },
    { name: 'Healthcare', icon: '🏥', description: 'Patient portals, HIPAA compliance, workflows' },
    { name: 'FinTech', icon: '💹', description: 'Trading platforms, compliance, reporting' },
    { name: 'Custom Solution', icon: '⚡', description: 'Tailored enterprise applications' },
  ];

  return (
    <Section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Build Your
              <span className="block text-blue-400">Enterprise Platform?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your project and see how we can help you build 
              production-ready systems that scale with your business.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-300">Free 30-minute consultation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-300">Architecture review and recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-gray-300">Project timeline and scope estimation</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {projectTypes.map((type) => (
                <div key={type.name} className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Start Your Project</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    <Input
                      placeholder="Project type"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Tell us about your project, timeline, and specific needs..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message & Schedule Consultation
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    By submitting, you agree to our consultation process. No spam, ever.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}