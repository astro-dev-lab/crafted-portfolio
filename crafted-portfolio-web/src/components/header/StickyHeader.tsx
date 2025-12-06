/**
 * StickyHeader Component
 *
 * Main orchestrator component that composes all header sub-components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * This file is intentionally minimal as all logic is delegated
 * to specialized hooks and components.
 *
 * @module header/StickyHeader
 */

'use client';

import { memo } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { useScrollState } from './hooks/useScrollState';
import { Logo, Navigation, ActionButtons } from './components';
import { CASE_STUDIES, NAV_ITEMS, HEADER_CLASSES } from './constants';
import type { StickyHeaderProps } from './types';

export const StickyHeader = memo<StickyHeaderProps>(function StickyHeader({ className }) {
  const { isScrolled } = useScrollState();

  return (
    <header
      className={cn(
        HEADER_CLASSES.base,
        isScrolled ? HEADER_CLASSES.scrolled : HEADER_CLASSES.transparent,
        className
      )}
      role='banner'
    >
      <Container>
        <div className='flex items-center justify-between py-4'>
          <Logo isScrolled={isScrolled} />

          <Navigation isScrolled={isScrolled} caseStudies={CASE_STUDIES} navItems={NAV_ITEMS} />

          <ActionButtons isScrolled={isScrolled} />
        </div>
      </Container>
    </header>
  );
});

StickyHeader.displayName = 'StickyHeader';
