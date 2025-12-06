'use client';
import { useState, useEffect, useRef, useCallback, memo, useId, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import {
  SWISS_TIMING,
  SWISS_EASING,
  SWISS_STAGGER,
  SWISS_TRANSITIONS,
  useReducedMotion,
  getAccessibleVariants,
} from '@/lib/motion';

/**
 * SWISS DESIGN SYSTEM - Chatbot Component
 *
 * An accessible, animated chat interface following Swiss Design principles.
 *
 * @component
 * @example
 * ```tsx
 * <Chatbot />
 * ```
 *
 * Compliance References:
 * - Spacing: MASTER-STYLE-GUIDE.md §2.1 (8px grid: Sₙ = 8 × n)
 * - Typography: MASTER-STYLE-GUIDE.md §2.2 (1.25 scale: Tₙ = T₀ × 1.25^n)
 * - Colors: COLOR-STYLE-ACCENT-UI-UX.md §2 (Swiss tokens)
 * - Animation: ANIMATION-SPECIFIC-GUIDE.md §1-3 (SWISS_TIMING, SWISS_EASING)
 * - Timing: TIMING-SPECIFIC-GUIDE.md §1 (100ms base unit)
 * - Components: COMPONENTS-PRIMITIVES-CHILD-PARTS.md §3 (Organism level)
 */

// =============================================================================
// SWISS DESIGN CONSTANTS
// Reference: MASTER-STYLE-GUIDE.md §2.1 (8px grid: Sₙ = 8 × n)
// =============================================================================

/** Swiss spacing constants (Sₙ = 8 × n) */
const SWISS_SPACING = {
  /** S₁ = 8px */
  XS: 8,
  /** S₂ = 16px */
  SM: 16,
  /** S₃ = 24px */
  MD: 24,
} as const;

/** Time constants in milliseconds */
const TIME_CONSTANTS = {
  /** Unread message threshold */
  UNREAD_THRESHOLD_MS: 10000,
  /** Debounce delay for scroll */
  SCROLL_DEBOUNCE_MS: 100,
} as const;

/** Performance limits */
const LIMITS = {
  /** Maximum messages to keep in history (prevents memory bloat) */
  MAX_MESSAGES: 100,
  /** Maximum input length */
  MAX_INPUT_LENGTH: 500,
} as const;

/** Keyboard key codes for accessibility */
const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
} as const;

/**
 * Input sanitization helper
 * Prevents XSS and enforces length limits
 */
const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, LIMITS.MAX_INPUT_LENGTH).replace(/[<>]/g, ''); // Basic XSS prevention
};

/**
 * Validates message before sending
 * @returns true if message is valid
 */
const isValidMessage = (text: string): boolean => {
  const sanitized = sanitizeInput(text);
  return sanitized.length > 0 && sanitized.length <= LIMITS.MAX_INPUT_LENGTH;
};

// =============================================================================
// TYPE DEFINITIONS
// Reference: TypeScript strict mode compliance
// =============================================================================

/** Message sender type */
type MessageSender = 'user' | 'bot';

/** Chat message interface */
interface ChatMessage {
  readonly id: string;
  readonly text: string;
  readonly sender: MessageSender;
  readonly timestamp: Date;
  readonly typing?: boolean;
  readonly error?: boolean;
}

/** Quick reply option interface */
interface QuickReply {
  readonly text: string;
  readonly value: string;
}

/** Sub-component props interfaces */
interface TypingIndicatorProps {
  readonly isVisible: boolean;
  readonly prefersReducedMotion: boolean;
}

interface ChatHeaderProps {
  readonly onClose: () => void;
  readonly prefersReducedMotion: boolean;
}

interface MessageBubbleProps {
  readonly message: ChatMessage;
  readonly index: number;
  readonly prefersReducedMotion: boolean;
}

interface ChatMessagesProps {
  readonly messages: ChatMessage[];
  readonly isTyping: boolean;
  readonly prefersReducedMotion: boolean;
  readonly messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

interface QuickRepliesProps {
  readonly replies: readonly QuickReply[];
  readonly onSelect: (reply: QuickReply) => void;
  readonly isVisible: boolean;
}

interface ChatInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly isDisabled: boolean;
}

interface ChatFABProps {
  readonly onClick: () => void;
  readonly unreadCount: number;
  readonly isOpen: boolean;
  readonly prefersReducedMotion: boolean;
}

