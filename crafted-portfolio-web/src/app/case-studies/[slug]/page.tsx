import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

// Import existing persona components
import SaaSPage from '@/app/personas/saas/page';
import AIPage from '@/app/personas/ai/page';
import EcommercePage from '@/app/personas/ecommerce/page';
import HealthcarePage from '@/app/personas/healthcare/page';
import LogisticsPage from '@/app/personas/logistics/page';

interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  component: React.ComponentType;
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'saas',
    title: 'SaaS Admin Console',
    category: 'B2B SaaS',
    description:
      'Internal admin dashboard with customer management, metrics, and role-based access control.',
    problem:
      "Jordan's SaaS platform lacked unified admin tools. Customer success teams jumped between Stripe, CRM, and database queries to answer simple questions about customer health and churn risk.",
    solution:
      'Built a centralized admin console with RBAC, live customer CRUD, metrics dashboard, and notification center. All customer data and actions in one secure interface.',
    tech: ['React', 'TypeScript', 'RBAC', 'Real-time Updates'],
    features: [
      'Mock Authentication',
      'Role-based Access',
      'Customer Management',
      'Metrics Dashboard',
      'Notifications',
    ],
    component: SaaSPage,
  },
  {
    slug: 'ai',
    title: 'AI Content Ops Hub',
    category: 'AI Operations',
    description:
      'AI workflow management with job queues, prompt libraries, and content generation oversight.',
    problem:
      "Riya's team had prompts scattered across docs, jobs running on ad-hoc scripts, and no visibility into what was queued, running, or failed in their content generation pipeline.",
    solution:
      'Created an AI ops dashboard with job queue management, reusable prompt library, workflow orchestration, and comprehensive search and filtering capabilities.',
    tech: ['Next.js', 'Job Queues', 'AI/ML Ops', 'Real-time Status'],
    features: [
      'Job Queue Management',
      'Prompt Library',
      'Workflow Builder',
      'Search & Filters',
      'Status Tracking',
    ],
    component: AIPage,
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Product Engine',
    category: 'E-Commerce',
    description:
      'API-first product catalog with cart logic, inventory management, and admin controls.',
    problem:
      "Marcus's e-commerce stack was fragmented: product data in spreadsheets, cart logic locked in a monolith, and every new channel requiring fresh re-platforming work.",
    solution:
      'Built an API-first commerce engine with unified product catalog, cart/wishlist state management, advanced filtering, and admin product management interface.',
    tech: ['React', 'State Management', 'E-commerce APIs', 'Admin Tools'],
    features: [
      'Product Catalog',
      'Shopping Cart',
      'Wishlist',
      'Search & Filters',
      'Admin Management',
    ],
    component: EcommercePage,
  },
  {
    slug: 'healthcare',
    title: 'Patient Portal Simulation',
    category: 'Healthcare',
    description: 'HIPAA-compliant patient portal with secure messaging and appointment management.',
    problem:
      'Dr. Farris needed digital experiences that were both secure and user-friendly. Patients frustrated with dated portals, clinicians drowning in fragmented patient views.',
    solution:
      'Developed a role-based patient portal with secure messaging, appointment scheduling, lab results access, and privacy-first notification preferences.',
    tech: ['Security', 'HIPAA Compliance', 'Healthcare Workflows', 'Role-based Auth'],
    features: [
      'Secure Messaging',
      'Patient/Provider Roles',
      'Appointments',
      'Lab Results',
      'Privacy Controls',
    ],
    component: HealthcarePage,
  },
  {
    slug: 'logistics',
    title: 'Logistics Command Center',
    category: 'Logistics',
    description:
      'Real-time operations dashboard with GPS tracking, inventory, and dispatch management.',
    problem:
      "Trevor's ops team juggled multiple dashboards, paper manifests, and radio calls. Delays discovered hours too late, no unified view of goods, drivers, and orders.",
    solution:
      'Created a unified command center with real-time GPS tracking, inventory dashboards, order pipeline management, and automated dispatch workflows.',
    tech: ['Real-time Data', 'GPS Integration', 'Operations', 'Dashboard'],
    features: [
      'Live GPS Tracking',
      'Inventory Management',
      'Order Pipeline',
      'Dispatch System',
      'Driver Management',
    ],
    component: LogisticsPage,
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CaseStudyPage({ params }: PageProps) {
  const caseStudy = caseStudies.find(cs => cs.slug === params.slug);

  if (!caseStudy) {
    notFound();
    return null; // This won't be reached in production, but helps with tests
  }

  const Component = caseStudy.component;

  return (
    <div className='pt-20'>
      <Container>
        <div className='grid lg:grid-cols-5 gap-12'>
          {/* Story Column */}
          <div className='lg:col-span-2 space-y-8'>
            <div>
              <Badge className='mb-4'>{caseStudy.category}</Badge>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>{caseStudy.title}</h1>
              <p className='text-xl text-gray-600'>{caseStudy.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>The Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>{caseStudy.problem}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Our Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 mb-4'>{caseStudy.solution}</p>
                <div className='space-y-3'>
                  <h4 className='font-medium text-gray-900'>Key Features:</h4>
                  <ul className='space-y-2'>
                    {caseStudy.features.map(feature => (
                      <li key={feature} className='flex items-center text-sm text-gray-600'>
                        <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mr-2' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {caseStudy.tech.map(tech => (
                    <Badge key={tech} variant='outline'>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className='space-y-4'>
              <Separator />
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Interested in this solution?
                </h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  Let&apos;s discuss how we can build something similar for your business.
                </p>
                <Button className='w-full'>Schedule a Consultation</Button>
              </div>
            </div>
          </div>

          {/* Demo Column */}
          <div className='lg:col-span-3'>
            <div className='sticky top-24'>
              <div className='bg-gray-50 rounded-lg p-1 mb-4'>
                <div className='bg-white rounded-md px-4 py-2 shadow-sm'>
                  <div className='flex items-center space-x-2 text-sm text-gray-600'>
                    <div className='flex space-x-1'>
                      <div className='w-2 h-2 bg-red-400 rounded-full' />
                      <div className='w-2 h-2 bg-yellow-400 rounded-full' />
                      <div className='w-2 h-2 bg-green-400 rounded-full' />
                    </div>
                    <span className='font-mono text-xs'>Interactive Demo</span>
                  </div>
                </div>
              </div>
              <div className='bg-white border rounded-lg shadow-lg overflow-hidden'>
                <div className='p-6'>
                  <Component />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function generateStaticParams() {
  return caseStudies.map(caseStudy => ({
    slug: caseStudy.slug,
  }));
}
