/**
 * MenuCTA Component
 *
 * Dual-button call-to-action footer for mega menus.
 *
 * Swiss Design Principles:
 * - Clear visual hierarchy with primary/secondary buttons
 * - Balanced whitespace following 8px grid
 * - Subtle separation from content (border-t)
 *
 * Mathematical Foundation:
 * - Padding: px-6 py-4 (24px × 16px) following Sₙ = 8 × n
 * - Button gap: S₂ = 16px
 * - Background: bg-gray-50 for subtle contrast
 *
 * Animation:
 * - Duration: 200ms (SWISS_TIMING.fast)
 * - Easing: easeOut [0.22, 0.61, 0.36, 1]
 *
 * @module header/components/MenuCTA
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MENU_ITEM_VARIANTS } from '../constants';
import type { MegaMenuCTA } from '../types';

interface MenuCTAProps {
  readonly primary: MegaMenuCTA;
  readonly secondary?: MegaMenuCTA;
}

/**
 * CSS Classes following Swiss Design spacing equations
 *
 * Container: border-t for separation, bg-gray-50 for subtle contrast
 * Button spacing: gap-4 = S₂ = 16px
 */
const MENU_CTA_CLASSES = {
  container: cn(
    'flex items-center justify-end gap-4',
    'border-t border-gray-200 bg-gray-50',
    'px-6 py-4' // S₃ = 24px horizontal, S₂ = 16px vertical
  ),
  primary: cn(
    'inline-flex items-center justify-center',
    'rounded-md px-4 py-2',
    'bg-blue-600 text-white text-sm font-medium',
    'transition-colors duration-200',
    'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  ),
  secondary: cn(
    'inline-flex items-center justify-center',
    'rounded-md px-4 py-2',
    'border border-gray-300 bg-white text-gray-700 text-sm font-medium',
    'transition-colors duration-200',
    'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  ),
} as const;

export const MenuCTA = memo<MenuCTAProps>(function MenuCTA({ primary, secondary }) {
  return (
    <motion.div className={MENU_CTA_CLASSES.container} variants={MENU_ITEM_VARIANTS}>
      {/* Secondary CTA (if provided) - rendered first for left position */}
      {secondary && (
        <Link href={secondary.href} className={MENU_CTA_CLASSES.secondary}>
          {secondary.label}
        </Link>
      )}

      {/* Primary CTA */}
      <Link href={primary.href} className={MENU_CTA_CLASSES.primary}>
        {primary.label}
      </Link>
    </motion.div>
  );
});

MenuCTA.displayName = 'MenuCTA';
