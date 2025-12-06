/**
 * WhyUs Types
 *
 * TypeScript interfaces for Why Choose Us section components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * Mathematical Foundation (Swiss Design):
 * - Spacing: Sₙ = 8 × n (8px grid system)
 * - Timing: Fibonacci-derived (100ms, 200ms, 300ms, 500ms, 800ms)
 * - Easing: Physics-based cubic-bezier curves
 *
 * @module why-us/types
 */

import type { ComponentType, SVGProps } from 'react';
import type { Variants } from 'framer-motion';

// =============================================================================
// ICON TYPE
// =============================================================================

/** SVG icon component type for advantage cards */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// =============================================================================
// BADGE TYPES
// =============================================================================

/** Badge variant for visual categorization */
export type BadgeVariant = 'infrastructure' | 'quality' | 'ux' | 'security';

/** Badge configuration for advantage cards */
export interface AdvantageBadge {
  readonly label: string;
  readonly variant: BadgeVariant;
}

// =============================================================================
// FEATURE TYPES
// =============================================================================

/**
 * Individual feature item within an advantage card
 *
 * Mathematical constraints:
 * - Icon size: S₂ = 16px (16 × 16)
 * - Gap between icon and text: S₂ = 16px
 */
export interface FeatureItem {
  readonly id: string;
  readonly text: string;
  readonly icon?: IconComponent;
}

// =============================================================================
// ADVANTAGE TYPES
// =============================================================================

/**
 * Individual advantage card configuration
 *
 * Mathematical constraints:
 * - Card padding: S₆ = 48px
 * - Icon size: S₆ = 48px (48 × 48)
 * - Title margin: S₄ = 32px
 */
export interface AdvantageItem {
  readonly id: string;
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
  readonly features: readonly FeatureItem[];
  readonly badge: AdvantageBadge;
}

// =============================================================================
// SECTION TYPES
// =============================================================================

/**
 * Section header content configuration
 */
export interface SectionHeaderContent {
  readonly title: string;
  readonly description: string;
}

/**
 * Complete WhyUs section content
 */
export interface WhyUsContent {
  readonly section: SectionHeaderContent;
  readonly advantages: readonly AdvantageItem[];
}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * Main WhyUs component props
 */
export interface WhyUsProps {
  readonly className?: string;
  readonly id?: string;
}

/**
 * SectionHeader component props
 */
export interface SectionHeaderProps {
  readonly title: string;
  readonly description: string;
  readonly variants?: Variants;
  readonly className?: string;
}

/**
 * AdvantageCard component props
 */
export interface AdvantageCardProps {
  readonly advantage: AdvantageItem;
  readonly variants?: Variants;
  readonly index?: number;
  readonly className?: string;
}

/**
 * FeatureList component props
 */
export interface FeatureListProps {
  readonly features: readonly FeatureItem[];
  readonly className?: string;
}

/**
 * AdvantageGrid component props
 */
export interface AdvantageGridProps {
  readonly advantages: readonly AdvantageItem[];
  readonly containerVariants?: Variants;
  readonly itemVariants?: Variants;
  readonly className?: string;
}

// =============================================================================
// ANIMATION HOOK TYPES
// =============================================================================

/**
 * Return type for useScrollAnimation hook
 *
 * Provides intersection observer ref and animation control
 */
export interface UseScrollAnimationReturn {
  readonly ref: React.RefObject<HTMLElement | null>;
  readonly isInView: boolean;
  readonly variants: Variants;
}

/**
 * Options for useScrollAnimation hook
 */
export interface UseScrollAnimationOptions {
  /** Threshold for intersection (0-1, default 0.2) */
  readonly threshold?: number;
  /** Only trigger once (default true) */
  readonly triggerOnce?: boolean;
  /** Root margin for early/late trigger */
  readonly rootMargin?: string;
}

/**
 * Return type for useWhyUsAnimation hook
 */
export interface UseWhyUsAnimationReturn {
  readonly sectionRef: React.RefObject<HTMLElement | null>;
  readonly isInView: boolean;
  readonly headerVariants: Variants;
  readonly cardVariants: Variants;
  readonly containerVariants: Variants;
  readonly prefersReducedMotion: boolean;
}
