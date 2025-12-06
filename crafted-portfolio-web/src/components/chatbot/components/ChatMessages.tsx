/**
 * ChatMessages Component
 *
 * Scrollable container for all messages.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * **CRITICAL FIX**: Uses `flex-1 min-h-0` for proper flex overflow.
 *
 * @module chatbot/components/ChatMessages
 */

'use client';

import { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { ChatMessagesProps } from '../types';

export const ChatMessages = memo<ChatMessagesProps>(function ChatMessages({
  messages,
  isTyping,
  prefersReducedMotion,
  messagesEndRef,
}) {
  return (
    <div
      className='flex-1 min-h-0 overflow-y-auto p-4 space-y-4'
      role='log'
      aria-live='polite'
      aria-label='Chat messages'
    >
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}

      <AnimatePresence>
        <TypingIndicator isVisible={isTyping} prefersReducedMotion={prefersReducedMotion} />
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';
