/**
 * HeroSubheadline Component
 *
 * Animated subheadline text for hero section.
 *
 * Swiss Design Principles:
 * - Typography: text-xl (mobile) → text-2xl (desktop)
 * - Color: gray-300 (subtle contrast on dark bg)
 * - Max-width: 2xl (672px) for optimal readability
 *
 * Mathematical Properties:
 * - Spacing: mb-8 = S₄ = 32px
 * - Animation: 800ms slideUp with 150ms stagger delay
 *
 * @module hero/components/HeroSubheadline
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HERO_CLASSES } from '../constants';
import type { HeroSubheadlineProps } from '../types';

export const HeroSubheadline = memo<HeroSubheadlineProps>(function HeroSubheadline({
  text,
  variants,
  className,
}) {
  return (
    <motion.p className={cn(HERO_CLASSES.subheadline, className)} variants={variants}>
      {text}
    </motion.p>
  );
});

HeroSubheadline.displayName = 'HeroSubheadline';
