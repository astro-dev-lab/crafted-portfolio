/**
 * useWhyUsAnimation Hook
 *
 * Centralized animation logic for Why Choose Us section with:
 * - Scroll-triggered animations via Intersection Observer
 * - Staggered card entrances
 * - Reduced motion support (WCAG 2.1 AAA)
 *
 * Swiss Design Compliance:
 * - Uses SWISS_TIMING.slow (500ms) for scroll reveals
 * - Uses SWISS_STAGGER.dramatic (150ms) for card sequence
 * - Uses SWISS_EASING.easeOut curve
 *
 * Mathematical Sequence:
 * - Header:  0ms delay, 500ms duration
 * - Card 1:  200ms delay, 500ms duration
 * - Card 2:  350ms delay (200 + 150), 500ms duration
 * - Card 3:  500ms delay (200 + 300), 500ms duration
 * - Card 4:  650ms delay (200 + 450), 500ms duration
 * - Total:   650ms + 500ms = 1150ms
 *
 * @module why-us/hooks
 */

'use client';

import { useRef, useMemo } from 'react';
import { useInView } from 'framer-motion';
import {
  useReducedMotion,
  getAccessibleVariants,
  createSlideUpVariants,
  createStaggerContainerVariants,
} from '@/lib/motion';
import { WHY_US_ANIMATION_CONFIG } from '../constants';
import type { UseWhyUsAnimationReturn } from '../types';

/**
 * useWhyUsAnimation Hook
 *
 * Returns animation variants and scroll trigger ref for WhyUs section.
 * All animations respect prefers-reduced-motion setting.
 *
 * Usage:
 * ```tsx
 * const { sectionRef, isInView, headerVariants, cardVariants } = useWhyUsAnimation();
 *
 * <section ref={sectionRef}>
 *   <motion.h2
 *     variants={headerVariants}
 *     initial="hidden"
 *     animate={isInView ? "visible" : "hidden"}
 *   >
 *     Title
 *   </motion.h2>
 * </section>
 * ```
 */
export function useWhyUsAnimation(): UseWhyUsAnimationReturn {
  // Ref for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Check if section is in view (20% threshold, trigger once)
  const isInView = useInView(sectionRef, {
    amount: WHY_US_ANIMATION_CONFIG.threshold,
    once: WHY_US_ANIMATION_CONFIG.triggerOnce,
  });

  // Check reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Memoize variants to prevent recreation on every render
  const variants = useMemo(() => {
    // Create base variants
    const headerBase = createSlideUpVariants(
      WHY_US_ANIMATION_CONFIG.slideDistance,
      WHY_US_ANIMATION_CONFIG.duration
    );

    const cardBase = createSlideUpVariants(
      WHY_US_ANIMATION_CONFIG.slideDistance,
      WHY_US_ANIMATION_CONFIG.duration
    );

    const containerBase = createStaggerContainerVariants(WHY_US_ANIMATION_CONFIG.stagger);

    // Apply accessibility fallbacks
    return {
      headerVariants: getAccessibleVariants(headerBase, prefersReducedMotion),
      cardVariants: getAccessibleVariants(cardBase, prefersReducedMotion),
      containerVariants: getAccessibleVariants(containerBase, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  return {
    sectionRef,
    isInView,
    headerVariants: variants.headerVariants,
    cardVariants: variants.cardVariants,
    containerVariants: variants.containerVariants,
    prefersReducedMotion,
  };
}
