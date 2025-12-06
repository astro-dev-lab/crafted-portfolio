/**
 * QuickReplies Component
 *
 * Quick reply suggestion buttons.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * **CRITICAL**: Uses `shrink-0` to prevent compression.
 *
 * @module chatbot/components/QuickReplies
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SWISS_STAGGER, SWISS_TIMING, SWISS_EASING } from '@/lib/motion';
import type { QuickRepliesProps } from '../types';

const quickReplyContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: SWISS_STAGGER.tight,
      delayChildren: SWISS_TIMING.micro / 1000,
    },
  },
  exit: { opacity: 0 },
};

const quickReplyItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: SWISS_TIMING.fast / 1000,
      ease: SWISS_EASING.default,
    },
  },
};

export const QuickReplies = memo<QuickRepliesProps>(function QuickReplies({
  replies,
  onSelect,
  disabled,
  prefersReducedMotion,
}) {
  const containerVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : quickReplyContainerVariants;

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : quickReplyItemVariants;

  return (
    <motion.div
      className='shrink-0 flex flex-wrap gap-2 px-4 pb-2'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      role='group'
      aria-label='Quick replies'
    >
      {replies.map(reply => (
        <motion.div key={reply.id} variants={itemVariants}>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onSelect(reply)}
            disabled={disabled}
            className='text-xs rounded-full whitespace-nowrap'
          >
            {reply.text}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
});

QuickReplies.displayName = 'QuickReplies';
