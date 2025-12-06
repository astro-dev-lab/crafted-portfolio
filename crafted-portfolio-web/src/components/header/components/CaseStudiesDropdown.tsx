/**
 * CaseStudiesDropdown Component
 *
 * Mega menu dropdown for case studies navigation.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, ANIMATION-SPECIFIC-GUIDE.md §2
 *
 * Swiss Compliance:
 * - Timing: 200ms (SWISS_TIMING.fast) for dropdown reveal
 * - Easing: easeOut [0.22, 0.61, 0.36, 1] for entrance
 * - Spacing: 8px grid (p-6=24px, gap-4=16px, p-4=16px)
 *
 * @module header/components/CaseStudiesDropdown
 */

'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINK_CLASSES, MEGA_MENU_CLASSES } from '../constants';
import type { CaseStudiesDropdownProps } from '../types';

export const CaseStudiesDropdown = memo<CaseStudiesDropdownProps>(function CaseStudiesDropdown({
  isScrolled,
  caseStudies,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = useCallback(() => setIsOpen(true), []);
  const handleMouseLeave = useCallback(() => setIsOpen(false), []);

  const triggerClasses = cn(
    'flex items-center gap-1',
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
          className={cn(
            'w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
            isOpen && 'rotate-180'
          )}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {/* Mega Menu - Swiss easeOut for entrance */}
      <div
        className={cn(MEGA_MENU_CLASSES.container, isOpen && 'opacity-100 visible')}
        role='menu'
        aria-label='Case studies'
      >
        <div className={MEGA_MENU_CLASSES.inner}>
          <h3 className={MEGA_MENU_CLASSES.title}>Interactive Demos</h3>
          <div className={MEGA_MENU_CLASSES.grid}>
            {caseStudies.map(study => (
              <Link key={study.id} href={study.href} className={MEGA_MENU_CLASSES.item} role='menuitem'>
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
