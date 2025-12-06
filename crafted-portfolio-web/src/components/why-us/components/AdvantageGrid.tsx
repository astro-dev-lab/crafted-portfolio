/**
 * AdvantageGrid Component
 *
 * Responsive grid wrapper for advantage cards with staggered animation.
 *
 * Swiss Design Principles:
 * - 2-column grid on desktop for visual balance
 * - Single column on mobile for readability
 * - Consistent gaps following 8px grid
 *
 * Mathematical Properties:
 * - Grid gap: S₆ = 48px (gap-6) mobile, S₈ = 64px (gap-8) desktop
 * - Stagger delay: 150ms (SWISS_STAGGER.dramatic)
 * - Total animation: 650ms delay + 500ms duration = 1150ms
 *
 * @module why-us/components/AdvantageGrid
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WHY_US_CLASSES } from '../constants';
import { AdvantageCard } from './AdvantageCard';
import type { AdvantageGridProps } from '../types';

export const AdvantageGrid = memo<AdvantageGridProps>(function AdvantageGrid({
  advantages,
  containerVariants,
  itemVariants,
  className,
}) {
  return (
    <motion.div
      className={cn(WHY_US_CLASSES.grid, className)}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {advantages.map((advantage, index) => (
        <AdvantageCard
          key={advantage.id}
          advantage={advantage}
          variants={itemVariants}
          index={index}
        />
      ))}
    </motion.div>
  );
});

AdvantageGrid.displayName = 'AdvantageGrid';
