/**
 * SectionHeader Component
 *
 * Animated section header with title and description.
 *
 * Swiss Design Principles:
 * - Typography scale: text-3xl (mobile) → text-4xl (desktop)
 * - Center alignment for visual balance
 * - Subtle description text (gray-600)
 *
 * Mathematical Properties:
 * - Margin bottom: S₁₂ = 96px (mb-12 md:mb-16)
 * - Description max-width: 2xl (672px) for readability
 *
 * @module why-us/components/SectionHeader
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WHY_US_CLASSES } from '../constants';
import type { SectionHeaderProps } from '../types';

export const SectionHeader = memo<SectionHeaderProps>(function SectionHeader({
  title,
  description,
  variants,
  className,
}) {
  return (
    <motion.div className={cn(WHY_US_CLASSES.header, className)} variants={variants}>
      <h2 className={WHY_US_CLASSES.title}>{title}</h2>
      <p className={WHY_US_CLASSES.description}>{description}</p>
    </motion.div>
  );
});

SectionHeader.displayName = 'SectionHeader';
