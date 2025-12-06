/**
 * Header Constants
 *
 * Static data and configuration for header components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/constants
 */

import type { CaseStudy, NavItem } from '../types';

// =============================================================================
// SWISS DIMENSIONS (8px grid: Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const HEADER_DIMENSIONS = {
  /** Header height: S₈ = 8 × 8 = 64px */
  HEIGHT: 64,
  /** Scroll threshold for background change */
  SCROLL_THRESHOLD: 50,
  /** Mega menu width: S₄₈ = 384px */
  MEGA_MENU_WIDTH: 384,
  /** Mega menu padding: S₃ = 24px */
  MEGA_MENU_PADDING: 24,
} as const;

// =============================================================================
// NAVIGATION DATA
// =============================================================================

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: 'saas',
    title: 'SaaS Admin Console',
    href: '/case-studies/saas',
    description: 'Customer management & analytics',
  },
  {
    id: 'ai',
    title: 'AI Content Ops Hub',
    href: '/case-studies/ai',
    description: 'Job queues & prompt management',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Engine',
    href: '/case-studies/ecommerce',
    description: 'Product catalog & cart logic',
  },
  {
    id: 'healthcare',
    title: 'Patient Portal',
    href: '/case-studies/healthcare',
    description: 'HIPAA-compliant messaging',
  },
  {
    id: 'logistics',
    title: 'Logistics Command',
    href: '/case-studies/logistics',
    description: 'Real-time tracking & dispatch',
  },
  {
    id: 'fintech',
    title: 'FinTech Trading Hub',
    href: '/case-studies/fintech',
    description: 'Trading & compliance tools',
  },
] as const;

export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 'about',
    label: 'About',
    href: '/about',
  },
  {
    id: 'shop',
    label: 'Shop Demo',
    href: '/shop',
  },
] as const;

// =============================================================================
// CSS CLASSES
// =============================================================================

export const HEADER_CLASSES = {
  base: 'fixed top-0 w-full z-50 transition-all duration-300',
  scrolled: 'bg-white/95 backdrop-blur-sm shadow-lg',
  transparent: 'bg-transparent',
} as const;

export const NAV_LINK_CLASSES = {
  base: 'font-medium transition-colors',
  scrolled: 'text-gray-700 hover:text-gray-900',
  transparent: 'text-gray-200 hover:text-white',
} as const;

export const LOGO_CLASSES = {
  base: 'font-bold text-xl transition-colors',
  scrolled: 'text-gray-900',
  transparent: 'text-white',
} as const;
