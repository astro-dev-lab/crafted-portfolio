import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Grid } from '@/components/ui/Grid';

export function WhyUs() {
  const advantages = [
    {
      title: 'Scalable Architecture',
      description: 'Built with microservices, containerization, and cloud-native patterns.',
      features: ['Docker & Kubernetes', 'Event-driven design', 'Auto-scaling'],
      badge: 'Infrastructure',
    },
    {
      title: 'Clean Code Practices',
      description: 'TypeScript, comprehensive testing, and maintainable codebases.',
      features: ['100% TypeScript', 'Unit & E2E tests', 'Code reviews'],
      badge: 'Quality',
    },
    {
      title: 'User-Focused Design',
      description: 'Intuitive interfaces that reduce training time and increase adoption.',
      features: ['User research', 'Iterative design', 'Accessibility'],
      badge: 'UX/UI',
    },
    {
      title: 'Security First',
      description: 'RBAC, audit trails, and compliance-ready from the ground up.',
      features: ['RBAC & permissions', 'Audit logging', 'HIPAA/SOC2 ready'],
      badge: 'Security',
    },
  ];

  return (
    <Section>
      <Container>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Why Work With Us</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            We deliver production-grade systems with the patterns and practices that enterprise
            teams need to succeed.
          </p>
        </div>
        <Grid cols={2} gap={8}>
          {advantages.map(advantage => (
            <Card key={advantage.title} className='h-full'>
              <CardHeader>
                <div className='flex items-center justify-between mb-2'>
                  <Badge variant='secondary'>{advantage.badge}</Badge>
                </div>
                <CardTitle className='text-xl'>{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 mb-4'>{advantage.description}</p>
                <ul className='space-y-2'>
                  {advantage.features.map(feature => (
                    <li key={feature} className='flex items-center text-sm text-gray-600'>
                      <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mr-2' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
