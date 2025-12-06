/**
 * Navigation Component
 *
 * Desktop navigation with mega menu dropdowns and nav links.
 *
 * Swiss Design System Integration:
 * - Renders MegaMenuDropdown for items with megaMenu config
 * - Renders NavLink for simple navigation items
 * - Consistent spacing using 8px grid (space-x-8 = 32px = S₄)
 *
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/components/Navigation
 */

'use client';

import { memo } from 'react';
import { MegaMenuDropdown } from './MegaMenuDropdown';
import { NavLink } from './NavLink';
import type { NavigationProps } from '../types';

export const Navigation = memo<NavigationProps>(function Navigation({ isScrolled, navItems }) {
  return (
    <nav className='hidden md:flex items-center space-x-8' aria-label='Main navigation'>
      {navItems.map(item =>
        item.megaMenu ? (
          <MegaMenuDropdown key={item.id} config={item.megaMenu} isScrolled={isScrolled} />
        ) : (
          <NavLink
            key={item.id}
            href={item.href}
            isScrolled={isScrolled}
            isExternal={item.isExternal}
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';
