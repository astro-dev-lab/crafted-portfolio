/**
 * MenuBadge Component
 *
 * Small badge for menu items (New, Popular, Beta, Pro).
 *
 * Swiss Design Principles:
 * - Minimal color palette with purpose
 * - Consistent border-radius (rounded-full)
 * - Typography: xs font, medium weight
 *
 * Mathematical Foundation:
 * - Padding: px-2 py-0.5 (8px × 2px for optical balance)
 * - Font size: text-xs (12px from typography scale)
 *
 * @module header/components/MenuBadge
 */

'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { MENU_BADGE_CLASSES } from '../constants';
import type { MenuBadgeProps } from '../types';

export const MenuBadge = memo<MenuBadgeProps>(function MenuBadge({ badge }) {
  const variantClass = MENU_BADGE_CLASSES[badge.variant];

  return (
    <span className={cn(MENU_BADGE_CLASSES.base, variantClass)}>
      {badge.text}
    </span>
  );
});

MenuBadge.displayName = 'MenuBadge';
