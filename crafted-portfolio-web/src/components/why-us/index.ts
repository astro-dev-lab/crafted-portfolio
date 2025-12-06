/**
 * WhyUs Module Public API
 *
 * Barrel export for Why Choose Us section components and types.
 * Only exports what's needed externally.
 *
 * @module why-us
 */

// Main component
export { WhyUs } from './WhyUs';

// Type exports (for consumers)
export type { WhyUsProps, AdvantageItem, FeatureItem, WhyUsContent } from './types';

// Constants (for testing/documentation)
export { WHY_US_CONTENT, WHY_US_ANIMATION_CONFIG, ADVANTAGES } from './constants';
