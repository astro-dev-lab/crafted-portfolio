import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Grid } from '@/components/ui/Grid';

export function CaseStudies() {
  const caseStudies = [
    {
      title: 'SaaS Admin Console',
      description: 'Mock login with RBAC, customers CRUD, metrics dashboard, and notifications center.',
      href: '/case-studies/saas',
      image: '🏢',
      tech: ['React', 'TypeScript', 'RBAC'],
      category: 'B2B SaaS',
    },
    {
      title: 'AI Content Ops Hub',
      description: 'Job queues, prompt management, workflow automation, and search filters.',
      href: '/case-studies/ai',
      image: '🤖',
      tech: ['Next.js', 'AI/ML', 'Queues'],
      category: 'AI Operations',
    },
    {
      title: 'E-Commerce Engine',
      description: 'Product catalog, shopping cart, wishlist, filters, and admin management.',
      href: '/case-studies/ecommerce',
      image: '🛒',
      tech: ['React', 'State Management', 'APIs'],
      category: 'E-Commerce',
    },
    {
      title: 'Patient Portal',
      description: 'HIPAA-compliant auth, secure messaging, appointments, and lab results.',
      href: '/case-studies/healthcare',
      image: '🏥',
      tech: ['Security', 'HIPAA', 'Healthcare'],
      category: 'Healthcare',
    },
    {
      title: 'Logistics Command Center',
      description: 'Real-time tracking, inventory management, dispatch, and order pipeline.',
      href: '/case-studies/logistics',
      image: '🚚',
      tech: ['Real-time', 'Maps', 'Operations'],
      category: 'Logistics',
    },
    {
      title: 'FinTech Trading Hub',
      description: 'Trading interface, compliance tools, real-time charts, and audit trails.',
      href: '/case-studies/fintech',
      image: '💹',
      tech: ['FinTech', 'Trading', 'Compliance'],
      category: 'Financial',
    },
  ];

  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore fully functional demos of enterprise platforms we've built. 
            Each case study includes real interactivity and working features.
          </p>
        </div>
        <Grid cols={3} gap={8}>
          {caseStudies.map((study) => (
            <Card key={study.href} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{study.image}</div>
                  <Badge variant="secondary">{study.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full group-hover:bg-blue-600 transition-colors">
                  <a href={study.href}>Try Interactive Demo</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Each demo includes working authentication, real-time interactions, and production-ready patterns.
          </p>
          <Button size="lg" variant="outline">
            View All Case Studies
          </Button>
        </div>
      </Container>
    </Section>
  );
}