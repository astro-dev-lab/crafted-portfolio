/**
 * HeroCTAs Component
 *
 * Call-to-action button group with staggered animation.
 *
 * Swiss Design Principles:
 * - Button height: 48px (S₆ touch target)
 * - Gap: S₄ = 32px (gap-4)
 * - Responsive: flex-col (mobile) → flex-row (desktop)
 *
 * Mathematical Properties:
 * - Stagger: 150ms between buttons
 * - Animation: 800ms slideUp with easeOut
 * - Total sequence: 800ms + 150ms = 950ms
 *
 * Accessibility:
 * - Smooth scroll behavior for section links
 * - Clear focus states
 * - Keyboard navigable
 *
 * @module hero/components/HeroCTAs
 */

'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { HERO_CLASSES } from '../constants';
import type { HeroCTAsProps, HeroCTAConfig } from '../types';

/**
 * Scroll to section helper
 *
 * Uses native smooth scrolling for performance
 */
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Individual CTA button renderer
 */
const CTAButton = memo<{ cta: HeroCTAConfig; itemVariants?: Variants }>(function CTAButton({
  cta,
  itemVariants,
}) {
  const handleClick = useCallback(() => {
    if (cta.action === 'scroll') {
      scrollToSection(cta.target);
    }
  }, [cta]);

  const isPrimary = cta.variant === 'primary';
  const buttonClass = isPrimary ? HERO_CLASSES.ctaPrimary : HERO_CLASSES.ctaSecondary;

  // Wrap in motion for stagger animation
  const MotionButton = (
    <motion.div variants={itemVariants}>
      <Button
        size='lg'
        variant={isPrimary ? 'default' : 'outline'}
        className={buttonClass}
        onClick={cta.action === 'scroll' ? handleClick : undefined}
      >
        {cta.label}
      </Button>
    </motion.div>
  );

  // Wrap in Link if action is 'link'
  if (cta.action === 'link') {
    return <Link href={cta.target}>{MotionButton}</Link>;
  }

  return MotionButton;
});

CTAButton.displayName = 'CTAButton';

/**
 * HeroCTAs Component
 *
 * Renders button group with orchestrated stagger animation
 */
export const HeroCTAs = memo<HeroCTAsProps>(function HeroCTAs({
  ctas,
  containerVariants,
  itemVariants,
  className,
}) {
  return (
    <motion.div
      className={cn(HERO_CLASSES.ctaContainer, className)}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {ctas.map(cta => (
        <CTAButton key={cta.label} cta={cta} itemVariants={itemVariants} />
      ))}
    </motion.div>
  );
});

HeroCTAs.displayName = 'HeroCTAs';
