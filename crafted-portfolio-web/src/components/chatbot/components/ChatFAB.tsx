/**
 * ChatFAB Component
 *
 * Floating Action Button to toggle chat dialog.
 * Reference: MASTER-STYLE-GUIDE.md §4.3.1
 *
 * FAB Size: S₇ = 56px (7 × 8px)
 *
 * @module chatbot/components/ChatFAB
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fabVariants, FAB_SIZE } from '../constants';
import type { ChatFABProps } from '../types';

export const ChatFAB = memo<ChatFABProps>(function ChatFAB({
  isOpen,
  unreadCount,
  onClick,
  prefersReducedMotion,
  id,
}) {
  const iconVariants = prefersReducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : fabVariants.icon;

  return (
    <Button
      id={id}
      onClick={onClick}
      className='rounded-full shadow-lg relative'
      size='icon'
      style={{ width: FAB_SIZE, height: FAB_SIZE }}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={isOpen}
      aria-haspopup='dialog'
    >
      <motion.div
        key={isOpen ? 'close' : 'open'}
        variants={iconVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        {isOpen ? (
          <X className='h-6 w-6' aria-hidden='true' />
        ) : (
          <MessageSquare className='h-6 w-6' aria-hidden='true' />
        )}
      </motion.div>

      {/* Unread badge */}
      {!isOpen && unreadCount > 0 && (
        <span
          className='absolute -top-1 -right-1 bg-swiss-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'
          aria-label={`${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Button>
  );
});

ChatFAB.displayName = 'ChatFAB';
