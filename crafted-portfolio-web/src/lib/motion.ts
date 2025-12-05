/**
 * Swiss Design System - Motion Library
 *
 * Physics-based animation system following Swiss precision principles.
 * All timing values are mathematically derived from a 100ms base unit.
 *
 * @module lib/motion
 */

import { useState, useEffect } from 'react';

// =============================================================================
// TIMING CONSTANTS (100ms base unit × multipliers)
// =============================================================================

/**
 * Swiss-compliant animation timing scale.
 * Based on 100ms base unit with Fibonacci-inspired progression.
 */
export const SWISS_TIMING = {
  /** Micro-interactions: hover states, button feedback */
  micro: 100,
  /** Fast transitions: tooltips, small UI changes */
  fast: 200,
  /** Standard transitions: component state changes */
  normal: 300,
  /** Slow transitions: panel reveals, important emphasis */
  slow: 500,
  /** Hero animations only: page-level, single-use reveals */
  hero: 800,
} as const;

/**
 * Maximum allowed duration for standard UI animations.
 * Hero animations (800ms) are exceptions requiring justification.
 */
export const MAX_UI_DURATION = SWISS_TIMING.slow;

// =============================================================================
// EASING CURVES (Physics-based)
// =============================================================================

/**
 * Swiss-compliant easing curves based on natural physics.
 * Primary curve derived from deceleration physics.
 */
export const SWISS_EASING = {
  /** Primary Swiss curve: smooth deceleration */
  default: [0.25, 0.46, 0.45, 0.94] as const,
  /** Ease out: natural deceleration for entrances */
  easeOut: [0.22, 0.61, 0.36, 1] as const,
  /** Ease in: natural acceleration for exits */
  easeIn: [0.55, 0.06, 0.68, 0.19] as const,
  /** Ease in-out: symmetric, for position changes */
  easeInOut: [0.65, 0, 0.35, 1] as const,
} as const;

// =============================================================================
// STAGGER TIMING
// =============================================================================

/**
 * Stagger delays for list/group animations.
 * Based on 50ms base unit for perceptual smoothness.
 */
export const SWISS_STAGGER = {
  /** Tight stagger: rapid succession */
  tight: 0.05,
  /** Normal stagger: comfortable reading pace */
  normal: 0.08,
  /** Relaxed stagger: dramatic effect */
  relaxed: 0.12,
  /** Dramatic stagger: hero-level reveals */
  dramatic: 0.15,
} as const;

// =============================================================================
// REDUCED MOTION UTILITIES
// =============================================================================

/**
 * Check if user prefers reduced motion (static check).
 * Safe for SSR - returns false on server.
 * Use for variant factory functions.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Reactive hook that responds to prefers-reduced-motion changes.
 * Updates in real-time when user toggles accessibility settings.
 *
 * Safe for SSR - returns false during server render, hydrates on client.
 *
 * @returns boolean indicating if user prefers reduced motion
 *
 * @example
 * const prefersReduced = useReducedMotion();
 * const variants = prefersReduced
 *   ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
 *   : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
 */
export function useReducedMotion(): boolean {
  // SSR safety: Initialize with server-safe default
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    // Client-side only: Listen for preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Handle changes (user toggles setting mid-session)
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    // Subscribe to changes
    mediaQuery.addEventListener('change', handler);

    // Cleanup listener on unmount (prevent memory leaks)
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

/**
 * Helper to create motion variants that respect reduced motion preference.
 * Simplifies animations to fade-only when user prefers reduced motion.
 *
 * @param standardVariants - Full animation variants
 * @param prefersReduced - Boolean from useReducedMotion hook
 * @returns Appropriate variants based on user preference
 */
export function getAccessibleVariants<T extends object>(
  standardVariants: T,
  prefersReduced: boolean
):
  | T
  | {
      hidden: { opacity: number };
      visible: { opacity: number; transition: { duration: number } };
    } {
  if (prefersReduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }
  return standardVariants;
}

// =============================================================================
// VARIANT FACTORIES
// =============================================================================

/**
 * Framer Motion transition presets following Swiss timing.
 */
export const SWISS_TRANSITIONS = {
  micro: {
    duration: SWISS_TIMING.micro / 1000,
    ease: SWISS_EASING.default,
  },
  fast: {
    duration: SWISS_TIMING.fast / 1000,
    ease: SWISS_EASING.default,
  },
  normal: {
    duration: SWISS_TIMING.normal / 1000,
    ease: SWISS_EASING.default,
  },
  slow: {
    duration: SWISS_TIMING.slow / 1000,
    ease: SWISS_EASING.default,
  },
  hero: {
    duration: SWISS_TIMING.hero / 1000,
    ease: SWISS_EASING.default,
  },
} as const;

/**
 * Create fade-in animation variants with reduced motion support.
 */
export const createFadeVariants = (duration: keyof typeof SWISS_TIMING = 'normal') => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: SWISS_TRANSITIONS[duration],
    },
  };
};

/**
 * Create slide-up animation variants with reduced motion support.
 */
export const createSlideUpVariants = (
  distance: number = 30,
  duration: keyof typeof SWISS_TIMING = 'normal'
) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: SWISS_TRANSITIONS[duration],
    },
  };
};

/**
 * Create slide-in-left animation variants with reduced motion support.
 */
export const createSlideInLeftVariants = (
  distance: number = 60,
  duration: keyof typeof SWISS_TIMING = 'slow'
) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    hidden: { opacity: 0, x: -distance },
    visible: {
      opacity: 1,
      x: 0,
      transition: SWISS_TRANSITIONS[duration],
    },
  };
};

/**
 * Create stagger container variants with reduced motion support.
 */
export const createStaggerContainerVariants = (stagger: keyof typeof SWISS_STAGGER = 'normal') => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: SWISS_STAGGER[stagger] },
    },
  };
};

/**
 * Create letter-by-letter animation variants for text reveals.
 */
export const createLetterVariants = (baseDelay: number = 0.8, perLetterDelay: number = 0.05) => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: () => ({
        opacity: 1,
        transition: { duration: 0 },
      }),
    };
  }

  return {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: baseDelay + i * perLetterDelay,
        duration: SWISS_TIMING.slow / 1000,
        ease: SWISS_EASING.default,
      },
    }),
  };
};

/**
 * Create word-by-word animation variants for manifesto text.
 */
export const createWordVariants = () => {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: SWISS_TIMING.slow / 1000,
        ease: SWISS_EASING.default,
      },
    },
  };
};

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SwissTimingKey = keyof typeof SWISS_TIMING;
export type SwissEasingKey = keyof typeof SWISS_EASING;
export type SwissStaggerKey = keyof typeof SWISS_STAGGER;
export type SwissTransitionKey = keyof typeof SWISS_TRANSITIONS;
