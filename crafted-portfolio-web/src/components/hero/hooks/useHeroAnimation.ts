/**
 * useHeroAnimation Hook
 *
 * Centralized animation logic for hero section with reduced motion support.
 *
 * Swiss Design Compliance:
 * - Uses SWISS_TIMING.hero (800ms)
 * - Uses SWISS_STAGGER.dramatic (150ms)
 * - Uses SWISS_EASING.easeOut curve
 * - Respects prefers-reduced-motion
 *
 * Mathematical Sequence:
 * - Headline:      0ms delay, 800ms duration
 * - Subheadline:   150ms delay, 800ms duration
 * - CTA buttons:   300ms delay, 800ms duration + 150ms stagger
 * - Total time:    800ms + 450ms = 1250ms
 *
 * Accessibility:
 * - Returns static variants when reduced motion is preferred
 * - Uses getAccessibleVariants for automatic fallback
 *
 * @module hero/hooks/useHeroAnimation
 */

'use client';

import { useMemo } from 'react';
import { useReducedMotion, getAccessibleVariants } from '@/lib/motion';
import {
  HERO_HEADLINE_VARIANTS,
  HERO_SUBHEADLINE_VARIANTS,
  HERO_CTA_CONTAINER_VARIANTS,
  HERO_CTA_ITEM_VARIANTS,
} from '../constants';
import type { UseHeroAnimationReturn } from '../types';

/**
 * useHeroAnimation Hook
 *
 * Returns all animation variants for hero components,
 * automatically respecting user's motion preferences.
 *
 * Usage:
 * ```tsx
 * const { headlineVariants, subheadlineVariants, ... } = useHeroAnimation();
 *
 * <motion.h1 variants={headlineVariants} initial="hidden" animate="visible">
 *   Headline
 * </motion.h1>
 * ```
 */
export function useHeroAnimation(): UseHeroAnimationReturn {
  const prefersReducedMotion = useReducedMotion();

  // Memoize variants to prevent recreation on every render
  const variants = useMemo(() => {
    return {
      headlineVariants: getAccessibleVariants(HERO_HEADLINE_VARIANTS, prefersReducedMotion),
      subheadlineVariants: getAccessibleVariants(HERO_SUBHEADLINE_VARIANTS, prefersReducedMotion),
      ctaContainerVariants: getAccessibleVariants(
        HERO_CTA_CONTAINER_VARIANTS,
        prefersReducedMotion
      ),
      ctaItemVariants: getAccessibleVariants(HERO_CTA_ITEM_VARIANTS, prefersReducedMotion),
      prefersReducedMotion,
    };
  }, [prefersReducedMotion]);

  return variants;
}
