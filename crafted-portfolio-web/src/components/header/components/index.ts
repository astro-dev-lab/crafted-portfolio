/**
 * Header Components Barrel Export
 *
 * Re-exports all header sub-components for internal use.
 *
 * @module header/components
 */

// Core components
export { Logo } from './Logo';
export { NavLink } from './NavLink';
export { Navigation } from './Navigation';
export { ActionButtons } from './ActionButtons';
export { SignInButton } from './SignInButton';
export { GetStartedCTA } from './GetStartedCTA';

// Mega menu components
export { MegaMenuDropdown } from './MegaMenuDropdown';
export { MenuTrigger } from './MenuTrigger';
export { MenuItem } from './MenuItem';
export { MenuSection } from './MenuSection';
export { MenuBadge } from './MenuBadge';
export { MenuFooter } from './MenuFooter';

// Legacy (deprecated - use MegaMenuDropdown instead)
export { CaseStudiesDropdown } from './CaseStudiesDropdown';
