/**
 * MenuItem Component
 *
 * Individual menu item with icon, title, description, and optional badge.
 *
 * Swiss Design Micro-interactions:
 * - Background: hover:bg-gray-50 with 150ms transition
 * - Icon container: color shift to blue on hover
 * - Press state: scale(0.99) for tactile feedback
 * - Focus ring: 2px blue inset ring
 *
 * Mathematical Foundation:
 * - Item padding: px-6 py-3 (24px × 12px)
 * - Icon container: w-10 h-10 (40px = S₅)
 * - Icon size: w-6 h-6 (24px = S₃)
 * - Gap: gap-4 (16px = S₂)
 *
 * Animation Equation:
 * - Stagger delay: 50ms per item
 * - Entrance: opacity 0→1, x -8→0 over 200ms easeOut
 *
 * @module header/components/MenuItem
 */

'use client';

import { memo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MENU_ITEM_CLASSES, MENU_ITEM_VARIANTS } from '../constants';
import { MenuBadge } from './MenuBadge';
import type { MenuItemProps } from '../types';

/**
 * Default icon placeholder when no icon is provided
 */
const DefaultIcon = memo(function DefaultIcon() {
  return (
    <svg
      className={MENU_ITEM_CLASSES.icon}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
});

DefaultIcon.displayName = 'DefaultIcon';

export const MenuItem = memo<MenuItemProps & { isFocused?: boolean }>(
  function MenuItem({ item, index, isFocused = false }) {
    const linkRef = useRef<HTMLAnchorElement>(null);

    // Focus management for keyboard navigation
    useEffect(() => {
      if (isFocused && linkRef.current) {
        linkRef.current.focus();
      }
    }, [isFocused]);

    const Icon = item.icon;

    return (
      <motion.div variants={MENU_ITEM_VARIANTS}>
        <Link
          ref={linkRef}
          href={item.href}
          className={cn(
            MENU_ITEM_CLASSES.base,
            MENU_ITEM_CLASSES.hover,
            MENU_ITEM_CLASSES.focus,
            MENU_ITEM_CLASSES.active
          )}
          role="menuitem"
          tabIndex={isFocused ? 0 : -1}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
        >
          {/* Icon Container */}
          <div className={MENU_ITEM_CLASSES.iconContainer}>
            {Icon ? (
              <Icon className={MENU_ITEM_CLASSES.icon} aria-hidden="true" />
            ) : (
              <DefaultIcon />
            )}
          </div>

          {/* Text Content */}
          <div className={MENU_ITEM_CLASSES.textContainer}>
            <div className={MENU_ITEM_CLASSES.titleRow}>
              <span className={MENU_ITEM_CLASSES.title}>{item.title}</span>
              {item.badge && <MenuBadge badge={item.badge} />}
            </div>
            <p className={MENU_ITEM_CLASSES.description}>{item.description}</p>
          </div>

          {/* External link indicator */}
          {item.isExternal && (
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </Link>
      </motion.div>
    );
  }
);

MenuItem.displayName = 'MenuItem';
