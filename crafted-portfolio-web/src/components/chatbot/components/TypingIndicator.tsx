/**
 * TypingIndicator Component
 *
 * Displays animated dots when bot is typing.
 * Reference: ANIMATION-SPECIFIC-GUIDE.md §2
 *
 * @module chatbot/components/TypingIndicator
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { SWISS_STAGGER, SWISS_TRANSITIONS } from '@/lib/motion';
import { SWISS_SPACING, typingDotVariants } from '../constants';
import type { TypingIndicatorProps } from '../types';

export const TypingIndicator = memo<TypingIndicatorProps>(function TypingIndicator({
  isVisible,
  prefersReducedMotion,
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      className='flex justify-start'
      initial={{ opacity: 0, y: SWISS_SPACING.XS }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -SWISS_SPACING.XS }}
      transition={SWISS_TRANSITIONS.fast}
    >
      <div
        className='bg-swiss-surface rounded-lg p-4'
        role='status'
        aria-label='Assistant is typing'
      >
        <div className='flex gap-2'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-swiss-text-muted rounded-full'
              variants={prefersReducedMotion ? undefined : typingDotVariants}
              animate='bounce'
              transition={{ delay: i * SWISS_STAGGER.normal }}
              aria-hidden='true'
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';
