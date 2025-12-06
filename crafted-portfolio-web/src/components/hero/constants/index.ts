/**
 * Hero Constants
 *
 * Static data and configuration for hero section.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, TIMING-SPECIFIC-GUIDE.md §2
 *
 * Mathematical Foundation (Swiss Design):
 *
 * SPACING EQUATION: Sₙ = 8 × n
 *   - S₂ = 16px (tight gaps)
 *   - S₄ = 32px (button gaps)
 *   - S₆ = 48px (touch targets)
 *   - S₁₂ = 96px (section spacing)
 *
 * TIMING EQUATION: Fibonacci-derived progression
 *   - T_hero = 800ms (maximum allowed, hero-only exception)
 *   - Stagger = 150ms (dramatic reveal)
 *
 * EASING EQUATION: Cubic-bezier physics
 *   - EaseOut: cubic-bezier(0.22, 0.61, 0.36, 1) for entrances
 *
 * ANIMATION SEQUENCE:
 *   Total time = 800ms + (4 items - 1) × 150ms = 1250ms
 *   1. Headline:      0ms delay
 *   2. Subheadline:   150ms delay
 *   3. CTAs:          300ms delay
 *   4. (Reserved):    450ms delay (future: metrics/badges)
 *
 * @module hero/constants
 */

import type { HeroContentConfig } from '../types';
import { SWISS_TIMING, SWISS_STAGGER } from '@/lib/motion';

// =============================================================================
// SWISS SPACING (Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const SWISS_HERO_SPACING = {
  /** S₂ = 16px - Tight gaps */
  SM: 16,
  /** S₄ = 32px - Button gaps */
  MD: 32,
  /** S₆ = 48px - Touch targets, section gaps */
  LG: 48,
  /** S₈ = 64px - Large vertical spacing */
  XL: 64,
  /** S₁₂ = 96px - Major section spacing */
  XXL: 96,
} as const;

// =============================================================================
// HERO CONTENT CONFIGURATION
// =============================================================================

/**
 * Hero section content
 *
 * All text content extracted to constants for:
 * - Easy A/B testing
 * - Internationalization support
 * - Separation of concerns (data ≠ presentation)
 */
export const HERO_CONTENT: HeroContentConfig = {
  headline: {
    line1: 'We Build Enterprise-Grade',
    line2: 'Web Platforms',
    accentLine: 2, // Second line gets blue-500 accent color
  },
  subheadline:
    'From SaaS admin consoles to AI operation hubs, we craft production-ready systems that scale with your business.',
  ctas: [
    {
      label: 'View Our Work',
      action: 'scroll',
      target: 'case-studies',
      variant: 'primary',
    },
    {
      label: 'Get In Touch',
      action: 'scroll',
      target: 'contact',
      variant: 'secondary',
    },
  ],
} as const;

// =============================================================================
// ANIMATION CONFIGURATION
// Reference: TIMING-SPECIFIC-GUIDE.md §2
// =============================================================================

/**
 * Hero animation configuration
 *
 * These parameters are used by useHeroAnimation hook to create variants.
 * Configuration is kept in constants for consistency and documentation.
 *
 * Mathematical properties:
 * - Slide distance: 20px
 * - Duration: 800ms (SWISS_TIMING.hero)
 * - Stagger type: 'dramatic' (150ms between elements)
 * - Easing: easeOut [0.22, 0.61, 0.36, 1]
 */
export const HERO_ANIMATION_CONFIG = {
  /** Distance to slide up (in pixels) */
  slideDistance: 20,
  /** Animation duration key */
  duration: 'hero' as const,
  /** Stagger type for sequential reveals */
  stagger: 'dramatic' as const,
} as const;

// =============================================================================
// COMPONENT STYLE CLASSES
// =============================================================================

/**
 * CSS classes for hero section
 *
 * All spacing follows 8px grid system
 * Responsive breakpoints at sm, lg, xl
 */
export const HERO_CLASSES = {
  section: 'relative h-screen flex items-center overflow-hidden bg-gray-950',
  overlay:
    'absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-0 pointer-events-none',
  contentWrapper: 'relative z-10',
  contentContainer: 'max-w-3xl',
  headline: 'text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white',
  headlineAccent: 'block text-blue-500',
  subheadline: 'text-xl lg:text-2xl mb-8 text-gray-300 max-w-2xl',
  ctaContainer: 'flex flex-col sm:flex-row gap-4',
  ctaPrimary: 'bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4',
  ctaSecondary:
    'border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 text-lg px-8 py-4',
} as const;

// =============================================================================
// ANIMATION TIMING REFERENCE
// =============================================================================

/**
 * Animation timing constants
 *
 * Exported for documentation and testing purposes
 * All values sourced from lib/motion.ts
 */
export const HERO_ANIMATION_TIMING = {
  /** Base animation duration: 800ms (hero exception) */
  duration: SWISS_TIMING.hero,
  /** Stagger delay between elements: 150ms */
  stagger: SWISS_STAGGER.dramatic * 1000, // Convert to ms
  /** Total sequence time: 800ms + 3 × 150ms = 1250ms */
  totalSequence: SWISS_TIMING.hero + 3 * SWISS_STAGGER.dramatic * 1000,
} as const;
