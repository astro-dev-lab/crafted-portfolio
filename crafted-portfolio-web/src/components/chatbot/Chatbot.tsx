/**
 * Chatbot Component
 *
 * Main orchestrator component that composes all chatbot sub-components.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * This file is intentionally minimal (~70 lines) as all logic
 * is delegated to specialized hooks and components.
 *
 * @module chatbot/Chatbot
 */

'use client';

import { memo, useId } from 'react';
import { useChatState } from './hooks/useChatState';
import { ChatFAB, ChatDialog } from './components';
import { useReducedMotion } from '@/lib/motion';

export const Chatbot = memo(function Chatbot() {
  // Generate unique IDs for accessibility
  const baseId = useId();
  const dialogId = `${baseId}-dialog`;
  const labelId = `${baseId}-label`;
  const inputId = `${baseId}-input`;
  const fabId = `${baseId}-fab`;

  // Respect reduced motion preferences
  const prefersReducedMotion = useReducedMotion();

  // All state and handlers from custom hook
  const {
    messages,
    inputValue,
    isTyping,
    isOpen,
    unreadCount,
    handleToggle,
    handleClose,
    handleInputChange,
    handleSendMessage,
    handleQuickReply,
  } = useChatState();

  return (
    <div className='fixed bottom-6 right-6 z-50' role='region' aria-label='Chat assistant'>
      <ChatDialog
        isOpen={isOpen}
        messages={messages}
        inputValue={inputValue}
        isTyping={isTyping}
        onClose={handleClose}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onQuickReply={handleQuickReply}
        prefersReducedMotion={prefersReducedMotion}
        dialogId={dialogId}
        labelId={labelId}
        inputId={inputId}
      />

      <ChatFAB
        id={fabId}
        isOpen={isOpen}
        unreadCount={unreadCount}
        onClick={handleToggle}
        prefersReducedMotion={prefersReducedMotion}
      />
    </div>
  );
});

Chatbot.displayName = 'Chatbot';
