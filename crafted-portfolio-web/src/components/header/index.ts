/**
 * Header Module Public API
 *
 * Exports the main StickyHeader component and types for external use.
 *
 * Usage:
 * ```tsx
 * import { StickyHeader } from '@/components/header';
 * ```
 *
 * @module header
 */

// Main component
export { StickyHeader } from './StickyHeader';

// Types for consumers
export type { CaseStudy, NavItem, StickyHeaderProps } from './types';

// Constants for testing/extension
export { CASE_STUDIES, NAV_ITEMS, HEADER_DIMENSIONS } from './constants';
