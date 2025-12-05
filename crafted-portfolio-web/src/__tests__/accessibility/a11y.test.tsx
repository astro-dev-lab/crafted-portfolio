import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '@/app/page';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock components for testing
jest.mock('@/components/sections/Hero', () => ({
  Hero: () => (
    <section>
      <h1>We Build Enterprise-Grade Web Platforms</h1>
      <button>View Our Work</button>
    </section>
  ),
}));

jest.mock('@/components/sections/AboutUs', () => ({
  AboutUs: () => (
    <section>
      <h2>Who We Are</h2>
      <p>About us content</p>
    </section>
  ),
}));

jest.mock('@/components/sections/WhyUs', () => ({
  WhyUs: () => (
    <section>
      <h2>Why Work With Us</h2>
      <p>Why us content</p>
    </section>
  ),
}));

jest.mock('@/components/sections/CaseStudies', () => ({
  CaseStudies: () => (
    <section>
      <h2>Case Studies</h2>
      <div>Case studies content</div>
    </section>
  ),
}));

jest.mock('@/components/sections/TechStack', () => ({
  TechStack: () => (
    <section>
      <h2>Tech Stack</h2>
      <div>Tech stack content</div>
    </section>
  ),
}));

jest.mock('@/components/sections/ContactCTA', () => ({
  ContactCTA: () => (
    <section>
      <h2>Contact Us</h2>
      <form>
        <label htmlFor='contact-email'>Email</label>
        <input id='contact-email' type='email' />
        <button type='submit'>Submit</button>
      </form>
    </section>
  ),
}));

describe('Accessibility Tests', () => {
  it('homepage should not have accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button component should be accessible', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Card component should be accessible', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is card content</p>
        </CardContent>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Input component should be accessible', async () => {
    const { container } = render(
      <div>
        <label htmlFor='test-input'>Test Input</label>
        <Input id='test-input' placeholder='Enter text' />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('form elements should have proper labels', () => {
    const { container } = render(
      <form>
        <label htmlFor='email'>Email Address</label>
        <Input id='email' type='email' required />
        <Button type='submit'>Submit</Button>
      </form>
    );

    const emailInput = container.querySelector('#email');
    expect(emailInput).toHaveAttribute('aria-required', 'true');
  });
});