interface ChatDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly messages: ChatMessage[];
  readonly isTyping: boolean;
  readonly inputValue: string;
  readonly onInputChange: (value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onQuickReply: (reply: QuickReply) => void;
  readonly prefersReducedMotion: boolean;
  readonly messagesEndRef: React.RefObject<HTMLDivElement | null>;
  readonly dialogId: string;
  readonly memoizedQuickReplies: readonly QuickReply[];
}

// =============================================================================
// SWISS ANIMATION VARIANTS
// Reference: ANIMATION-SPECIFIC-GUIDE.md §2
// =============================================================================
const chatbotVariants = {
  closed: {
    scale: 0.95,
    opacity: 0,
    y: 16, // S₂ = 8 × 2
  },
  open: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: SWISS_TIMING.normal / 1000,
      ease: SWISS_EASING.easeOut,
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: 8, // S₁ = 8 × 1
    transition: {
      duration: SWISS_TIMING.fast / 1000,
      ease: SWISS_EASING.easeIn,
    },
  },
};

const fabVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.02, // Swiss-compliant subtle scale (max 2%)
    transition: SWISS_TRANSITIONS.micro,
  },
  tap: {
    scale: 0.98,
    transition: SWISS_TRANSITIONS.micro,
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 8 }, // S₁ = 8 × 1
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SWISS_TIMING.fast / 1000,
      ease: SWISS_EASING.easeOut,
    },
  },
};

const typingDotVariants = {
  bounce: {
    y: [0, -6, 0], // Adjusted for visual rhythm
    transition: {
      duration: SWISS_TIMING.slow / 1000,
      ease: SWISS_EASING.easeInOut,
      repeat: Infinity,
    },
  },
};

// Simple ID generator with timestamp for uniqueness
let messageIdCounter = 0;
const generateMessageId = (prefix: string): string =>
  `${prefix}_${++messageIdCounter}_${Date.now().toString(36)}`;

/**
 * Error Boundary Component
 * Gracefully handles errors in chat sub-components
 * Reference: React Error Boundary pattern
 */
interface ErrorFallbackProps {
  readonly error?: Error;
  readonly onReset?: () => void;
}

const ErrorFallback = memo<ErrorFallbackProps>(function ErrorFallback({ onReset }) {
  return (
    <div
      className='p-4 bg-red-50 border border-red-200 rounded-lg text-center'
      role='alert'
      aria-live='assertive'
    >
      <p className='text-red-800 text-sm mb-2'>Something went wrong with the chat.</p>
      {onReset && (
        <Button variant='outline' size='sm' onClick={onReset} className='text-red-700'>
          Try again
        </Button>
      )}
    </div>
  );
});
ErrorFallback.displayName = 'ErrorFallback';

// =============================================================================
// STATIC DATA
// =============================================================================

/** Quick reply options */
const QUICK_REPLIES: readonly QuickReply[] = [
  { text: 'Show me your case studies', value: 'case-studies' },
  { text: 'What services do you offer?', value: 'services' },
  { text: 'Tell me about your tech stack', value: 'tech-stack' },
  { text: 'How can we work together?', value: 'collaboration' },
] as const;

/** Predefined bot responses */
const PREDEFINED_RESPONSES: Readonly<Record<string, string>> = {
  'case-studies':
    'We have 6 interactive case studies showcasing different industries: SaaS Admin Console, AI Content Operations, E-Commerce Engine, Healthcare Portal, Logistics Command Center, and FinTech Trading Platform. Each demo is fully functional with real interactions. Which one interests you most?',
  services:
    'We offer full-stack development, UI/UX design, system architecture, API development, database design, DevOps setup, and ongoing maintenance. Our expertise spans React, Next.js, Node.js, Python, and cloud platforms. What specific service are you looking for?',
  'tech-stack':
    'Our primary stack includes React/Next.js for frontend, Node.js/Python for backend, PostgreSQL/MongoDB for databases, AWS/Vercel for deployment, and TypeScript throughout. We also use modern tools like Tailwind CSS, Prisma, Docker, and various APIs. Need details on any specific technology?',
  collaboration:
    'We work with startups, SMBs, and enterprises on both project-based and ongoing partnerships. We can start with a discovery call to understand your needs, followed by technical planning, development sprints, and launch support. Ready to discuss your project?',
  greeting:
    'Hello! Thanks for visiting our portfolio. I can help you explore our case studies, learn about our services, or answer any technical questions. What would you like to know?',
  default:
    "That's a great question! Our team specializes in creating custom digital solutions. You can explore our interactive case studies to see our work in action, or feel free to ask me about specific services or technologies. How can I help you today?",
} as const;

