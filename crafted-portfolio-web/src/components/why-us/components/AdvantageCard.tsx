/**
 * AdvantageCard Component
 *
 * Individual advantage card with icon, title, description, and features.
 *
 * Swiss Design Principles:
 * - Clean card layout with balanced whitespace
 * - Icon prominence for visual hierarchy
 * - Badge for categorization
 * - Hover effect for interactivity
 *
 * Mathematical Properties:
 * - Card padding: S₆ = 48px (p-6)
 * - Icon size: S₆ = 48px (w-12 h-12)
 * - Border radius: rounded-xl (12px)
 * - Hover shadow transition: 200ms
 *
 * Animation:
 * - Duration: 500ms (SWISS_TIMING.slow)
 * - Easing: easeOut [0.22, 0.61, 0.36, 1]
 * - Transform: translateY(30px) → translateY(0)
 *
 * @module why-us/components/AdvantageCard
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WHY_US_CLASSES, BADGE_VARIANT_CLASSES } from '../constants';
import { FeatureList } from './FeatureList';
import type { AdvantageCardProps } from '../types';

export const AdvantageCard = memo<AdvantageCardProps>(function AdvantageCard({
  advantage,
  variants,
  className,
}) {
  const { icon: Icon, title, description, features, badge } = advantage;
  const badgeClass = BADGE_VARIANT_CLASSES[badge.variant] || BADGE_VARIANT_CLASSES.quality;

  return (
    <motion.div className={cn(WHY_US_CLASSES.card, className)} variants={variants}>
      {/* Badge */}
      <span className={cn(WHY_US_CLASSES.badge, badgeClass)}>{badge.label}</span>

      {/* Header with Icon */}
      <div className={WHY_US_CLASSES.cardHeader}>
        <div className={WHY_US_CLASSES.cardIcon}>
          <Icon className='w-6 h-6' aria-hidden='true' />
        </div>
        <div className={WHY_US_CLASSES.cardContent}>
          <h3 className={WHY_US_CLASSES.cardTitle}>{title}</h3>
          <p className={WHY_US_CLASSES.cardDescription}>{description}</p>
        </div>
      </div>

      {/* Features */}
      <FeatureList features={features} />
    </motion.div>
  );
});

AdvantageCard.displayName = 'AdvantageCard';
