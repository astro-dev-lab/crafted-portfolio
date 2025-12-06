/**
 * MegaMenuDropdown Component
 *
 * Reusable mega menu with full animation and accessibility support.
 *
 * Swiss Design System Integration:
 * - All spacing follows Sₙ = 8 × n formula
 * - Timing uses Fibonacci-derived progression (100ms, 200ms, 300ms)
 * - Easing uses physics-based cubic-bezier curves
 * - Full keyboard navigation (WCAG 2.1 compliant)
 *
 * Mathematical Foundation:
 *
 * CONTAINER ANIMATION:
 * - Duration: 200ms (SWISS_TIMING.fast)
 * - Easing: easeOut [0.22, 0.61, 0.36, 1] for entrance
 * - Transform: y(-8px → 0) + opacity(0 → 1) + scale(0.98 → 1)
 *
 * STAGGER ANIMATION:
 * - Base delay: 50ms
 * - Per-item delay: 50ms
 * - Total sequence for n items: D_total = 50ms + (n-1) × 50ms
 * - Example (6 items): 50ms + 5 × 50ms = 300ms
 *
 * HOVER INTENT:
 * - Open delay: 150ms (prevents accidental triggers)
 * - Close delay: 100ms (allows "bridge" to submenu)
 *
 * DIMENSIONS (8px grid):
 * - Standard width: 384px (S₄₈)
 * - Wide width: 512px (S₆₄)
 * - Padding: 24px (S₃)
 * - Item gap: 16px (S₂)
 *
 * @module header/components/MegaMenuDropdown
 */

'use client';

import { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MEGA_MENU_CONTAINER_CLASSES, MENU_CONTAINER_VARIANTS } from '../constants';
import { useMenuState } from '../hooks/useMenuState';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { MenuTrigger } from './MenuTrigger';
import { MenuSection } from './MenuSection';
import { MenuFooter } from './MenuFooter';
import { MenuCTA } from './MenuCTA';
import type { MegaMenuDropdownProps, MegaMenuItem } from '../types';

export const MegaMenuDropdown = memo<MegaMenuDropdownProps>(function MegaMenuDropdown({
  config,
  isScrolled,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Menu state with hover intent
  const { isOpen, handleMouseEnter, handleMouseLeave, close } = useMenuState();

  // Flatten all items for keyboard navigation
  const allItems = useMemo<readonly MegaMenuItem[]>(() => {
    return config.sections.flatMap(section => section.items);
  }, [config.sections]);

  // Keyboard navigation
  const { focusedIndex, handleKeyDown, resetFocus } = useKeyboardNavigation();

  // Get focused item ID for highlighting
  const focusedItemId = useMemo(() => {
    if (focusedIndex >= 0 && focusedIndex < allItems.length) {
      return allItems[focusedIndex].id;
    }
    return undefined;
  }, [focusedIndex, allItems]);

  // Handle keyboard events
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        resetFocus();
        triggerRef.current?.focus();
        return;
      }

      if (isOpen) {
        handleKeyDown(event, allItems.length);
      }
    },
    [isOpen, close, resetFocus, handleKeyDown, allItems.length]
  );

  // Reset focus when menu closes
  useEffect(() => {
    if (!isOpen) {
      resetFocus();
    }
  }, [isOpen, resetFocus]);

  // Width class based on config
  const widthClass =
    config.width === 'wide'
      ? MEGA_MENU_CONTAINER_CLASSES.widthWide
      : MEGA_MENU_CONTAINER_CLASSES.widthStandard;

  // Grid columns class
  const columnsClass = useMemo(() => {
    switch (config.columns) {
      case 2:
        return 'grid grid-cols-2 gap-x-6';
      case 3:
        return 'grid grid-cols-3 gap-x-4';
      default:
        return '';
    }
  }, [config.columns]);

  return (
    <div
      ref={containerRef}
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={onKeyDown}
    >
      {/* Trigger Button */}
      <MenuTrigger ref={triggerRef} label={config.label} isScrolled={isScrolled} isOpen={isOpen} />

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(MEGA_MENU_CONTAINER_CLASSES.base, widthClass)}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={MENU_CONTAINER_VARIANTS}
            role='menu'
            aria-label={`${config.label} menu`}
          >
            {/* Menu Content */}
            <div className={cn('py-4', columnsClass)}>
              {config.sections.map((section, sectionIndex) => (
                <MenuSection
                  key={section.id}
                  section={section}
                  sectionIndex={sectionIndex}
                  focusedItemId={focusedItemId}
                />
              ))}
            </div>

            {/* Optional Footer */}
            {config.footer && (
              <MenuFooter
                text={config.footer.text}
                href={config.footer.href}
                linkText={config.footer.linkText}
              />
            )}

            {/* Optional CTA Buttons */}
            {config.cta && (
              <MenuCTA primary={config.cta.primary} secondary={config.cta.secondary} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

MegaMenuDropdown.displayName = 'MegaMenuDropdown';
