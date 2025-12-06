/**
 * WhyUs Section Component
 *
 * Main orchestrator for Why Choose Us section with Swiss Design compliance.
 *
 * Swiss Design Principles:
 * - Mathematical spacing (8px grid: Sₙ = 8 × n)
 * - Scroll-triggered animations with stagger
 * - Physics-based easing curves
 * - Reduced motion support (WCAG 2.1 AAA)
 *
 * Architecture:
 * - Modular composition (Header + Grid → Cards)
 * - Type-safe configuration
 * - Content separated from presentation
 * - Animation centralized in hook
 *
 * Mathematical Foundation:
 *
 * SCROLL ANIMATION SEQUENCE:
 *   Threshold: 20% section visible
 *   Header: 0ms delay, 500ms duration
 *   Cards: Staggered at 150ms intervals
 *   - Card 1: 0ms
 *   - Card 2: 150ms
 *   - Card 3: 300ms
 *   - Card 4: 450ms
 *   Total: 450ms + 500ms = 950ms
 *
 * SPACING (8px Grid):
 *   - Section padding: S₁₆ = 128px (py-16)
 *   - Header margin: S₁₂ = 96px (mb-12)
 *   - Card gap: S₆ = 48px (gap-6)
 *   - Card padding: S₆ = 48px (p-6)
 *
 * @module why-us
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { SectionHeader, AdvantageGrid } from './components';
import { useWhyUsAnimation } from './hooks/useWhyUsAnimation';
import { WHY_US_CONTENT, WHY_US_CLASSES } from './constants';
import type { WhyUsProps } from './types';

/**
 * WhyUs Component
 *
 * Scroll-triggered section showcasing key advantages with animated cards.
 *
 * Props:
 * - className: Additional CSS classes
 * - id: Section ID for navigation anchors
 *
 * Example:
 * ```tsx
 * <WhyUs id="why-us" />
 * ```
 */
export const WhyUs = memo<WhyUsProps>(function WhyUs({ className, id = 'why-us' }) {
  // Get animation variants and scroll trigger
  const { sectionRef, isInView, headerVariants, cardVariants, containerVariants } =
    useWhyUsAnimation();

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(WHY_US_CLASSES.section, className)}
      aria-label='Why Choose Us'
    >
      <Container className={WHY_US_CLASSES.container}>
        {/* Animated Header */}
        <motion.div initial='hidden' animate={isInView ? 'visible' : 'hidden'}>
          <SectionHeader
            title={WHY_US_CONTENT.section.title}
            description={WHY_US_CONTENT.section.description}
            variants={headerVariants}
          />
        </motion.div>

        {/* Animated Advantage Grid */}
        <motion.div initial='hidden' animate={isInView ? 'visible' : 'hidden'}>
          <AdvantageGrid
            advantages={WHY_US_CONTENT.advantages}
            containerVariants={containerVariants}
            itemVariants={cardVariants}
          />
        </motion.div>
      </Container>
    </section>
  );
});

WhyUs.displayName = 'WhyUs';
