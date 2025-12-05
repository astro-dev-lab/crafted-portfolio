import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Grid } from '@/components/ui/Grid';

export function AboutUs() {
  const values = [
    {
      title: 'Enterprise Focus',
      description: 'We specialize in building internal tools and platforms that enterprises depend on daily.',
      icon: '🏢',
    },
    {
      title: 'Production Ready',
      description: 'Every system we build is designed for scale, security, and maintainability from day one.',
      icon: '⚡',
    },
    {
      title: 'Domain Expertise',
      description: 'Deep understanding of SaaS, healthcare, fintech, logistics, and AI operation workflows.',
      icon: '🎯',
    },
  ];

  return (
    <Section className="bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a specialized development team that builds the internal platforms and tools 
            that power modern enterprises. From admin consoles to AI operation hubs.
          </p>
        </div>
        <Grid cols={3} gap={8}>
          {values.map((value) => (
            <Card key={value.title} className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}