/** Initial bot message */
const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial_1',
  text: "Hi! I'm your AI assistant. I can help you learn more about our portfolio, case studies, and services. What would you like to know?",
  sender: 'bot',
  timestamp: new Date(),
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Typing Indicator Component
 * Displays animated dots when bot is typing
 * Reference: ANIMATION-SPECIFIC-GUIDE.md §2
 */
const TypingIndicator = memo<TypingIndicatorProps>(function TypingIndicator({
  isVisible,
  prefersReducedMotion,
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      className='flex justify-start'
      initial={{ opacity: 0, y: SWISS_SPACING.XS }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -SWISS_SPACING.XS }}
      transition={SWISS_TRANSITIONS.fast}
    >
      <div
        className='bg-swiss-surface rounded-lg p-4'
        role='status'
        aria-label='Assistant is typing'
      >
        <div className='flex gap-2'>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className='w-2 h-2 bg-swiss-text-muted rounded-full'
              variants={prefersReducedMotion ? undefined : typingDotVariants}
              animate='bounce'
              transition={{ delay: i * SWISS_STAGGER.normal }}
              aria-hidden='true'
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});
TypingIndicator.displayName = 'TypingIndicator';

/**
 * Message Bubble Component
 * Individual chat message with proper styling
 * Reference: MASTER-STYLE-GUIDE.md §2.1, §2.2
 */
const MessageBubble = memo<MessageBubbleProps>(function MessageBubble({
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
          isUser ? 'bg-swiss-accent text-white' : 'bg-swiss-surface text-swiss-text'
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
          aria-label={`Sent at ${message.timestamp.toLocaleTimeString()}`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </motion.div>
  );
});
MessageBubble.displayName = 'MessageBubble';

/**
 * Chat Header Component
 * Displays title, online status, and close button
 * Reference: COLOR-STYLE-ACCENT-UI-UX.md §2
 */
const ChatHeader = memo<ChatHeaderProps>(function ChatHeader({ onClose, prefersReducedMotion }) {
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
    <CardHeader className='bg-swiss-accent text-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div
            className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'
            aria-hidden='true'
          >
            <span className='text-sm'>🤖</span>
          </div>
          <div>
            <CardTitle className='text-xl font-semibold'>Portfolio Assistant</CardTitle>
            <div
              className='flex items-center gap-2 text-base text-swiss-accent-lighter'
              role='status'
              aria-live='polite'
            >
              <motion.div
                className='w-2 h-2 bg-swiss-success rounded-full'
                animate={pulseAnimation}
                aria-hidden='true'
              />
              <span>Online</span>
            </div>
          </div>
        </div>
        {/* Close button - Swiss Design Compliant with SVG icon */}
        <Button
          variant='ghost'
          onClick={onClose}
          aria-label='Close chat'
          className={cn(
            'w-8 h-8 min-w-[32px] min-h-[32px] p-0',
            'text-white hover:bg-white/20',
            'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0',
            'flex items-center justify-center'
          )}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
            className='shrink-0'
          >
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </Button>
      </div>
    </CardHeader>
  );
});
ChatHeader.displayName = 'ChatHeader';

