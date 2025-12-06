/**
 * FeatureList Component
 *
 * List of feature items with check icons.
 *
 * Swiss Design Principles:
 * - Consistent spacing (space-y-2 = S₂ = 16px)
 * - Icon alignment with text baseline
 * - Subtle text color for hierarchy
 *
 * Mathematical Properties:
 * - Icon size: S₂ = 16px (w-4 h-4)
 * - Gap: S₂ = 16px (gap-2)
 * - Margin top: S₄ = 32px (mt-4)
 *
 * @module why-us/components/FeatureList
 */

'use client';

import { memo } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHY_US_CLASSES } from '../constants';
import type { FeatureListProps, FeatureItem } from '../types';

/**
 * Individual feature item
 */
const FeatureItemComponent = memo<{ feature: FeatureItem }>(function FeatureItemComponent({
  feature,
}) {
  const IconComponent = feature.icon || Check;

  return (
    <li className={WHY_US_CLASSES.featureItem}>
      <IconComponent className={WHY_US_CLASSES.featureIcon} aria-hidden='true' />
      <span>{feature.text}</span>
    </li>
  );
});

FeatureItemComponent.displayName = 'FeatureItemComponent';

/**
 * FeatureList Component
 *
 * Renders a list of features with check icons
 */
export const FeatureList = memo<FeatureListProps>(function FeatureList({ features, className }) {
  return (
    <ul className={cn(WHY_US_CLASSES.featureList, className)}>
      {features.map(feature => (
        <FeatureItemComponent key={feature.id} feature={feature} />
      ))}
    </ul>
  );
});

FeatureList.displayName = 'FeatureList';
