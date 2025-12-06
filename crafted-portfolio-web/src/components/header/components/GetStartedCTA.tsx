/**
 * GetStartedCTA Component
 *
 * Primary call-to-action button with scroll-aware styling.
 *
 * Swiss Compliance:
 * - Timing: 100ms (SWISS_TIMING.micro) for hover states
 * - Easing: default [0.25, 0.46, 0.45, 0.94]
 * - Reference: MASTER-STYLE-GUIDE.md §4.3.1, TIMING-SPECIFIC-GUIDE.md §2
 *
 * @module header/components/GetStartedCTA
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { GetStartedCTAProps } from '../types';

export const GetStartedCTA = memo<GetStartedCTAProps>(function GetStartedCTA({ isScrolled }) {
  return (
    <Link href='/#contact'>
      <Button
        size='sm'
        className={cn(
          // Swiss timing: micro (100ms) for hover feedback
          'transition-colors duration-100 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
          isScrolled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white text-gray-900 hover:bg-gray-100'
        )}
      >
        Get Started
      </Button>
    </Link>
  );
});

GetStartedCTA.displayName = 'GetStartedCTA';
