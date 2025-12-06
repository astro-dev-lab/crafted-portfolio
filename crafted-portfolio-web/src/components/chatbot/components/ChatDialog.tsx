/**
 * ChatDialog Component
 *
 * Main dialog container with proper flex layout.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * **CRITICAL FIX**: Card uses `flex flex-col` for proper layout.
 *
 * @module chatbot/components/ChatDialog
 */

'use client';

import { memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { QuickReplies } from './QuickReplies';
import { ChatInput } from './ChatInput';
import { chatbotVariants, DIALOG_DIMENSIONS, QUICK_REPLIES } from '../constants';
import type { ChatDialogProps, QuickReply } from '../types';

export const ChatDialog = memo<ChatDialogProps>(function ChatDialog({
  isOpen,
  messages,
  inputValue,
  isTyping,
  onClose,
  onInputChange,
  onSendMessage,
  onQuickReply,
  prefersReducedMotion,
  dialogId,
  labelId,
  inputId,
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [messages, isTyping, prefersReducedMotion]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleQuickReply = (reply: QuickReply) => {
    onQuickReply(reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : chatbotVariants;

  // Show quick replies if only greeting message exists
  const showQuickReplies = messages.length === 1 && messages[0].sender === 'bot';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={dialogId}
          role='dialog'
          aria-modal='true'
          aria-labelledby={labelId}
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='absolute bottom-16 right-0 z-50'
        >
          {/* **CRITICAL FIX**: Card uses `flex flex-col` for proper layout */}
          <Card
            className='flex flex-col overflow-hidden shadow-xl'
            style={{
              width: DIALOG_DIMENSIONS.WIDTH,
              height: DIALOG_DIMENSIONS.HEIGHT,
            }}
          >
            <ChatHeader
              labelId={labelId}
              onClose={onClose}
              prefersReducedMotion={prefersReducedMotion}
            />

            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              prefersReducedMotion={prefersReducedMotion}
              messagesEndRef={messagesEndRef}
            />

            <AnimatePresence>
              {showQuickReplies && (
                <QuickReplies
                  replies={QUICK_REPLIES}
                  onSelect={handleQuickReply}
                  disabled={isTyping}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
            </AnimatePresence>

            <ChatInput
              ref={inputRef}
              value={inputValue}
              onChange={onInputChange}
              onSubmit={onSendMessage}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              inputId={inputId}
            />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ChatDialog.displayName = 'ChatDialog';
