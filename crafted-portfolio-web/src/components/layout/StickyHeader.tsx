'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const caseStudies = [
    {
      title: 'SaaS Admin Console',
      href: '/case-studies/saas',
      description: 'Customer management & analytics',
    },
    {
      title: 'AI Content Ops Hub',
      href: '/case-studies/ai',
      description: 'Job queues & prompt management',
    },
    {
      title: 'E-Commerce Engine',
      href: '/case-studies/ecommerce',
      description: 'Product catalog & cart logic',
    },
    {
      title: 'Patient Portal',
      href: '/case-studies/healthcare',
      description: 'HIPAA-compliant messaging',
    },
    {
      title: 'Logistics Command',
      href: '/case-studies/logistics',
      description: 'Real-time tracking & dispatch',
    },
    {
      title: 'FinTech Trading Hub',
      href: '/case-studies/fintech',
      description: 'Trading & compliance tools',
    },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      )}
    >
      <Container>
        <nav className='flex items-center justify-between py-4'>
          <Link
            href='/'
            className={cn('font-bold text-xl', isScrolled ? 'text-gray-900' : 'text-white')}
          >
            Crafted Portfolio
          </Link>

          <div className='hidden md:flex items-center space-x-8'>
            <div className='relative group'>
              <button
                className={cn(
                  'flex items-center space-x-1 font-medium transition-colors',
                  isScrolled
                    ? 'text-gray-700 hover:text-gray-900'
                    : 'text-gray-200 hover:text-white'
                )}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                <span>Case Studies</span>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {/* Mega Menu */}
              <div
                className={cn(
                  'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-lg shadow-xl border opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible',
                  isMegaMenuOpen && 'opacity-100 visible'
                )}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <div className='p-6'>
                  <h3 className='font-semibold text-gray-900 mb-4'>Interactive Demos</h3>
                  <div className='grid grid-cols-1 gap-3'>
                    {caseStudies.map(study => (
                      <Link
                        key={study.href}
                        href={study.href}
                        className='block p-3 rounded-md hover:bg-gray-50 transition-colors'
                      >
                        <div className='font-medium text-gray-900'>{study.title}</div>
                        <div className='text-sm text-gray-600'>{study.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href='/about'
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-200 hover:text-white'
              )}
            >
              About
            </Link>
            <Link
              href='/shop'
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-200 hover:text-white'
              )}
            >
              Shop Demo
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
            <Link
              href='/login'
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-gray-200 hover:text-white'
              )}
            >
              Sign In
            </Link>
            <Link href='/#contact'>
              <Button
                size='sm'
                className={cn(
                  'transition-colors',
                  isScrolled
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                )}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
