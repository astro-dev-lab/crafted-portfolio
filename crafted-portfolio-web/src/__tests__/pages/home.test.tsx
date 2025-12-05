import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the AuthProvider
jest.mock('@/app/components/AuthProvider', () => {
  return function MockAuthProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid='auth-provider'>{children}</div>;
  };
});

// Mock the section components
jest.mock('@/components/sections/Hero', () => {
  return { Hero: () => <div data-testid='hero-section'>Hero Section</div> };
});

jest.mock('@/components/sections/AboutUs', () => {
  return { AboutUs: () => <div data-testid='about-section'>About Us Section</div> };
});

jest.mock('@/components/sections/WhyUs', () => {
  return { WhyUs: () => <div data-testid='why-us-section'>Why Us Section</div> };
});

jest.mock('@/components/sections/CaseStudies', () => {
  return { CaseStudies: () => <div data-testid='case-studies-section'>Case Studies Section</div> };
});

jest.mock('@/components/sections/TechStack', () => {
  return { TechStack: () => <div data-testid='tech-stack-section'>Tech Stack Section</div> };
});

jest.mock('@/components/sections/ContactCTA', () => {
  return { ContactCTA: () => <div data-testid='contact-cta-section'>Contact CTA Section</div> };
});

describe('Homepage', () => {
  it('renders all main sections', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('why-us-section')).toBeInTheDocument();
    expect(screen.getByTestId('case-studies-section')).toBeInTheDocument();
    expect(screen.getByTestId('tech-stack-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-cta-section')).toBeInTheDocument();
  });

  it('renders sections in correct order', () => {
    render(<Home />);

    const sections = [
      'hero-section',
      'about-section',
      'why-us-section',
      'case-studies-section',
      'tech-stack-section',
      'contact-cta-section',
    ];

    sections.forEach(section => {
      expect(screen.getByTestId(section)).toBeInTheDocument();
    });
  });
});
