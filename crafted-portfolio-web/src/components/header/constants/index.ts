/**
 * Header Constants
 *
 * Static data and configuration for header components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, TIMING-SPECIFIC-GUIDE.md §2
 *
 * @module header/constants
 */

import type { CaseStudy, NavItem } from '../types';

// =============================================================================
// SWISS SPACING (Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const SWISS_HEADER_SPACING = {
  /** S₁ = 8px - Icon gaps */
  XS: 8,
  /** S₂ = 16px - Standard padding */
  SM: 16,
  /** S₃ = 24px - Menu item padding */
  MD: 24,
  /** S₄ = 32px - Nav gaps */
  LG: 32,
} as const;

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
  /** Menu item padding: S₂ = 16px */
  MENU_ITEM_PADDING: 16,
  /** Menu gap: S₂ = 16px */
  MENU_GAP: 16,
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
// CSS CLASSES (Swiss Timing: TIMING-SPECIFIC-GUIDE.md §2)
// Reference: duration-300 = SWISS_TIMING.normal (300ms)
// =============================================================================

export const HEADER_CLASSES = {
  /** Base: transition uses normal timing (300ms) with Swiss easing */
  base: 'fixed top-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
  scrolled: 'bg-white/95 backdrop-blur-sm shadow-lg',
  transparent: 'bg-transparent',
} as const;

export const NAV_LINK_CLASSES = {
  /** Base: fast timing (200ms) for hover states */
  base: 'font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
  scrolled: 'text-gray-700 hover:text-gray-900',
  transparent: 'text-gray-200 hover:text-white',
} as const;

export const LOGO_CLASSES = {
  /** Base: fast timing (200ms) for hover states with Swiss easing */
  base: 'font-bold text-xl transition-colors duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
  scrolled: 'text-gray-900',
  transparent: 'text-white',
} as const;

// =============================================================================
// MEGA MENU CLASSES (Swiss Spacing: 8px grid)
// gap-4 = 16px (S₂), p-6 = 24px (S₃), p-4 = 16px (S₂), mb-4 = 16px (S₂)
// =============================================================================

export const MEGA_MENU_CLASSES = {
  /** Container with Swiss timing (200ms = fast) */
  container:
    'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-lg shadow-xl border opacity-0 invisible transition-all duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-100 group-hover:visible',
  /** Inner padding: S₃ = 24px */
  inner: 'p-6',
  /** Title with S₂ margin */
  title: 'font-semibold text-gray-900 mb-4',
  /** Grid gap: S₂ = 16px */
  grid: 'grid grid-cols-1 gap-4',
  /** Item padding: S₂ = 16px (p-4) */
  item: 'block p-4 rounded-md hover:bg-gray-50 transition-colors duration-100 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none focus:ring-2 focus:ring-blue-500',
} as const;
