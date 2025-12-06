/**
 * Header Constants
 *
 * Static data and configuration for header components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, TIMING-SPECIFIC-GUIDE.md §2
 *
 * Mathematical Foundation (Swiss Design):
 *
 * SPACING EQUATION: Sₙ = 8 × n
 *   - S₁ = 8px (icon gaps)
 *   - S₂ = 16px (standard padding)
 *   - S₃ = 24px (menu padding)
 *   - S₄ = 32px (nav gaps)
 *   - S₄₈ = 384px (menu width)
 *
 * TIMING EQUATION: Fibonacci-derived progression
 *   - T₁ = 100ms (micro)
 *   - T₂ = 200ms (fast)
 *   - T₃ = 300ms (normal)
 *   - T₄ = 500ms (slow)
 *
 * EASING EQUATION: Cubic-bezier physics
 *   - Default: cubic-bezier(0.25, 0.46, 0.45, 0.94)
 *   - EaseOut: cubic-bezier(0.22, 0.61, 0.36, 1)
 *
 * STAGGER EQUATION: D_total = D_single + (n-1) × stagger_delay
 *   - Normal stagger: 80ms between items
 *
 * @module header/constants
 */

import type { CaseStudy, NavItem, MegaMenuConfig } from '../types';

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
  /** S₆ = 48px - Section spacing */
  XL: 48,
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
  /** Mega menu width standard: S₄₈ = 384px */
  MEGA_MENU_WIDTH: 384,
  /** Mega menu width wide: S₆₄ = 512px */
  MEGA_MENU_WIDTH_WIDE: 512,
  /** Mega menu padding: S₃ = 24px */
  MEGA_MENU_PADDING: 24,
  /** Menu item padding: S₂ = 16px */
  MENU_ITEM_PADDING: 16,
  /** Menu gap: S₂ = 16px */
  MENU_GAP: 16,
  /** Icon size: S₃ = 24px */
  ICON_SIZE: 24,
  /** Icon container: S₅ = 40px */
  ICON_CONTAINER: 40,
} as const;

// =============================================================================
// SWISS TIMING (Fibonacci-derived)
// Reference: TIMING-SPECIFIC-GUIDE.md §2
// =============================================================================

export const MENU_TIMING = {
  /** Hover intent delay to prevent accidental triggers */
  HOVER_INTENT: 150,
  /** Menu open/close animation */
  TRANSITION: 200,
  /** Item stagger delay: 80ms for comfortable reading */
  STAGGER: 80,
  /** Focus ring transition */
  FOCUS: 100,
  /** Icon micro-animation */
  ICON: 150,
} as const;

// =============================================================================
// SWISS EASING CURVES
// Reference: ANIMATION-SPECIFIC-GUIDE.md §2
// =============================================================================

