/**
 * Chatbot Type Definitions
 *
 * All TypeScript interfaces for the Chatbot module.
 * Reference: COMPONENTS-PRIMITIVES-CHILD-PARTS.md §1
 *
 * @module chatbot/types
 */

// =============================================================================
// CORE TYPES
// =============================================================================

/** Message sender type */
export type MessageSender = 'user' | 'bot';

/** Chat message interface */
export interface ChatMessage {
  readonly id: string;
  readonly text: string;
  readonly sender: MessageSender;
  readonly timestamp: Date;
  readonly typing?: boolean;
  readonly error?: boolean;
}

/** Quick reply option interface */
export interface QuickReply {
  readonly id: string;
  readonly text: string;
  readonly value: string;
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

export interface TypingIndicatorProps {
  readonly isVisible: boolean;
  readonly prefersReducedMotion: boolean;
}

export interface ChatHeaderProps {
  readonly labelId: string;
  readonly onClose: () => void;
  readonly prefersReducedMotion: boolean;
}

export interface MessageBubbleProps {
  readonly message: ChatMessage;
  readonly index: number;
  readonly prefersReducedMotion: boolean;
}

export interface ChatMessagesProps {
  readonly messages: readonly ChatMessage[];
  readonly isTyping: boolean;
  readonly prefersReducedMotion: boolean;
  readonly messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export interface QuickRepliesProps {
  readonly replies: readonly QuickReply[];
  readonly onSelect: (reply: QuickReply) => void;
  readonly disabled?: boolean;
  readonly prefersReducedMotion: boolean;
}

export interface ChatInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSubmit: () => void;
  readonly onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly disabled?: boolean;
  readonly inputId?: string;
}

export interface ChatFABProps {
  readonly id?: string;
  readonly onClick: () => void;
  readonly unreadCount: number;
  readonly isOpen: boolean;
  readonly prefersReducedMotion: boolean;
}

export interface ChatDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly messages: readonly ChatMessage[];
  readonly isTyping: boolean;
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly onSendMessage: () => void;
  readonly onQuickReply: (reply: QuickReply) => void;
  readonly prefersReducedMotion: boolean;
  readonly dialogId: string;
  readonly labelId: string;
  readonly inputId: string;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseChatStateReturn {
  readonly messages: ChatMessage[];
  readonly inputValue: string;
  readonly isTyping: boolean;
  readonly isOpen: boolean;
  readonly unreadCount: number;
  readonly handleToggle: () => void;
  readonly handleClose: () => void;
  readonly handleInputChange: (value: string) => void;
  readonly handleSendMessage: () => void;
  readonly handleQuickReply: (reply: QuickReply) => void;
}
