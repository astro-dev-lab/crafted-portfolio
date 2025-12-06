/**
 * Hero Module Public API
 *
 * Barrel export for hero section components and types.
 * Only exports what's needed externally.
 *
 * @module hero
 */

// Main component
export { Hero } from './Hero';

// Type exports (for consumers)
export type { HeroProps, HeroCTAConfig, HeroContentConfig } from './types';

// Constants (for testing/documentation)
export { HERO_CONTENT, HERO_ANIMATION_TIMING } from './constants';
