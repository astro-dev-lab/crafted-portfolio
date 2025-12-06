/**
 * useScrollState Hook
 *
 * Tracks window scroll position for header state changes.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/hooks/useScrollState
 */

'use client';

import { useState, useEffect } from 'react';
import { HEADER_DIMENSIONS } from '../constants';
import type { UseScrollStateReturn } from '../types';

/**
 * Custom hook to track if page has scrolled past threshold.
 *
 * @returns {UseScrollStateReturn} Scroll state object
 *
 * @example
 * ```tsx
 * const { isScrolled } = useScrollState();
 * // isScrolled is true when scrollY > 50px
 * ```
 */
export function useScrollState(): UseScrollStateReturn {
  // Initialize with actual scroll position to avoid flash
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > HEADER_DIMENSIONS.SCROLL_THRESHOLD;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > HEADER_DIMENSIONS.SCROLL_THRESHOLD;
      setIsScrolled(shouldBeScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled };
}
