import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function TechStack() {
  const techCategories = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: '⚛️', description: 'Component-based UI' },
        { name: 'Next.js', icon: '▲', description: 'Full-stack framework' },
        { name: 'TypeScript', icon: '📘', description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS' },
      ],
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', icon: '🟢', description: 'Server runtime' },
        { name: 'PostgreSQL', icon: '🐘', description: 'Relational database' },
        { name: 'Redis', icon: '🔴', description: 'In-memory store' },
        { name: 'GraphQL', icon: '📊', description: 'Query language' },
      ],
    },
    {
      category: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', icon: '☁️', description: 'Cloud infrastructure' },
        { name: 'Docker', icon: '🐳', description: 'Containerization' },
        { name: 'Kubernetes', icon: '⚙️', description: 'Orchestration' },
        { name: 'GitHub Actions', icon: '🚀', description: 'CI/CD pipeline' },
      ],
    },
    {
      category: 'Specialized',
      technologies: [
        { name: 'Stripe', icon: '💳', description: 'Payment processing' },
        { name: 'Auth0', icon: '🔐', description: 'Authentication' },
        { name: 'SendGrid', icon: '📧', description: 'Email delivery' },
        { name: 'Sentry', icon: '🐛', description: 'Error monitoring' },
      ],
    },
  ];

  return (
    <Section>
      <Container>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Our Technology Stack</h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            We use proven, enterprise-grade technologies to build scalable, maintainable systems
            that grow with your business.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {techCategories.map(category => (
            <div key={category.category}>
              <h3 className='text-xl font-semibold text-gray-900 mb-6 text-center'>
                {category.category}
              </h3>
              <div className='space-y-4'>
                {category.technologies.map(tech => (
                  <Card key={tech.name} className='hover:shadow-md transition-shadow'>
                    <CardContent className='p-4'>
                      <div className='flex items-center space-x-3'>
                        <div className='text-2xl'>{tech.icon}</div>
                        <div>
                          <div className='font-medium text-gray-900'>{tech.name}</div>
                          <div className='text-sm text-gray-600'>{tech.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <div className='bg-blue-50 rounded-lg p-8'>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Architecture Philosophy</h3>
            <div className='grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto'>
              <div>
                <Badge className='mb-2'>Scalability</Badge>
                <p className='text-gray-600 text-sm'>
                  Microservices, event-driven architecture, and horizontal scaling patterns.
                </p>
              </div>
              <div>
                <Badge className='mb-2'>Security</Badge>
                <p className='text-gray-600 text-sm'>
                  Zero-trust networking, RBAC, audit logging, and compliance-ready design.
                </p>
              </div>
              <div>
                <Badge className='mb-2'>Maintainability</Badge>
                <p className='text-gray-600 text-sm'>
                  Clean code, comprehensive testing, documentation, and monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
