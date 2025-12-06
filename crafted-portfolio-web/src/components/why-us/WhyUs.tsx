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
      className={cn(WHY_US_CLASSES.section, 'relative overflow-hidden', className)}
      aria-label='Why Choose Us'
    >
      {/* Swiss Precision Dots Background Pattern */}
      <div
        className='absolute inset-0 pointer-events-none opacity-40'
        style={{
          backgroundImage: 'url(/images/who-we-are/swiss-precision-dots.svg)',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
        }}
        aria-hidden='true'
      />

      {/* Precision Mesh Accent - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className='absolute top-0 right-0 w-96 h-96 pointer-events-none hidden lg:block'
        style={{
          backgroundImage: 'url(/images/who-we-are/precision-mesh-pattern.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
        }}
        aria-hidden='true'
      />

      {/* Blueprint Lines Accent - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 0.2, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        className='absolute bottom-0 left-0 w-80 h-40 pointer-events-none hidden lg:block'
        style={{
          backgroundImage: 'url(/images/who-we-are/blueprint-technical-lines.svg)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
        }}
        aria-hidden='true'
      />

      <Container className={cn(WHY_US_CLASSES.container, 'relative z-10')}>
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
