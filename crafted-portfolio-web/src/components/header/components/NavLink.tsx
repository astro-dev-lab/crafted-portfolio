/**
 * NavLink Component
 *
 * Reusable navigation link with scroll-aware styling.
 * Reference: MASTER-STYLE-GUIDE.md §2.2
 *
 * @module header/components/NavLink
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINK_CLASSES } from '../constants';
import type { NavLinkProps } from '../types';

export const NavLink = memo<NavLinkProps>(function NavLink({
  href,
  children,
  isScrolled,
  isExternal = false,
  className,
}) {
  const linkClasses = cn(
    NAV_LINK_CLASSES.base,
    isScrolled ? NAV_LINK_CLASSES.scrolled : NAV_LINK_CLASSES.transparent,
    className
  );

  if (isExternal) {
    return (
      <a href={href} className={linkClasses} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';
