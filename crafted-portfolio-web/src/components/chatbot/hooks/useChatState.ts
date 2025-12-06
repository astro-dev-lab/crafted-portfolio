/**
 * useChatState Hook
 *
 * Central state management for the Chatbot component.
 * Reference: CHATBOT-SPECIFIC-INTERACTIONS-FUNCTIONS-HOOKS-HELPER-GUIDES.md §4
 *
 * @module chatbot/hooks/useChatState
 */

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { SWISS_TIMING } from '@/lib/motion';
import type { ChatMessage, QuickReply, UseChatStateReturn } from '../types';
import { LIMITS, TIME_CONSTANTS, INITIAL_MESSAGE } from '../constants';
import {
  generateMessageId,
  sanitizeInput,
  isValidMessage,
  getResponseKey,
  getBotResponse,
} from '../utils';

/**
 * Custom hook for managing chat state
 *
 * Handles:
 * - Message history with performance limits
 * - Input validation and sanitization
 * - Typing simulation with Swiss timing
 * - Open/close state with unread tracking
 */
export function useChatState(): UseChatStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Scrolls chat to bottom when new messages arrive
   */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Toggles chat open/closed state
   * Reference: CHATBOT-SPECIFIC-INTERACTIONS-FUNCTIONS-HOOKS-HELPER-GUIDES.md §5.3
   */
  const handleToggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        // Opening: reset unread count
        setUnreadCount(0);
      } else {
        // Closing: calculate unread from recent bot messages
        const threshold = Date.now() - TIME_CONSTANTS.UNREAD_THRESHOLD_MS;
        const recentBotMessages = messages.filter(
          m => m.sender === 'bot' && m.timestamp.getTime() > threshold
        ).length;
        setUnreadCount(recentBotMessages);
      }
      return !prev;
    });
  }, [messages]);

  /**
   * Swiss-compliant typing simulation
   * Reference: TIMING-SPECIFIC-GUIDE.md §1 - slow timing (500ms)
   */
  const simulateTyping = useCallback(async (): Promise<void> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, SWISS_TIMING.slow));
    setIsTyping(false);
  }, []);

  /**
   * Sends a message and generates bot response
   * Reference: CHATBOT-SPECIFIC-INTERACTIONS-FUNCTIONS-HOOKS-HELPER-GUIDES.md §5.1
   */
  const handleSendMessage = useCallback(
    async (text: string, isQuickReply = false): Promise<void> => {
      const sanitized = sanitizeInput(text);
      if (!isValidMessage(sanitized)) return;

      const userMessage: ChatMessage = {
        id: generateMessageId('user'),
        text: sanitized,
        sender: 'user',
        timestamp: new Date(),
      };

      // Performance guard: limit message history
      setMessages(prev => {
        const updated = [...prev, userMessage];
        return updated.length > LIMITS.MAX_MESSAGES ? updated.slice(-LIMITS.MAX_MESSAGES) : updated;
      });
      setInputValue('');

      try {
        await simulateTyping();

        const responseKey = isQuickReply ? text : getResponseKey(sanitized);
        const responseText = getBotResponse(responseKey);

        const botMessage: ChatMessage = {
          id: generateMessageId('bot'),
          text: responseText,
          sender: 'bot',
          timestamp: new Date(),
        };

        // Performance guard: limit message history
        setMessages(prev => {
          const updated = [...prev, botMessage];
          return updated.length > LIMITS.MAX_MESSAGES
            ? updated.slice(-LIMITS.MAX_MESSAGES)
            : updated;
        });
      } catch {
        // Add error message to chat
        const errorMessage: ChatMessage = {
          id: generateMessageId('error'),
          text: 'Sorry, something went wrong. Please try again.',
          sender: 'bot',
          timestamp: new Date(),
          error: true,
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }
    },
    [simulateTyping]
  );

  /**
   * Handles form submission
   */
  const handleSendMessageFromInput = useCallback(() => {
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
    }
  }, [inputValue, handleSendMessage]);

  /**
   * Handles quick reply selection
   */
  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      handleSendMessage(reply.value, true);
    },
    [handleSendMessage]
  );

  /**
   * Handles input value changes with length validation
   */
  const handleInputChange = useCallback((value: string) => {
    if (value.length <= LIMITS.MAX_INPUT_LENGTH) {
      setInputValue(value);
    }
  }, []);

  /**
   * Handles closing the chat dialog
   */
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    messages,
    inputValue,
    isTyping,
    isOpen,
    unreadCount,
    handleToggle: handleToggleOpen,
    handleClose,
    handleInputChange,
    handleSendMessage: handleSendMessageFromInput,
    handleQuickReply,
  };
}
