/**
 * Logo Component
 *
 * Brand logo with scroll-aware styling.
 * Reference: MASTER-STYLE-GUIDE.md §2.2
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
