/**
 * WhyUs Constants
 *
 * Static data and configuration for Why Choose Us section.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, TIMING-SPECIFIC-GUIDE.md §2
 *
 * Mathematical Foundation (Swiss Design):
 *
 * SPACING EQUATION: Sₙ = 8 × n
 *   - S₂ = 16px (feature gaps)
 *   - S₄ = 32px (title margins)
 *   - S₆ = 48px (card padding)
 *   - S₈ = 64px (card gaps)
 *   - S₁₆ = 128px (section padding)
 *
 * TIMING EQUATION: Fibonacci-derived progression
 *   - T_scroll = 500ms (scroll-triggered reveals)
 *   - Stagger = 150ms (dramatic reveal)
 *
 * ANIMATION SEQUENCE (Scroll-Triggered):
 *   Intersection threshold: 0.2 (20% visible)
 *   Card stagger: D_n = (n-1) × 150ms
 *   - Card 1: 0ms delay
 *   - Card 2: 150ms delay
 *   - Card 3: 300ms delay
 *   - Card 4: 450ms delay
 *   Total sequence: 450ms + 500ms = 950ms
 *
 * @module why-us/constants
 */

import { Server, Code2, Users, Shield, Check } from 'lucide-react';
import type { WhyUsContent, AdvantageItem } from '../types';

// =============================================================================
// SWISS SPACING (Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const SWISS_WHY_US_SPACING = {
  /** S₂ = 16px - Feature gaps, icon gaps */
  XS: 16,
  /** S₄ = 32px - Title margins, section gaps */
  SM: 32,
  /** S₆ = 48px - Card padding, icon size */
  MD: 48,
  /** S₈ = 64px - Card gaps */
  LG: 64,
  /** S₁₆ = 128px - Section padding */
  XL: 128,
} as const;

// =============================================================================
// ANIMATION CONFIGURATION
// =============================================================================

/**
 * Scroll animation configuration
 *
 * Parameters for scroll-triggered entrance animations
 */
export const WHY_US_ANIMATION_CONFIG = {
  /** Slide distance (in pixels) */
  slideDistance: 30,
  /** Animation duration key */
  duration: 'slow' as const, // 500ms
  /** Stagger type for card reveals */
  stagger: 'dramatic' as const, // 150ms
  /** Intersection observer threshold */
  threshold: 0.2,
  /** Only animate once on scroll */
  triggerOnce: true,
} as const;

// =============================================================================
// CONTENT CONFIGURATION
// =============================================================================

/**
 * Advantages data
 *
 * Each advantage represents a key differentiator
 * Icons from lucide-react for consistency
 */
export const ADVANTAGES: readonly AdvantageItem[] = [
  {
    id: 'scalable-architecture',
    icon: Server,
    title: 'Scalable Architecture',
    description:
      'Built from the ground up to handle growth. Our systems are designed to scale seamlessly from startup to enterprise.',
    badge: {
      label: 'Infrastructure',
      variant: 'infrastructure',
    },
    features: [
      { id: 'sa-1', text: 'Microservices-ready architecture', icon: Check },
      { id: 'sa-2', text: 'Cloud-native deployment', icon: Check },
      { id: 'sa-3', text: 'Auto-scaling capabilities', icon: Check },
      { id: 'sa-4', text: 'Load balancing & redundancy', icon: Check },
    ],
  },
  {
    id: 'clean-code',
    icon: Code2,
    title: 'Clean Code Practices',
    description:
      'We believe in code that tells a story. Every line is crafted for clarity, maintainability, and long-term success.',
    badge: {
      label: 'Quality',
      variant: 'quality',
    },
    features: [
      { id: 'cc-1', text: 'TypeScript-first development', icon: Check },
      { id: 'cc-2', text: 'Comprehensive test coverage', icon: Check },
      { id: 'cc-3', text: 'Detailed documentation', icon: Check },
      { id: 'cc-4', text: 'Code review best practices', icon: Check },
    ],
  },
  {
    id: 'user-focused',
    icon: Users,
    title: 'User-Focused Design',
    description:
      'Every pixel serves a purpose. We combine Swiss design principles with modern UX patterns for exceptional experiences.',
    badge: {
      label: 'UX/UI',
      variant: 'ux',
    },
    features: [
      { id: 'uf-1', text: 'Swiss design methodology', icon: Check },
      { id: 'uf-2', text: 'WCAG AAA accessibility', icon: Check },
      { id: 'uf-3', text: 'Performance-first approach', icon: Check },
      { id: 'uf-4', text: 'Responsive across all devices', icon: Check },
    ],
  },
  {
    id: 'security-first',
    icon: Shield,
    title: 'Security First',
    description:
      'Protection is not an afterthought. We implement enterprise-grade security from day one.',
    badge: {
      label: 'Security',
      variant: 'security',
    },
    features: [
      { id: 'sf-1', text: 'SOC 2 compliance ready', icon: Check },
      { id: 'sf-2', text: 'End-to-end encryption', icon: Check },
      { id: 'sf-3', text: 'Regular security audits', icon: Check },
      { id: 'sf-4', text: 'GDPR & privacy compliance', icon: Check },
    ],
  },
] as const;

/**
 * Complete section content
 */
export const WHY_US_CONTENT: WhyUsContent = {
  section: {
    title: 'Why Choose Us',
    description:
      'We combine technical excellence with design thinking to deliver solutions that stand the test of time.',
  },
  advantages: ADVANTAGES,
} as const;

// =============================================================================
// COMPONENT STYLE CLASSES
// =============================================================================

/**
 * CSS classes for WhyUs section
 *
 * All spacing follows 8px grid system
 * Responsive breakpoints at sm, md, lg, xl
 */
export const WHY_US_CLASSES = {
  // Section container
  section: 'py-16 md:py-24 bg-gray-50 dark:bg-gray-900',
  container: 'container mx-auto px-4',

  // Header
  header: 'text-center mb-12 md:mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto',

  // Grid
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',

  // Card
  card: 'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
  cardHeader: 'flex items-start gap-4 mb-4',
  cardIcon:
    'flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400',
  cardContent: 'flex-1',
  cardTitle: 'text-xl font-semibold text-gray-900 dark:text-white mb-2',
  cardDescription: 'text-gray-600 dark:text-gray-300 text-sm',

  // Badge
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3',
  badgeInfrastructure: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  badgeQuality: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  badgeUx: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  badgeSecurity: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',

  // Features
  featureList: 'mt-4 space-y-2',
  featureItem: 'flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400',
  featureIcon: 'w-4 h-4 text-green-500 flex-shrink-0',
} as const;

/**
 * Badge variant to class mapping
 */
export const BADGE_VARIANT_CLASSES: Record<string, string> = {
  infrastructure: WHY_US_CLASSES.badgeInfrastructure,
  quality: WHY_US_CLASSES.badgeQuality,
  ux: WHY_US_CLASSES.badgeUx,
  security: WHY_US_CLASSES.badgeSecurity,
} as const;