export const MENU_EASING = {
  /** Default Swiss curve for general transitions */
  DEFAULT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  /** EaseOut for entrances (deceleration) */
  EASE_OUT: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
  /** EaseIn for exits (acceleration) */
  EASE_IN: 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
  /** Spring-like for micro-interactions */
  SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

/** Framer Motion easing arrays */
export const MENU_EASING_ARRAY = {
  DEFAULT: [0.25, 0.46, 0.45, 0.94] as const,
  EASE_OUT: [0.22, 0.61, 0.36, 1] as const,
  EASE_IN: [0.55, 0.06, 0.68, 0.19] as const,
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

// =============================================================================
// MEGA MENU CONFIGURATIONS
// =============================================================================

/**
 * Solutions Mega Menu Configuration
 *
 * Mathematical Layout:
 * - Width: S₆₄ = 512px (wide)
 * - Columns: 2
 * - Item count: 6 (3 per column)
 * - Total stagger: D = 200ms + (6-1) × 80ms = 600ms
 */
export const SOLUTIONS_MENU: MegaMenuConfig = {
  id: 'solutions',
  label: 'Solutions',
  width: 'wide',
  columns: 2,
  sections: [
    {
      id: 'by-industry',
      title: 'By Industry',
      items: [
        {
          id: 'saas',
          title: 'SaaS Platforms',
          description: 'Customer portals & admin consoles',
          href: '/solutions/saas',
        },
        {
          id: 'healthcare',
          title: 'Healthcare',
          description: 'HIPAA-compliant patient systems',
          href: '/solutions/healthcare',
          badge: { text: 'Popular', variant: 'popular' },
        },
        {
          id: 'fintech',
          title: 'FinTech',
          description: 'Trading & compliance dashboards',
          href: '/solutions/fintech',
        },
        {
          id: 'ecommerce',
          title: 'E-Commerce',
          description: 'Catalog & inventory management',
          href: '/solutions/ecommerce',
        },
        {
          id: 'logistics',
          title: 'Logistics',
          description: 'Real-time tracking & dispatch',
          href: '/solutions/logistics',
        },
        {
          id: 'ai',
          title: 'AI & ML',
          description: 'Model ops & prompt engineering',
          href: '/solutions/ai',
          badge: { text: 'New', variant: 'new' },
        },
      ],
    },
  ],
  footer: {
    text: 'Need a custom solution?',
    href: '/contact',
    linkText: 'Contact us →',
  },
} as const;

/**
 * Resources Mega Menu Configuration
 *
 * Mathematical Layout:
 * - Width: S₄₈ = 384px (standard)
 * - Columns: 1
 * - Item count: 5
 * - Total stagger: D = 200ms + (5-1) × 80ms = 520ms
 */
export const RESOURCES_MENU: MegaMenuConfig = {
  id: 'resources',
  label: 'Resources',
  width: 'standard',
  columns: 1,
  sections: [
    {
      id: 'learn',
      title: 'Learn',
      items: [
        {
          id: 'case-studies',
          title: 'Case Studies',
          description: 'Real-world implementation examples',
          href: '/case-studies',
        },
        {
          id: 'documentation',
          title: 'Documentation',
          description: 'Guides, tutorials, and API reference',
          href: '/docs',
        },
        {
          id: 'blog',
          title: 'Blog',
          description: 'Insights on design & development',
          href: '/blog',
        },
      ],
    },
    {
      id: 'developers',
      title: 'Developers',
      items: [
        {
          id: 'api',
          title: 'API Reference',
          description: 'Complete API documentation',
          href: '/docs/api',
          badge: { text: 'Beta', variant: 'beta' },
        },
        {
          id: 'changelog',
          title: 'Changelog',
          description: 'Latest updates and releases',
          href: '/changelog',
        },
      ],
    },
  ],
} as const;

/**
 * Pricing Mega Menu Configuration
 *
 * Mathematical Layout:
 * - Width: S₆₄ = 512px (wide)
 * - Columns: 3
 * - Item count: 3
 * - Total stagger: D = 200ms + (3-1) × 80ms = 360ms
 */
export const PRICING_MENU: MegaMenuConfig = {
  id: 'pricing',
  label: 'Pricing',
  width: 'wide',
  columns: 3,
  sections: [
    {
      id: 'plans',
      items: [
        {
          id: 'free',
          title: 'Free',
          description: 'Perfect for side projects',
          href: '/pricing#free',
        },
        {
          id: 'pro',
          title: 'Pro',
          description: 'For growing businesses',
          href: '/pricing#pro',
          badge: { text: 'Popular', variant: 'popular' },
        },
        {
          id: 'enterprise',
          title: 'Enterprise',
          description: 'Custom solutions at scale',
          href: '/pricing#enterprise',
        },
      ],
    },
  ],
  footer: {
    text: 'Not sure which plan?',
    href: '/pricing/compare',
    linkText: 'Compare plans →',
  },
} as const;

/**
 * Navigation Items with Mega Menu Support
 *
 * Items with megaMenu property render MegaMenuDropdown,
 * others render simple NavLink.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    href: '/solutions',
    megaMenu: SOLUTIONS_MENU,
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    megaMenu: RESOURCES_MENU,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
    megaMenu: PRICING_MENU,
  },
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

// =============================================================================
// ENHANCED MEGA MENU CLASSES (Swiss Design System)
//
// Mathematical Foundation:
// - Width standard: w-96 = 384px (S₄₈)
// - Width wide: w-[512px] (S₆₄)
// - Padding: p-6 = 24px (S₃)
// - Gap: gap-4 = 16px (S₂)
// - Stagger base: 80ms per item
// =============================================================================

export const MEGA_MENU_CONTAINER_CLASSES = {
  /** Base container styles */
  base: 'absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden',
  /** Width variants following 8px grid */
  widthStandard: 'w-96', // 384px = S₄₈
  widthWide: 'w-[512px]', // 512px = S₆₄
} as const;

export const MENU_TRIGGER_CLASSES = {
  /** Base trigger button styles */
  base: 'flex items-center gap-1 font-medium transition-colors duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
  /** Scrolled state colors */
  scrolled: 'text-gray-700 hover:text-gray-900',
  /** Transparent state colors */
  transparent: 'text-gray-200 hover:text-white',
  /** Chevron icon transition */
  chevron: 'w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
  chevronOpen: 'rotate-180',
} as const;

export const MENU_SECTION_CLASSES = {
  /** Section container */
  container: 'py-4 first:pt-0 last:pb-0',
  /** Section title: S₂ padding, uppercase tracking */
  title: 'px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider',
  /** Items container */
  items: 'space-y-1',
} as const;

export const MENU_ITEM_CLASSES = {
  /** Base item styles with Swiss transitions */
  base: 'group/item flex items-start gap-4 px-6 py-3 rounded-lg mx-2 transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer',
  /** Hover and focus states */
  hover: 'hover:bg-gray-50',
  focus: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
  /** Active/pressed state */
  active: 'active:bg-gray-100 active:scale-[0.99]',
  /** Icon container: S₅ = 40px */
  iconContainer:
    'flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center transition-colors duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/item:bg-blue-50',
  /** Icon: S₃ = 24px */
  icon: 'w-6 h-6 text-gray-500 transition-colors duration-150 group-hover/item:text-blue-600',
  /** Text container */
  textContainer: 'flex-1 min-w-0',
  /** Title row */
  titleRow: 'flex items-center gap-2',
  /** Item title */
  title: 'font-medium text-gray-900 group-hover/item:text-gray-900 transition-colors duration-150',
  /** Item description */
  description: 'text-sm text-gray-500 mt-0.5 line-clamp-1',
} as const;

export const MENU_BADGE_CLASSES = {
  /** Base badge styles */
  base: 'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full',
  /** Badge variants */
  new: 'bg-green-100 text-green-700',
  popular: 'bg-blue-100 text-blue-700',
  beta: 'bg-amber-100 text-amber-700',
  pro: 'bg-purple-100 text-purple-700',
} as const;

export const MENU_FOOTER_CLASSES = {
  /** Footer container with top border */
  container: 'px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between',
  /** Footer text */
  text: 'text-sm text-gray-500',
  /** Footer link */
  link: 'text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150',
} as const;

// =============================================================================
// FRAMER MOTION VARIANTS (Swiss Animation Mathematics)
//
// Menu Container Animation:
// - Duration: 200ms (SWISS_TIMING.fast)
// - Easing: easeOut [0.22, 0.61, 0.36, 1] for entrance
// - Transform: translateY(-8px → 0) + opacity (0 → 1)
//
// Item Stagger Animation:
// - Stagger delay: 80ms (SWISS_STAGGER.normal equivalent)
// - Total sequence: D_total = 200ms + (n-1) × 80ms
// - For 6 items: 200ms + 5 × 80ms = 600ms
// =============================================================================

export const MENU_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: [0.55, 0.06, 0.68, 0.19], // easeIn for exit
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.22, 0.61, 0.36, 1], // easeOut for entrance
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
} as const;

export const MENU_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    x: -8,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
} as const;

export const MENU_SECTION_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;
