/**
 * Chatbot Module Public API
 *
 * Exports the main Chatbot component and types for external use.
 *
 * Usage:
 * ```tsx
 * import { Chatbot } from '@/components/chatbot';
 * ```
 *
 * @module chatbot
 */

// Main component
export { Chatbot } from './Chatbot';

// Types for consumers
export type { ChatMessage, QuickReply, MessageSender } from './types';

// Constants for testing/extension
export { DIALOG_DIMENSIONS, FAB_SIZE } from './constants';
