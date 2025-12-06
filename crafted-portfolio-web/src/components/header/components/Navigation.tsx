/**
 * Navigation Component
 *
 * Desktop navigation with case studies dropdown and nav links.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/components/Navigation
 */

'use client';

import { memo } from 'react';
import { CaseStudiesDropdown } from './CaseStudiesDropdown';
import { NavLink } from './NavLink';
import type { NavigationProps } from '../types';

export const Navigation = memo<NavigationProps>(function Navigation({
  isScrolled,
  caseStudies,
  navItems,
}) {
  return (
    <nav className='hidden md:flex items-center space-x-8' aria-label='Main navigation'>
      <CaseStudiesDropdown isScrolled={isScrolled} caseStudies={caseStudies} />

      {navItems.map(item => (
        <NavLink
          key={item.id}
          href={item.href}
          isScrolled={isScrolled}
          isExternal={item.isExternal}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
});

Navigation.displayName = 'Navigation';
