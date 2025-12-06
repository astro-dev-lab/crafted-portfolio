/**
 * HeroHeadline Component
 *
 * Animated headline with accent styling for hero section.
 *
 * Swiss Design Principles:
 * - Typography scale: text-5xl (mobile) → text-7xl (desktop)
 * - Accent color: blue-500 for emphasis
 * - Animation: 800ms slideUp with easeOut
 *
 * Mathematical Properties:
 * - Font sizes follow Perfect Fourth scale (1.333 ratio)
 * - Line height: leading-tight (1.25)
 * - Spacing: mb-6 = S₃ = 24px
 *
 * @module hero/components/HeroHeadline
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HERO_CLASSES } from '../constants';
import type { HeroHeadlineProps } from '../types';

export const HeroHeadline = memo<HeroHeadlineProps>(function HeroHeadline({
  config,
  variants,
  className,
}) {
  const { line1, line2, accentLine = 2 } = config;

  return (
    <motion.h1 className={cn(HERO_CLASSES.headline, className)} variants={variants}>
      {/* Line 1 */}
      {accentLine === 1 ? <span className={HERO_CLASSES.headlineAccent}>{line1}</span> : line1}

      {/* Line 2 (on new line) */}
      {accentLine === 2 ? (
        <span className={HERO_CLASSES.headlineAccent}>{line2}</span>
      ) : (
        <span className='block'>{line2}</span>
      )}
    </motion.h1>
  );
});

HeroHeadline.displayName = 'HeroHeadline';
