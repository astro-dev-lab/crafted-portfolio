'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Grid } from '@/components/ui/Grid';

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Lead Architect',
      specialty: 'System Design & Scalability',
      icon: '👨‍💻',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Frontend Lead',
      specialty: 'React & Design Systems',
      icon: '👩‍🎨',
    },
    {
      name: 'James Rodriguez',
      role: 'Backend Lead',
      specialty: 'APIs & Data Architecture',
      icon: '👨‍🔧',
    },
    {
      name: 'Emily Watson',
      role: 'DevOps Lead',
      specialty: 'Infrastructure & CI/CD',
      icon: '👩‍🔬',
    },
  ];

  const values = [
    {
      title: 'Enterprise Focus',
      description:
        'We specialize in building internal tools and platforms that enterprises depend on daily. Our solutions are designed for scale, security, and long-term maintainability.',
      icon: '🏢',
    },
    {
      title: 'Production Ready',
      description:
        'Every system we build is designed for production from day one. We follow best practices for testing, monitoring, and deployment.',
      icon: '⚡',
    },
    {
      title: 'Domain Expertise',
      description:
        'Deep understanding of SaaS, healthcare, fintech, logistics, and AI operation workflows. We speak your industry language.',
      icon: '🎯',
    },
    {
      title: 'Collaborative Process',
      description:
        'We work closely with your team throughout the development process, ensuring alignment and knowledge transfer.',
      icon: '🤝',
    },
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Cache' },
    { name: 'Docker', category: 'Infrastructure' },
    { name: 'Kubernetes', category: 'Infrastructure' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Vercel', category: 'Cloud' },
    { name: 'GraphQL', category: 'API' },
    { name: 'REST', category: 'API' },
  ];

  return (
    <div className='pt-20'>
      {/* Hero Section */}
      <Section className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24'>
        <Container>
          <div className='max-w-4xl mx-auto text-center'>
            <Badge className='mb-6 bg-blue-600/20 text-blue-400 border-blue-500/30'>About Us</Badge>
            <h1 className='text-5xl lg:text-6xl font-bold mb-6'>
              We Build the Platforms That
              <span className='block text-blue-400'>Power Enterprises</span>
            </h1>
            <p className='text-xl text-gray-300 mb-8'>
              A specialized development team focused on creating enterprise-grade internal tools,
              admin consoles, and operational platforms that scale with your business.
            </p>
          </div>
        </Container>
      </Section>

      {/* Our Story */}
      <Section className='bg-white py-20'>
        <Container>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Our Story</h2>
            <div className='prose prose-lg mx-auto text-gray-600'>
              <p className='mb-6'>
                Founded by a team of engineers who spent years building internal tools at Fortune
                500 companies, we understand the unique challenges of enterprise software
                development. We&apos;ve seen firsthand how the right internal platform can transform
                an organization&apos;s efficiency and decision-making capabilities.
              </p>
              <p className='mb-6'>
                Today, we bring that expertise to companies of all sizes. Whether you need a SaaS
                admin console, an AI operations hub, a healthcare patient portal, or a logistics
                command center, we have the domain knowledge and technical skills to deliver.
              </p>
              <p>
                Our approach combines deep technical expertise with a genuine understanding of
                business operations. We don&apos;t just write code – we partner with you to build
                systems that solve real problems and deliver measurable value.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className='bg-gray-50 py-20'>
        <Container>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>Our Values</h2>
          <Grid cols={2} gap={8}>
            {values.map(value => (
              <Card key={value.title} className='border-0 shadow-lg'>
                <CardContent className='p-8'>
                  <div className='text-4xl mb-4'>{value.icon}</div>
                  <h3 className='text-xl font-semibold mb-3 text-gray-900'>{value.title}</h3>
                  <p className='text-gray-600 leading-relaxed'>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team */}
      <Section className='bg-white py-20'>
        <Container>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>Meet the Team</h2>
          <Grid cols={4} gap={6}>
            {team.map(member => (
              <Card
                key={member.name}
                className='text-center border-0 shadow-lg hover:shadow-xl transition-shadow'
              >
                <CardContent className='p-6'>
                  <div className='text-5xl mb-4'>{member.icon}</div>
                  <h3 className='text-lg font-semibold text-gray-900'>{member.name}</h3>
                  <p className='text-blue-600 font-medium text-sm mb-2'>{member.role}</p>
                  <p className='text-gray-500 text-sm'>{member.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Technology Stack */}
      <Section className='bg-gray-50 py-20'>
        <Container>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>
            Our Technology Stack
          </h2>
          <div className='flex flex-wrap justify-center gap-3 max-w-4xl mx-auto'>
            {technologies.map(tech => (
              <Badge key={tech.name} variant='secondary' className='px-4 py-2 text-sm font-medium'>
                {tech.name}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className='bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white'>
        <Container>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-6'>Ready to Work Together?</h2>
            <p className='text-xl text-blue-100 mb-8'>
              Let&apos;s discuss your project and see how we can help you build production-ready
              platforms that scale with your business.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/#contact'>
                <Button size='lg' className='bg-white text-blue-600 hover:bg-gray-100 px-8'>
                  Get In Touch
                </Button>
              </Link>
              <Link href='/case-studies/saas'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-white/10 px-8'
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
