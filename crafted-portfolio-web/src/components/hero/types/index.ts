/**
 * Hero Types
 *
 * TypeScript interfaces for hero section components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * Mathematical Foundation (Swiss Design):
 * - Spacing: Sₙ = 8 × n (8px grid system)
 * - Timing: Fibonacci-derived (100ms, 200ms, 300ms, 500ms, 800ms)
 * - Easing: Physics-based cubic-bezier curves
 *
 * @module hero/types
 */

import type { Variants } from 'framer-motion';

// =============================================================================
// HERO CONFIGURATION TYPES
// =============================================================================

/**
 * Main Hero component props
 *
 * @property className - Optional additional CSS classes
 * @property showScene - Whether to render 3D background scene (default: true)
 * @property variant - Visual style variant (future expansion)
 */
export interface HeroProps {
  readonly className?: string;
  readonly showScene?: boolean;
  readonly variant?: 'default' | 'minimal';
}

/**
 * Hero headline configuration
 *
 * Supports multi-line headlines with optional accent styling
 */
export interface HeroHeadlineConfig {
  readonly line1: string;
  readonly line2: string;
  readonly accentLine?: 1 | 2; // Which line gets accent color
}

/**
 * Call-to-action button configuration
 *
 * Mathematical constraints:
 * - Button height: S₆ = 48px (touch target)
 * - Padding: px-8 py-4 (32px × 16px)
 * - Gap between buttons: S₄ = 32px
 */
export interface HeroCTAConfig {
  readonly label: string;
  readonly action: 'scroll' | 'link';
  readonly target: string; // Section ID for scroll, URL for link
  readonly variant: 'primary' | 'secondary';
}

/**
 * Complete hero content configuration
 *
 * Contains all text content and CTA definitions
 */
export interface HeroContentConfig {
  readonly headline: HeroHeadlineConfig;
  readonly subheadline: string;
  readonly ctas: readonly [HeroCTAConfig, HeroCTAConfig]; // Always 2 CTAs
}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * HeroBackground component props
 *
 * Manages 3D scene rendering and gradient overlay
 */
export interface HeroBackgroundProps {
  readonly showScene?: boolean;
  readonly className?: string;
}

/**
 * HeroHeadline component props
 *
 * Renders animated headline with accent styling
 */
export interface HeroHeadlineProps {
  readonly config: HeroHeadlineConfig;
  readonly variants?: Variants;
  readonly className?: string;
}

/**
 * HeroSubheadline component props
 *
 * Renders animated subheadline text
 */
export interface HeroSubheadlineProps {
  readonly text: string;
  readonly variants?: Variants;
  readonly className?: string;
}

/**
 * HeroCTAs component props
 *
 * Renders button group with staggered animation
 */
export interface HeroCTAsProps {
  readonly ctas: readonly [HeroCTAConfig, HeroCTAConfig];
  readonly containerVariants?: Variants;
  readonly itemVariants?: Variants;
  readonly className?: string;
}

// =============================================================================
// ANIMATION HOOK TYPES
// =============================================================================

/**
 * Return type for useHeroAnimation hook
 *
 * Provides all animation variants respecting reduced motion preferences
 */
export interface UseHeroAnimationReturn {
  readonly headlineVariants: Variants;
  readonly subheadlineVariants: Variants;
  readonly ctaContainerVariants: Variants;
  readonly ctaItemVariants: Variants;
  readonly prefersReducedMotion: boolean;
}
