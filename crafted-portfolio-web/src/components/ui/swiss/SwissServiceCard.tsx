'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Play, LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SWISS_TIMING, SWISS_EASING } from '@/lib/motion';

// =============================================================================
// TYPES
// =============================================================================

export interface SwissServiceCardProps {
  /** Service icon component */
  icon: LucideIcon;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Primary CTA link */
  primaryLink: string;
  /** Primary CTA text */
  primaryText: string;
  /** Secondary CTA link */
  secondaryLink: string;
  /** Secondary CTA text */
  secondaryText: string;
  /** Card index for primary button icon variation */
  index?: number;
  /** Test ID for testing */
  testId?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Swiss-compliant service card with 8px grid spacing.
 * Extracted from AboutUsSwiss for reusability across the application.
 *
 * Swiss Grid Compliance:
 * - p-12 (48px) = 8px × 6 ✅
 * - mb-8 (32px) = 8px × 4 ✅
 * - mb-6 (24px) = 8px × 3 ✅
 * - gap-4 (16px) = 8px × 2 ✅
 * - space-y-4 (16px) = 8px × 2 ✅
 * - py-4 (16px) = 8px × 2 ✅
 * - p-6 (24px) = 8px × 3 ✅
 * - Hover y: -8px = 8px × 1 ✅
 */
export function SwissServiceCard({
  icon: Icon,
  title,
  description,
  primaryLink,
  primaryText,
  secondaryLink,
  secondaryText,
  index = 0,
  testId,
}: SwissServiceCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8, // 8px = base unit ✅
        transition: {
          duration: SWISS_TIMING.normal / 1000,
          ease: SWISS_EASING.default,
        },
      }}
      className='group relative'
      data-testid={testId}
    >
      <Card className='h-full border-0 bg-white relative overflow-hidden p-0'>
        {/* Swiss Precision Dots Background Pattern */}
        <div
          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity'
          style={{
            transitionDuration: `${SWISS_TIMING.slow}ms`,
            backgroundImage: 'url(/images/who-we-are/swiss-precision-dots.svg)',
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />
        <div
          className='absolute inset-0 bg-gradient-to-br from-gray-50 to-white'
          style={{
            boxShadow: `
              0 1px 3px rgba(0, 0, 0, 0.12),
              0 8px 32px rgba(0, 0, 0, 0.08),
              0 32px 64px rgba(0, 0, 0, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.6)
            `,
          }}
        />
        {/* Swiss spacing: p-12 (48px) = 8px × 6 ✅ */}
        <CardContent className='relative p-12 h-full flex flex-col'>
          {/* Geometric Accent */}
          <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent opacity-60' />

          {/* Icon with Premium Treatment */}
          {/* Swiss spacing: mb-8 (32px) = 8px × 4 ✅ */}
          <div className='mb-8'>
            <div
              className='inline-flex p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all'
              style={{
                transitionDuration: `${SWISS_TIMING.slow}ms`,
                boxShadow: `
                  0 4px 12px rgba(59, 130, 246, 0.15),
                  0 16px 32px rgba(59, 130, 246, 0.08),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
              }}
            >
              <Icon
                className='w-8 h-8 text-blue-600 group-hover:text-white transition-colors'
                style={{ transitionDuration: `${SWISS_TIMING.slow}ms` }}
              />
            </div>
          </div>

          {/* Typography with Mathematical Spacing */}
          {/* Swiss spacing: mb-6 (24px) = 8px × 3 ✅ */}
          <h3
            className='text-3xl font-bold text-gray-900 mb-6 tracking-tight leading-tight'
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
          >
            {title}
          </h3>

          {/* Swiss spacing: mb-8 (32px) = 8px × 4 ✅ */}
          <p className='text-gray-600 leading-relaxed mb-8 flex-grow text-lg'>{description}</p>

          {/* Enhanced CTA Buttons */}
          {/* Swiss spacing: space-y-4 (16px) = 8px × 2 ✅ */}
          <div className='space-y-4'>
            <Button
              asChild
              className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 py-4 text-lg font-semibold tracking-wide transition-all'
              style={{
                transitionDuration: `${SWISS_TIMING.normal}ms`,
                boxShadow: `
                  0 4px 12px rgba(59, 130, 246, 0.3),
                  0 8px 24px rgba(59, 130, 246, 0.15)
                `,
              }}
            >
              {/* Swiss spacing: gap-4 (16px) = 8px × 2 ✅ */}
              <Link href={primaryLink} className='flex items-center justify-center gap-4'>
                {index === 0 ? <BookOpen className='w-5 h-5' /> : <Play className='w-5 h-5' />}
                {primaryText}
                <ArrowRight className='w-5 h-5' />
              </Link>
            </Button>

            {/* Swiss spacing: py-4 (16px) = 8px × 2 ✅ */}
            <Button
              asChild
              variant='outline'
              className='w-full border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 py-4 transition-all'
              style={{ transitionDuration: `${SWISS_TIMING.normal}ms` }}
            >
              {/* Swiss spacing: gap-2 (8px) = 8px × 1 ✅ */}
              <Link href={secondaryLink} className='flex items-center justify-center gap-2'>
                {secondaryText}
                <ArrowRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SwissServiceCard;
