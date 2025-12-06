/**
 * CaseStudiesDropdown Component
 *
 * Mega menu dropdown for case studies navigation.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, ANIMATION-SPECIFIC-GUIDE.md §2
 *
 * @module header/components/CaseStudiesDropdown
 */

'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINK_CLASSES } from '../constants';
import type { CaseStudiesDropdownProps } from '../types';

export const CaseStudiesDropdown = memo<CaseStudiesDropdownProps>(function CaseStudiesDropdown({
  isScrolled,
  caseStudies,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = useCallback(() => setIsOpen(true), []);
  const handleMouseLeave = useCallback(() => setIsOpen(false), []);

  const triggerClasses = cn(
    'flex items-center space-x-1',
    NAV_LINK_CLASSES.base,
    isScrolled ? NAV_LINK_CLASSES.scrolled : NAV_LINK_CLASSES.transparent
  );

  return (
    <div className='relative group' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={triggerClasses}
        aria-expanded={isOpen}
        aria-haspopup='menu'
        aria-label='Case Studies menu'
      >
        <span>Case Studies</span>
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Mega Menu */}
      <div
        className={cn(
          'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96',
          'bg-white rounded-lg shadow-xl border',
          'opacity-0 invisible transition-all duration-200',
          'group-hover:opacity-100 group-hover:visible',
          isOpen && 'opacity-100 visible'
        )}
        role='menu'
        aria-label='Case studies'
      >
        <div className='p-6'>
          <h3 className='font-semibold text-gray-900 mb-4'>Interactive Demos</h3>
          <div className='grid grid-cols-1 gap-3'>
            {caseStudies.map(study => (
              <Link
                key={study.id}
                href={study.href}
                className='block p-3 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
                role='menuitem'
              >
                <div className='font-medium text-gray-900'>{study.title}</div>
                <div className='text-sm text-gray-600'>{study.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

CaseStudiesDropdown.displayName = 'CaseStudiesDropdown';
