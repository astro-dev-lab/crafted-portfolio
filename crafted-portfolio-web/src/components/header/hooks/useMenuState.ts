/**
 * useMenuState Hook
 *
 * Manages mega menu open/close state with hover intent detection.
 *
 * Mathematical Foundation (Swiss Design):
 * - Hover intent delay: 150ms (prevents accidental triggers)
 * - Based on Fitts's Law: T = a + b × log₂(D/W + 1)
 * - 150ms provides optimal balance between responsiveness and stability
 *
 * Reference: TIMING-SPECIFIC-GUIDE.md §2
 *
 * @module header/hooks/useMenuState
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import type { UseMenuStateReturn } from '../types';
import { MENU_TIMING } from '../constants';

/**
 * Hook for managing menu state with hover intent
 *
 * @param hoverIntentDelay - Delay before opening on hover (default: 150ms)
 * @returns Menu state and handlers
 *
 * @example
 * const { isOpen, handleMouseEnter, handleMouseLeave } = useMenuState();
 */
export function useMenuState(
  hoverIntentDelay: number = MENU_TIMING.HOVER_INTENT
): UseMenuStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Open menu immediately
  const open = useCallback(() => {
    clearTimeouts();
    setIsOpen(true);
  }, [clearTimeouts]);

  // Close menu immediately
  const close = useCallback(() => {
    clearTimeouts();
    setIsOpen(false);
  }, [clearTimeouts]);

  // Toggle menu state
  const toggle = useCallback(() => {
    clearTimeouts();
    setIsOpen(prev => !prev);
  }, [clearTimeouts]);

  /**
   * Handle mouse enter with hover intent delay
   *
   * Uses 150ms delay to prevent accidental triggers when
   * user moves mouse across navigation items.
   */
  const handleMouseEnter = useCallback(() => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Set hover intent timeout
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, hoverIntentDelay);
  }, [hoverIntentDelay]);

  /**
   * Handle mouse leave with small delay
   *
   * Uses 100ms delay to allow moving to submenu without
   * triggering close (provides "bridge" between trigger and menu).
   */
  const handleMouseLeave = useCallback(() => {
    // Clear any pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Set close timeout with small delay for bridge
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    handleMouseEnter,
    handleMouseLeave,
  };
}
