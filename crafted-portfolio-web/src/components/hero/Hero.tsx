/**
 * Hero Section Component
 *
 * Main orchestrator for hero section with Swiss Design compliance.
 *
 * Swiss Design Principles:
 * - Mathematical spacing (8px grid: Sₙ = 8 × n)
 * - Fibonacci timing (800ms hero animation)
 * - Physics-based easing (cubic-bezier curves)
 * - Reduced motion support (WCAG 2.1 AAA)
 *
 * Architecture:
 * - Modular composition (Background + Headline + Subheadline + CTAs)
 * - Type-safe configuration
 * - Content separated from presentation
 * - Animation centralized in hook
 *
 * Mathematical Foundation:
 *
 * ANIMATION SEQUENCE:
 *   T_total = T_base + Σ(stagger × n)
 *   T_total = 800ms + (4 - 1) × 150ms = 1250ms
 *
 * Layout (Golden Ratio):
 *   φ = 1.618
 *   Content width = viewport × 0.618
 *   Vertical center = height × 0.382 from top
 *
 * @module hero
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { HeroBackground, HeroHeadline, HeroSubheadline, HeroCTAs } from './components';
import { useHeroAnimation } from './hooks/useHeroAnimation';
import { HERO_CONTENT, HERO_CLASSES } from './constants';
import type { HeroProps } from './types';

/**
 * Hero Component
 *
 * Full-height hero section with 3D background, animated content,
 * and call-to-action buttons.
 *
 * Props:
 * - className: Additional CSS classes
 * - showScene: Toggle 3D background scene (default: true)
 * - variant: Visual style (future expansion)
 *
 * Example:
 * ```tsx
 * <Hero showScene={true} />
 * ```
 */
export const Hero = memo<HeroProps>(function Hero({
  className,
  showScene = true,
  variant = 'default',
}) {
  // Get animation variants with reduced motion support
  const { headlineVariants, subheadlineVariants, ctaContainerVariants, ctaItemVariants } =
    useHeroAnimation();

  return (
    <section
      className={cn(HERO_CLASSES.section, className)}
      aria-label='Hero section'
      data-variant={variant}
    >
      {/* 3D Background + Gradient Overlay */}
      <HeroBackground showScene={showScene} />

      {/* Hero Content */}
      <Container className={HERO_CLASSES.contentWrapper}>
        <motion.div className={HERO_CLASSES.contentContainer} initial='hidden' animate='visible'>
          {/* Animated Headline */}
          <HeroHeadline config={HERO_CONTENT.headline} variants={headlineVariants} />

          {/* Animated Subheadline */}
          <HeroSubheadline text={HERO_CONTENT.subheadline} variants={subheadlineVariants} />

          {/* Animated CTAs */}
          <HeroCTAs
            ctas={HERO_CONTENT.ctas}
            containerVariants={ctaContainerVariants}
            itemVariants={ctaItemVariants}
          />
        </motion.div>
      </Container>
    </section>
  );
});

Hero.displayName = 'Hero';
