/**
 * HeroBackground Component
 *
 * Manages 3D scene rendering and gradient overlay for hero section.
 *
 * Swiss Design Principles:
 * - Layered depth with z-index coordination
 * - Gradient overlay for text readability
 * - Lazy loading for 3D scene performance
 *
 * Technical Details:
 * - 3D scene loaded dynamically (no SSR)
 * - Fallback gradient if scene fails to load
 * - Suspense boundary for loading state
 *
 * @module hero/components/HeroBackground
 */

'use client';

import { memo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { HeroBackgroundProps } from '../types';

// Dynamically import 3D scene (client-side only)
const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), {
  ssr: false,
  loading: () => <HeroBackgroundFallback />,
});

/**
 * Fallback background when 3D scene is loading or disabled
 *
 * Simple gradient that matches the scene's visual style
 */
function HeroBackgroundFallback() {
  return <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black' />;
}

/**
 * HeroBackground Component
 *
 * Renders either:
 * 1. Full 3D scene + overlay (showScene=true, default)
 * 2. Simple gradient (showScene=false or on error)
 */
export const HeroBackground = memo<HeroBackgroundProps>(function HeroBackground({
  showScene = true,
  className,
}) {
  return (
    <>
      {/* 3D Scene or Fallback */}
      <div className={cn('absolute inset-0 z-0', className)}>
        {showScene ? (
          <Suspense fallback={<HeroBackgroundFallback />}>
            <HeroScene />
          </Suspense>
        ) : (
          <HeroBackgroundFallback />
        )}
      </div>

      {/* Overlay gradient for text readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-0 pointer-events-none' />
    </>
  );
});

HeroBackground.displayName = 'HeroBackground';
