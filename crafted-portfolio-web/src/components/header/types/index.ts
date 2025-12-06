/**
 * Header Types
 *
 * TypeScript interfaces for all header components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/types
 */

import type { ReactNode } from 'react';

// =============================================================================
// DATA TYPES
// =============================================================================

/** Case study item for mega menu */
export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly description: string;
}

/** Navigation item configuration */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface LogoProps {
  readonly isScrolled: boolean;
}

export interface NavLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly isScrolled: boolean;
  readonly isExternal?: boolean;
  readonly className?: string;
}

export interface CaseStudiesDropdownProps {
  readonly isScrolled: boolean;
  readonly caseStudies: readonly CaseStudy[];
}

export interface SignInButtonProps {
  readonly isScrolled: boolean;
}

export interface GetStartedCTAProps {
  readonly isScrolled: boolean;
}

export interface NavigationProps {
  readonly isScrolled: boolean;
  readonly caseStudies: readonly CaseStudy[];
  readonly navItems: readonly NavItem[];
}

export interface ActionButtonsProps {
  readonly isScrolled: boolean;
}

export interface StickyHeaderProps {
  /** Optional className for custom styling */
  readonly className?: string;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseScrollStateReturn {
  readonly isScrolled: boolean;
}

export interface UseDropdownStateReturn {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}
