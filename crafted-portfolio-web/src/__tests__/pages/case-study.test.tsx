import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import CaseStudyPage from '@/app/case-studies/[slug]/page';

// Mock the notFound function
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock the persona components
jest.mock('@/app/personas/saas/page', () => {
  return function MockSaaSPage() {
    return <div data-testid='saas-demo'>SaaS Demo Component</div>;
  };
});

jest.mock('@/app/personas/ai/page', () => {
  return function MockAIPage() {
    return <div data-testid='ai-demo'>AI Demo Component</div>;
  };
});

jest.mock('@/app/personas/ecommerce/page', () => {
  return function MockEcommercePage() {
    return <div data-testid='ecommerce-demo'>Ecommerce Demo Component</div>;
  };
});

jest.mock('@/app/personas/healthcare/page', () => {
  return function MockHealthcarePage() {
    return <div data-testid='healthcare-demo'>Healthcare Demo Component</div>;
  };
});

jest.mock('@/app/personas/logistics/page', () => {
  return function MockLogisticsPage() {
    return <div data-testid='logistics-demo'>Logistics Demo Component</div>;
  };
});

// Mock AuthProvider
jest.mock('@/app/components/AuthProvider', () => {
  return {
    useAuth: () => ({
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    }),
  };
});

describe('Case Study Page', () => {
  it('renders SaaS case study correctly', () => {
    const params = { slug: 'saas' };
    render(<CaseStudyPage params={params} />);

    expect(screen.getByText('SaaS Admin Console')).toBeInTheDocument();
    expect(screen.getByText('B2B SaaS')).toBeInTheDocument();
    expect(screen.getByTestId('saas-demo')).toBeInTheDocument();
    expect(screen.getByText('The Problem')).toBeInTheDocument();
    expect(screen.getByText('Our Solution')).toBeInTheDocument();
  });

  it('renders AI case study correctly', () => {
    const params = { slug: 'ai' };
    render(<CaseStudyPage params={params} />);

    expect(screen.getByText('AI Content Ops Hub')).toBeInTheDocument();
    expect(screen.getByText('AI Operations')).toBeInTheDocument();
    expect(screen.getByTestId('ai-demo')).toBeInTheDocument();
  });

  it('calls notFound for invalid slug', () => {
    const params = { slug: 'invalid-slug' };
    render(<CaseStudyPage params={params} />);

    expect(notFound).toHaveBeenCalled();
  });

  it('displays technology stack for case study', () => {
    const params = { slug: 'saas' };
    render(<CaseStudyPage params={params} />);

    expect(screen.getByText('Technology Stack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays consultation CTA', () => {
    const params = { slug: 'saas' };
    render(<CaseStudyPage params={params} />);

    expect(screen.getByText('Interested in this solution?')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Consultation')).toBeInTheDocument();
  });
});
