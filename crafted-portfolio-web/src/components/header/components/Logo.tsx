/**
 * Logo Component
 *
 * Brand logo with scroll-aware styling.
 *
 * Swiss Compliance:
 * - Timing: 200ms (SWISS_TIMING.fast) for color transitions
 * - Easing: default [0.25, 0.46, 0.45, 0.94]
 * - Typography: text-xl = 20px (T₁ in Perfect Fourth scale)
 * - Reference: MASTER-STYLE-GUIDE.md §2.2, TIMING-SPECIFIC-GUIDE.md §2
 *
 * @module header/components/Logo
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LOGO_CLASSES } from '../constants';
import type { LogoProps } from '../types';

export const Logo = memo<LogoProps>(function Logo({ isScrolled }) {
  return (
    <Link
      href='/'
      className={cn(
        LOGO_CLASSES.base,
        isScrolled ? LOGO_CLASSES.scrolled : LOGO_CLASSES.transparent
      )}
      aria-label='Crafted Portfolio - Home'
    >
      Crafted Portfolio
    </Link>
  );
});

Logo.displayName = 'Logo';