/**
 * Chat Messages Container
 * Scrollable container for all messages
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 */
const ChatMessages = memo<ChatMessagesProps>(function ChatMessages({
  messages,
  isTyping,
  prefersReducedMotion,
  messagesEndRef,
}) {
  return (
    <div
      className='flex-1 overflow-y-auto p-4 space-y-4'
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

/**
 * Quick Replies Component
 * Displays suggested quick reply buttons
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 */
const QuickRepliesSection = memo<QuickRepliesProps>(function QuickRepliesSection({
  replies,
  onSelect,
  isVisible,
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      className='px-4 pb-2'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={SWISS_TRANSITIONS.fast}
    >
      <div className='text-xs text-swiss-text-muted mb-2' id='quick-replies-label'>
        Quick questions:
      </div>
      <div className='flex flex-wrap gap-2' role='group' aria-labelledby='quick-replies-label'>
        {replies.map((reply, index) => (
          <motion.div
            key={reply.value}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              ...SWISS_TRANSITIONS.fast,
              delay: index * SWISS_STAGGER.tight,
            }}
          >
            <Button
              variant='outline'
              size='sm'
              className='text-xs h-8'
              onClick={() => onSelect(reply)}
            >
              {reply.text}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});
QuickRepliesSection.displayName = 'QuickRepliesSection';

/**
 * Chat Input Form Component
 * Message input with submit button
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 */
const ChatInputForm = memo<ChatInputProps>(function ChatInputForm({
  value,
  onChange,
  onSubmit,
  isDisabled,
}) {
  return (
    <div className='border-t border-swiss-border p-4'>
      <form onSubmit={onSubmit} className='flex gap-2' aria-label='Send a message'>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder='Ask me anything...'
          className='flex-1'
          disabled={isDisabled}
          aria-label='Message input'
          aria-describedby={isDisabled ? 'typing-status' : undefined}
        />
        {isDisabled && (
          <span id='typing-status' className='sr-only'>
            Please wait, assistant is typing a response
          </span>
        )}
        <Button
          type='submit'
          disabled={!value.trim() || isDisabled}
          className='px-4'
          aria-label='Send message'
        >
          <span className='text-xl' aria-hidden='true'>
            →
          </span>
        </Button>
      </form>
    </div>
  );
});
ChatInputForm.displayName = 'ChatInputForm';

/**
 * Floating Action Button Component
 * Chat toggle button when chat is closed
 * Reference: MASTER-STYLE-GUIDE.md §2.1, ANIMATION-SPECIFIC-GUIDE.md §2
 */
const ChatFAB = memo<ChatFABProps>(function ChatFAB({
  onClick,
  unreadCount,
  isOpen,
  prefersReducedMotion,
}) {
  return (
    <div className='fixed bottom-6 right-6 z-50' role='region' aria-label='Chat assistant'>
      <motion.div
        variants={prefersReducedMotion ? undefined : fabVariants}
        initial='idle'
        whileHover='hover'
        whileTap='tap'
      >
        <Button
          onClick={onClick}
          aria-label='Open chat assistant'
          aria-expanded={isOpen}
          aria-controls='chatbot-dialog'
          className={cn(
            'relative w-14 h-14 rounded-full',
            'bg-swiss-accent hover:bg-swiss-accent-dark',
            'shadow-swiss-elevated hover:shadow-swiss-floating',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-swiss-accent focus-visible:ring-offset-2'
          )}
        >
          <span className='text-xl' aria-hidden='true'>
            💬
          </span>
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              aria-label={`${unreadCount} unread messages`}
              className={cn(
                'absolute -top-2 -right-2',
                'w-6 h-6 rounded-full',
                'flex items-center justify-center',
                'text-xs'
              )}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </motion.div>
    </div>
  );
});
ChatFAB.displayName = 'ChatFAB';

/**
 * Chat Dialog Component
 * Full chat interface with focus trap and keyboard navigation
 * Reference: ANIMATION-SPECIFIC-GUIDE.md §2, WCAG 2.1 Focus Management
 */
const ChatDialog = memo<ChatDialogProps>(function ChatDialog({
  isOpen,
  onClose,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSubmit,
  onQuickReply,
  prefersReducedMotion,
  messagesEndRef,
  dialogId,
  memoizedQuickReplies,
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus trap: Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Delay focus to allow animation to complete
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, SWISS_TIMING.normal);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard handler: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.ESCAPE && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Get accessible variants based on reduced motion preference
  const dialogVariants = getAccessibleVariants(chatbotVariants, prefersReducedMotion);

  return (
    <div
      ref={dialogRef}
      className='fixed bottom-6 right-6 z-50'
      role='region'
      aria-label='Chat assistant'
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key='chatbot-dialog'
          variants={dialogVariants}
          initial='closed'
          animate='open'
          exit='exit'
        >
          <Card
            id={dialogId}
            role='dialog'
            aria-modal='true'
            aria-labelledby={`${dialogId}-title`}
            aria-describedby={`${dialogId}-description`}
            className={cn('w-96 h-[504px]', 'shadow-swiss-floating border-0 overflow-hidden')}
          >
            <ChatHeader onClose={onClose} prefersReducedMotion={prefersReducedMotion} />

            <CardContent className='p-0 flex flex-col h-full'>
              <p id={`${dialogId}-description`} className='sr-only'>
                Interactive chat assistant to help you explore our portfolio, case studies, and
                services. Press Escape to close.
              </p>

              <ChatMessages
                messages={messages}
                isTyping={isTyping}
                prefersReducedMotion={prefersReducedMotion}
                messagesEndRef={messagesEndRef}
              />

              <AnimatePresence>
                <QuickRepliesSection
                  replies={memoizedQuickReplies}
                  onSelect={onQuickReply}
                  isVisible={messages.length <= 2}
                />
              </AnimatePresence>

              <ChatInputFormEnhanced
                value={inputValue}
                onChange={onInputChange}
                onSubmit={onSubmit}
                isDisabled={isTyping}
                inputRef={inputRef}
              />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
ChatDialog.displayName = 'ChatDialog';

/**
 * Enhanced Chat Input Form with ref forwarding
 * Reference: WCAG 2.1 Focus Management
 */
interface ChatInputFormEnhancedProps extends ChatInputProps {
  readonly inputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatInputFormEnhanced = memo<ChatInputFormEnhancedProps>(function ChatInputFormEnhanced({
  value,
  onChange,
  onSubmit,
  isDisabled,
  inputRef,
}) {
  return (
    <div className='border-t border-swiss-border p-4'>
      <form onSubmit={onSubmit} className='flex gap-2' aria-label='Send a message'>
        <Input
          ref={inputRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder='Ask me anything...'
          className='flex-1'
          disabled={isDisabled}
          aria-label='Message input'
          aria-describedby={isDisabled ? 'typing-status-enhanced' : undefined}
        />
        {isDisabled && (
          <span id='typing-status-enhanced' className='sr-only'>
            Please wait, assistant is typing a response
          </span>
        )}
        <Button
          type='submit'
          disabled={!value.trim() || isDisabled}
          className='px-4'
          aria-label='Send message'
        >
          <span className='text-xl' aria-hidden='true'>
            →
          </span>
        </Button>
      </form>
    </div>
  );
});
ChatInputFormEnhanced.displayName = 'ChatInputFormEnhanced';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function Chatbot() {
  const dialogId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize quick replies to prevent unnecessary re-renders
  const memoizedQuickReplies = useMemo(() => QUICK_REPLIES, []);

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
   * Updates unread count accordingly
   */
  const handleToggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        setUnreadCount(0);
      } else {
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
   * Determines response key based on user input
   */
  const getResponseKey = useCallback((input: string): string => {
    const lowercaseInput = input.toLowerCase();

    if (/hello|hi|hey/.test(lowercaseInput)) return 'greeting';
    if (/case|study|portfolio|demo/.test(lowercaseInput)) return 'case-studies';
    if (/service|what do you do|offer/.test(lowercaseInput)) return 'services';
    if (/tech|stack|technology|framework/.test(lowercaseInput)) return 'tech-stack';
    if (/work together|collaborate|hire|project/.test(lowercaseInput)) return 'collaboration';

    return 'default';
  }, []);

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
   * Includes input validation and performance guards
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
        const responseText = PREDEFINED_RESPONSES[responseKey] ?? PREDEFINED_RESPONSES['default'];

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
    [getResponseKey, simulateTyping]
  );

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSendMessage(inputValue);
    },
    [inputValue, handleSendMessage]
  );

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
    // Enforce max length
    if (value.length <= LIMITS.MAX_INPUT_LENGTH) {
      setInputValue(value);
    }
  }, []);

  // Render FAB when closed
  if (!isOpen) {
    return (
      <ChatFAB
        onClick={handleToggleOpen}
        unreadCount={unreadCount}
        isOpen={isOpen}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  // Render full chat dialog when open
  return (
    <ChatDialog
      isOpen={isOpen}
      onClose={handleToggleOpen}
      messages={messages}
      isTyping={isTyping}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onQuickReply={handleQuickReply}
      prefersReducedMotion={prefersReducedMotion}
      messagesEndRef={messagesEndRef}
      dialogId={dialogId}
      memoizedQuickReplies={memoizedQuickReplies}
    />
  );
}

Chatbot.displayName = 'Chatbot';
