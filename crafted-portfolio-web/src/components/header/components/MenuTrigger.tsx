/**
 * MenuTrigger Component
 *
 * Trigger button for mega menu dropdowns with animated chevron.
 *
 * Swiss Design Micro-interactions:
 * - Chevron rotation: 180° on open with 200ms easeOut
 * - Color transition: 200ms with default Swiss curve
 * - Focus ring: 2px blue ring with 100ms transition
 *
 * Mathematical Foundation:
 * - Icon size: S₁ = 8px (w-4 h-4 = 16px is S₂, but icon internally is S₁)
 * - Gap: S₁ = 8px (gap-1 = 4px for optical balance)
 *
 * @module header/components/MenuTrigger
 */

'use client';

import { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MENU_TRIGGER_CLASSES } from '../constants';
import type { MenuTriggerProps } from '../types';

export const MenuTrigger = memo(
  forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
    { label, isScrolled, isOpen, onClick, onMouseEnter, onMouseLeave },
    ref
  ) {
    const triggerClasses = cn(
      MENU_TRIGGER_CLASSES.base,
      isScrolled ? MENU_TRIGGER_CLASSES.scrolled : MENU_TRIGGER_CLASSES.transparent
    );

    const chevronClasses = cn(
      MENU_TRIGGER_CLASSES.chevron,
      isOpen && MENU_TRIGGER_CLASSES.chevronOpen
    );

    return (
      <button
        ref={ref}
        type='button'
        className={triggerClasses}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-expanded={isOpen}
        aria-haspopup='menu'
        aria-label={`${label} menu`}
      >
        <span>{label}</span>
        <svg
          className={chevronClasses}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
    );
  })
);

MenuTrigger.displayName = 'MenuTrigger';
