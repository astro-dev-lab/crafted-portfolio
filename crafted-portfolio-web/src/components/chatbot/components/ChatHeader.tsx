/**
 * ChatHeader Component
 *
 * Displays title, online status, and close button.
 * Reference: COLOR-STYLE-ACCENT-UI-UX.md §2
 *
 * **CRITICAL FIX**: Uses `shrink-0` to prevent flex shrinking.
 *
 * @module chatbot/components/ChatHeader
 */

'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { SWISS_TIMING, SWISS_EASING } from '@/lib/motion';
import type { ChatHeaderProps } from '../types';

export const ChatHeader = memo<ChatHeaderProps>(function ChatHeader({
  onClose,
  prefersReducedMotion,
}) {
  // Get accessible pulse animation
  const pulseAnimation = prefersReducedMotion
    ? undefined
    : {
        opacity: [1, 0.5, 1],
        transition: {
          duration: SWISS_TIMING.hero / 1000,
          ease: SWISS_EASING.easeInOut,
          repeat: Infinity,
        },
      };

  return (
    <CardHeader className="bg-swiss-accent text-white p-4 shrink-0">
      <div className="flex items-center justify-between">
        {/* Left: Avatar and Status */}
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Portfolio Assistant</CardTitle>
            <div
              className="flex items-center gap-2 text-base text-swiss-accent-lighter"
              role="status"
              aria-live="polite"
            >
              <motion.div
                className="w-2 h-2 bg-swiss-success rounded-full"
                animate={pulseAnimation}
                aria-hidden="true"
              />
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Close button - S₄ = 32px */}
        <Button
          variant="ghost"
          onClick={onClose}
          aria-label="Close chat"
          className={cn(
            'w-8 h-8 min-w-[32px] min-h-[32px] p-0',
            'text-white hover:bg-white/20',
            'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0',
            'flex items-center justify-center'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>
    </CardHeader>
  );
});

ChatHeader.displayName = 'ChatHeader';
