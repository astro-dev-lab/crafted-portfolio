/**
 * Header Types
 *
 * TypeScript interfaces for all header components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * Mathematical Foundation (Swiss Design):
 * - Spacing: Sₙ = 8 × n (8px grid system)
 * - Timing: Fibonacci-derived (100ms, 200ms, 300ms, 500ms, 800ms)
 * - Easing: Physics-based cubic-bezier curves
 *
 * @module header/types
 */

import type { ReactNode, ComponentType, SVGProps } from 'react';

// =============================================================================
// ICON TYPE
// =============================================================================

/** SVG icon component type for menu items */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// =============================================================================
// MEGA MENU TYPES
// =============================================================================

/** Badge configuration for menu items */
export interface MenuBadge {
  readonly text: string;
  readonly variant: 'new' | 'popular' | 'beta' | 'pro';
}

/**
 * Individual mega menu item
 *
 * Mathematical constraints:
 * - Icon size: S₃ = 24px (24 × 24)
 * - Item padding: S₂ = 16px
 * - Gap between icon and text: S₂ = 16px
 */
export interface MegaMenuItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly icon?: IconComponent;
  readonly badge?: MenuBadge;
  readonly isExternal?: boolean;
}

/**
 * Section within a mega menu
 *
 * Used for grouping related items (e.g., "By Industry", "Documentation")
 */
export interface MegaMenuSection {
  readonly id: string;
  readonly title?: string;
  readonly items: readonly MegaMenuItem[];
}

/**
 * CTA Button Configuration
 *
 * Used in mega menu footers for primary and secondary actions.
 */
export interface MegaMenuCTA {
  readonly label: string;
  readonly href: string;
}

/**
 * Complete mega menu configuration
 *
 * Mathematical constraints:
 * - Menu width: S₄₈ = 384px (uniform) or S₆₄ = 512px (wide)
 * - Max columns: 2-3 based on content
 * - Column gap: S₄ = 32px
 */
export interface MegaMenuConfig {
  readonly id: string;
  readonly label: string;
  readonly sections: readonly MegaMenuSection[];
  readonly width?: 'standard' | 'wide';
  readonly columns?: 1 | 2 | 3;
  readonly footer?: {
    readonly text: string;
    readonly href: string;
    readonly linkText: string;
  };
  readonly cta?: {
    readonly primary: MegaMenuCTA;
    readonly secondary?: MegaMenuCTA;
  };
}

/** Legacy: Case study item for mega menu */
export interface CaseStudy {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly description: string;
}

/** Navigation item configuration */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
  readonly megaMenu?: MegaMenuConfig;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface LogoProps {
  readonly isScrolled: boolean;
}

export interface NavLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly isScrolled: boolean;
  readonly isExternal?: boolean;
  readonly className?: string;
}

export interface CaseStudiesDropdownProps {
  readonly isScrolled: boolean;
  readonly caseStudies: readonly CaseStudy[];
}

/** Props for mega menu trigger button */
export interface MenuTriggerProps {
  readonly label: string;
  readonly isScrolled: boolean;
  readonly isOpen: boolean;
  readonly onClick?: () => void;
  readonly onMouseEnter?: () => void;
  readonly onMouseLeave?: () => void;
}

/** Props for individual menu item */
export interface MenuItemProps {
  readonly item: MegaMenuItem;
  readonly index: number;
  readonly isVisible?: boolean;
}

/** Props for menu section */
export interface MenuSectionProps {
  readonly section: MegaMenuSection;
  readonly sectionIndex: number;
}

/** Props for menu badge */
export interface MenuBadgeProps {
  readonly badge: MenuBadge;
}

/** Props for the MegaMenuDropdown component */
export interface MegaMenuDropdownProps {
  readonly config: MegaMenuConfig;
  readonly isScrolled: boolean;
}

export interface SignInButtonProps {
  readonly isScrolled: boolean;
}

export interface GetStartedCTAProps {
  readonly isScrolled: boolean;
}

export interface NavigationProps {
  readonly isScrolled: boolean;
  readonly navItems: readonly NavItem[];
}

export interface ActionButtonsProps {
  readonly isScrolled: boolean;
}

export interface StickyHeaderProps {
  /** Optional className for custom styling */
  readonly className?: string;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseScrollStateReturn {
  readonly isScrolled: boolean;
}

export interface UseDropdownStateReturn {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}

/**
 * Return type for useMenuState hook
 *
 * Manages open/close state with hover intent detection.
 * Hover intent uses 150ms delay to prevent accidental triggers.
 */
export interface UseMenuStateReturn {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
  readonly handleMouseEnter: () => void;
  readonly handleMouseLeave: () => void;
}

/**
 * Return type for useKeyboardNavigation hook
 *
 * Provides full keyboard accessibility for mega menus.
 */
export interface UseKeyboardNavigationReturn {
  readonly focusedIndex: number;
  readonly setFocusedIndex: (index: number) => void;
  readonly handleKeyDown: (event: React.KeyboardEvent, itemCount: number) => void;
  readonly resetFocus: () => void;
}
