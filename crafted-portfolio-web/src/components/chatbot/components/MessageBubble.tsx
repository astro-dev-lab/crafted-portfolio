/**
 * MessageBubble Component
 *
 * Individual chat message with proper styling.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, §2.2
 *
 * @module chatbot/components/MessageBubble
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { SWISS_STAGGER, getAccessibleVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { messageVariants } from '../constants';
import { formatTimestamp } from '../utils';
import type { MessageBubbleProps } from '../types';

export const MessageBubble = memo<MessageBubbleProps>(function MessageBubble({
  message,
  index,
  prefersReducedMotion,
}) {
  const isUser = message.sender === 'user';
  const bubbleVariants = getAccessibleVariants(messageVariants, prefersReducedMotion);

  return (
    <motion.div
      variants={bubbleVariants}
      initial='hidden'
      animate='visible'
      transition={{ delay: index * SWISS_STAGGER.tight }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-4 text-base',
          isUser
            ? 'bg-swiss-accent text-white'
            : message.error
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-swiss-surface text-swiss-text'
        )}
        role='article'
        aria-label={`Message from ${isUser ? 'you' : 'assistant'}`}
      >
        {message.text}
        <div
          className={cn(
            'text-xs mt-2 opacity-70',
            isUser ? 'text-swiss-accent-lighter' : 'text-swiss-text-muted'
          )}
          aria-label={`Sent at ${formatTimestamp(message.timestamp)}`}
        >
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = 'MessageBubble';
