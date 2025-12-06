/**
 * useKeyboardNavigation Hook
 *
 * Provides full keyboard accessibility for mega menus.
 *
 * WCAG 2.1 Compliance:
 * - Arrow keys for navigation within menu
 * - Enter/Space to activate items
 * - Escape to close menu
 * - Tab for natural focus flow
 * - Home/End for first/last item
 *
 * Reference: ANIMATION-SPECIFIC-GUIDE.md §4 (Accessibility)
 *
 * @module header/hooks/useKeyboardNavigation
 */

'use client';

import { useState, useCallback } from 'react';
import type { UseKeyboardNavigationReturn } from '../types';

/**
 * Hook for keyboard navigation in mega menus
 *
 * @returns Keyboard navigation state and handlers
 *
 * @example
 * const { focusedIndex, handleKeyDown, resetFocus } = useKeyboardNavigation();
 */
export function useKeyboardNavigation(): UseKeyboardNavigationReturn {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  /**
   * Reset focus to initial state
   */
  const resetFocus = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  /**
   * Handle keyboard events for menu navigation
   *
   * Key mappings:
   * - ArrowDown: Move to next item (wraps to first)
   * - ArrowUp: Move to previous item (wraps to last)
   * - Home: Move to first item
   * - End: Move to last item
   * - Escape: Close menu (handled by parent)
   * - Enter/Space: Activate focused item
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, itemCount: number) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => {
            if (prev < 0) return 0;
            return prev < itemCount - 1 ? prev + 1 : 0; // Wrap to first
          });
          break;

        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => {
            if (prev < 0) return itemCount - 1;
            return prev > 0 ? prev - 1 : itemCount - 1; // Wrap to last
          });
          break;

        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;

        case 'End':
          event.preventDefault();
          setFocusedIndex(itemCount - 1);
          break;

        case 'Tab':
          // Allow natural tab flow, but reset focus tracking
          resetFocus();
          break;

        default:
          break;
      }
    },
    [resetFocus]
  );

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    resetFocus,
  };
}
