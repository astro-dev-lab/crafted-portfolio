/**
 * MenuSection Component
 *
 * Groups related menu items with optional title.
 *
 * Swiss Design Principles:
 * - Clear visual hierarchy with section titles
 * - Consistent spacing using 8px grid
 * - Uppercase tracking for section headers (Swiss typography)
 *
 * Mathematical Foundation:
 * - Section padding: py-4 (16px = S₂)
 * - Title padding: px-6 py-2 (24px × 8px)
 * - Title tracking: tracking-wider (0.05em)
 * - Items spacing: space-y-1 (4px between items)
 *
 * Animation Equation:
 * - Section container staggers children at 50ms intervals
 * - D_section = n_items × 50ms
 *
 * @module header/components/MenuSection
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { MENU_SECTION_CLASSES, MENU_SECTION_VARIANTS } from '../constants';
import { MenuItem } from './MenuItem';
import type { MenuSectionProps } from '../types';

export const MenuSection = memo<MenuSectionProps & { focusedItemId?: string }>(
  function MenuSection({ section, sectionIndex, focusedItemId }) {
    return (
      <motion.div
        className={MENU_SECTION_CLASSES.container}
        variants={MENU_SECTION_VARIANTS}
      >
        {/* Section Title (optional) */}
        {section.title && (
          <h3 className={MENU_SECTION_CLASSES.title}>{section.title}</h3>
        )}

        {/* Section Items */}
        <div className={MENU_SECTION_CLASSES.items} role="group">
          {section.items.map((item, itemIndex) => (
            <MenuItem
              key={item.id}
              item={item}
              index={itemIndex}
              isFocused={focusedItemId === item.id}
            />
          ))}
        </div>
      </motion.div>
    );
  }
);

MenuSection.displayName = 'MenuSection';
