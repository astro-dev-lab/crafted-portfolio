/**
 * Chatbot Utility Functions
 *
 * Helper functions for message handling, sanitization, and response matching.
 * Reference: CHATBOT-SPECIFIC-INTERACTIONS-FUNCTIONS-HOOKS-HELPER-GUIDES.md §6
 *
 * @module chatbot/utils
 */

import { LIMITS, PREDEFINED_RESPONSES } from '../constants';

// =============================================================================
// ID GENERATION
// =============================================================================

let messageIdCounter = 0;

/**
 * Generates a unique message ID
 * Format: {prefix}_{counter}_{timestamp_base36}
 */
export const generateMessageId = (prefix: string): string =>
  `${prefix}_${++messageIdCounter}_${Date.now().toString(36)}`;

/**
 * Resets the message ID counter (for testing)
 */
export const resetMessageIdCounter = (): void => {
  messageIdCounter = 0;
};

// =============================================================================
// INPUT VALIDATION
// =============================================================================

/**
 * Sanitizes user input
 * - Trims whitespace
 * - Enforces max length
 * - Basic XSS prevention
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .slice(0, LIMITS.MAX_INPUT_LENGTH)
    .replace(/[<>]/g, ''); // Basic XSS prevention
};

/**
 * Validates message before sending
 * @returns true if message is valid
 */
export const isValidMessage = (text: string): boolean => {
  const sanitized = sanitizeInput(text);
  return sanitized.length > 0 && sanitized.length <= LIMITS.MAX_INPUT_LENGTH;
};

// =============================================================================
// RESPONSE MATCHING
// =============================================================================

/**
 * Determines response key based on user input
 * Uses regex for efficient multi-pattern matching
 */
export const getResponseKey = (input: string): string => {
  const lowercaseInput = input.toLowerCase();

  if (/hello|hi|hey/.test(lowercaseInput)) return 'greeting';
  if (/case|study|portfolio|demo/.test(lowercaseInput)) return 'case-studies';
  if (/service|what do you do|offer/.test(lowercaseInput)) return 'services';
  if (/tech|stack|technology|framework/.test(lowercaseInput)) return 'tech-stack';
  if (/work together|collaborate|hire|project/.test(lowercaseInput)) return 'collaboration';

  return 'default';
};

/**
 * Gets bot response text for a given key
 */
export const getBotResponse = (key: string): string => {
  return PREDEFINED_RESPONSES[key] ?? PREDEFINED_RESPONSES['default'];
};

// =============================================================================
// TIMESTAMP FORMATTING
// =============================================================================

/**
 * Formats timestamp for display
 * Returns HH:MM format
 */
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};
