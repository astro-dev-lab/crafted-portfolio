# 💬 CHATBOT-SPECIFIC INTERACTIONS, FUNCTIONS, HOOKS & HELPER GUIDES
## Swiss Precision Behavioral Design System for Chat Interfaces

> *"A chatbot is not just UI—it's a conversation engine. Every hook orchestrates state, every function calculates response, every helper validates trust."*

---

## Table of Contents

1. [Behavioral Philosophy](#1-behavioral-philosophy)
2. [Swiss Interaction Mathematics](#2-swiss-interaction-mathematics)
3. [State Machine Architecture](#3-state-machine-architecture)
4. [Hook Specifications](#4-hook-specifications)
5. [Function Contracts](#5-function-contracts)
6. [Helper Utilities](#6-helper-utilities)
7. [Timing Orchestration](#7-timing-orchestration)
8. [Error Handling Patterns](#8-error-handling-patterns)
9. [Performance Optimization](#9-performance-optimization)
10. [Accessibility Behavior](#10-accessibility-behavior)

---

## 1. Behavioral Philosophy

### 1.1 The Conversational State Machine

Unlike static components, a chatbot is a **state machine** with well-defined transitions. Swiss Design demands that every state change is:

```
┌─────────────────────────────────────────────────────────────┐
│                 CHATBOT STATE PRINCIPLES                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRINCIPLE 1: PREDICTABILITY                                │
│  ─────────────────────────                                  │
│  User input → Validation → Processing → Response            │
│  Each step has defined timing and feedback                  │
│                                                              │
│  PRINCIPLE 2: RESPONSIVENESS                                │
│  ─────────────────────────────                              │
│  User actions receive immediate acknowledgment              │
│  Typing indicator within 100ms of message send              │
│  Response within 500ms-2000ms (simulate real AI)            │
│                                                              │
│  PRINCIPLE 3: GRACEFUL DEGRADATION                          │
│  ─────────────────────────────                              │
│  Errors produce helpful messages, not crashes               │
│  Offline states are communicated clearly                    │
│  Rate limits are handled with queuing                       │
│                                                              │
│  PRINCIPLE 4: MEMORY & CONTEXT                              │
│  ─────────────────────────────                              │
│  Conversations persist across page navigation               │
│  Recent context informs response relevance                  │
│  Message history has defined limits (100 max)               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Behavioral Hierarchy

```
CHATBOT BEHAVIOR LAYERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Layer 1: CORE STATE (Required)
  └── isOpen, messages[], inputValue, isTyping
  └── These MUST exist for basic functionality

Layer 2: INTERACTION FEEDBACK (Required)
  └── Focus management, keyboard navigation, scroll behavior
  └── Critical for accessibility and UX

Layer 3: OPTIMIZATION (Recommended)
  └── Memoization, debouncing, virtualization
  └── Improves performance at scale

Layer 4: PERSISTENCE (Optional)
  └── localStorage, sessionStorage, server sync
  └── Enables conversation continuity
```

---

## 2. Swiss Interaction Mathematics

### 2.1 Response Timing Formula

```
RESPONSE TIMING CALCULATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formula: T_response = T_base + (L_message × T_per_char)

Where:
  T_base     = 500ms  (minimum "thinking" time)
  T_per_char = 10ms   (per character of response)
  L_message  = length of bot response

Examples:
  Short response (50 chars):  500 + (50 × 10)  = 1000ms
  Medium response (150 chars): 500 + (150 × 10) = 2000ms
  Long response (300 chars):  500 + (300 × 10) = 3500ms

Cap: T_max = 3000ms (never exceed 3 seconds for UX)

Final Formula:
  T_response = min(T_base + (L_message × T_per_char), T_max)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.2 Scroll Behavior Mathematics

```typescript
/**
 * Swiss Scroll-to-Bottom Calculation
 * 
 * Formula: scroll_delay = T_animation + T_buffer
 * 
 * Where:
 *   T_animation = 300ms (SWISS_TIMING.normal)
 *   T_buffer    = 50ms  (ensure DOM update complete)
 */
const SCROLL_DELAY = SWISS_TIMING.normal + 50; // 350ms

/**
 * Smooth scroll behavior respects reduced motion
 */
const getScrollBehavior = (prefersReduced: boolean): ScrollBehavior => 
  prefersReduced ? 'auto' : 'smooth';
```

### 2.3 Message History Limits

```
MESSAGE HISTORY MATHEMATICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance Considerations:
  - DOM nodes grow linearly: O(n)
  - Memory: ~2KB per message average
  - Re-render cost increases with n

Swiss Limit Calculation:
  Max memory budget: 200KB
  Per message avg:   2KB
  MAX_MESSAGES = 200KB / 2KB = 100 messages

Pruning Strategy:
  When messages.length > MAX_MESSAGES:
    messages = messages.slice(-MAX_MESSAGES)
  
  This preserves recent context while bounding memory.
```

### 2.4 Input Validation Mathematics

```
INPUT VALIDATION FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Character Limits:
  MIN_INPUT_LENGTH = 1    (non-empty)
  MAX_INPUT_LENGTH = 500  (prevent abuse)

Sanitization Steps (order matters):
  1. Trim whitespace
  2. Enforce length limit
  3. Remove dangerous characters

Formula: isValid = len(sanitize(input)) ∈ [MIN, MAX]

const sanitizeInput = (input: string): string => {
  return input
    .trim()                              // Step 1
    .slice(0, MAX_INPUT_LENGTH)          // Step 2
    .replace(/[<>]/g, '');               // Step 3
};
```

---

## 3. State Machine Architecture

### 3.1 Chatbot State Diagram

```
                    ┌─────────────┐
                    │   CLOSED    │
                    │  (Initial)  │
                    └──────┬──────┘
                           │ toggleOpen()
                           ▼
                    ┌─────────────┐
            ┌──────►│    OPEN     │◄──────┐
            │       │   (Idle)    │       │
            │       └──────┬──────┘       │
            │              │              │
            │    sendMessage()       closeDialog()
            │              │              │
            │              ▼              │
            │       ┌─────────────┐       │
            │       │   SENDING   │       │
            │       │  (User msg) │       │
            │       └──────┬──────┘       │
            │              │              │
            │     setIsTyping(true)       │
            │              │              │
            │              ▼              │
            │       ┌─────────────┐       │
            │       │   TYPING    │       │
            │       │ (Bot think) │       │
            │       └──────┬──────┘       │
            │              │              │
            │    simulateTyping() complete│
            │              │              │
            │              ▼              │
            │       ┌─────────────┐       │
            └───────│  RECEIVED   │───────┘
                    │  (Bot msg)  │
                    └─────────────┘
```

### 3.2 State Type Definitions

```typescript
/**
 * Chatbot State Machine Types
 */
type ChatbotState = 'closed' | 'open' | 'sending' | 'typing' | 'received' | 'error';

interface ChatbotStateContext {
  readonly isOpen: boolean;
  readonly messages: readonly ChatMessage[];
  readonly inputValue: string;
  readonly isTyping: boolean;
  readonly unreadCount: number;
  readonly error: Error | null;
}

/**
 * State transition guards
 */
const canSendMessage = (ctx: ChatbotStateContext): boolean => 
  ctx.isOpen && !ctx.isTyping && ctx.inputValue.trim().length > 0;

const canClose = (ctx: ChatbotStateContext): boolean => 
  ctx.isOpen && !ctx.isTyping;
```

---

## 4. Hook Specifications

### 4.1 useChatState Hook

```typescript
/**
 * Core chat state management hook
 * 
 * @returns ChatbotStateContext with state and actions
 * 
 * Swiss Timing Compliance:
 * - State changes trigger within SWISS_TIMING.micro (100ms)
 * - Animations respect useReducedMotion
 */
interface UseChatStateReturn {
  // State
  readonly isOpen: boolean;
  readonly messages: readonly ChatMessage[];
  readonly inputValue: string;
  readonly isTyping: boolean;
  readonly unreadCount: number;
  
  // Actions
  readonly toggleOpen: () => void;
  readonly sendMessage: (text: string) => Promise<void>;
  readonly setInputValue: (value: string) => void;
  readonly clearHistory: () => void;
}

/**
 * Implementation Requirements:
 * 
 * 1. Use useState for each state slice
 * 2. Use useCallback for all actions (stable references)
 * 3. Use useRef for mutable values (messagesEndRef)
 * 4. Use useEffect for side effects (scroll, focus)
 */
```

### 4.2 useFocusTrap Hook

```typescript
/**
 * Focus trap hook for modal dialogs
 * 
 * Swiss Accessibility Compliance:
 * - Focus moves to input on open (after animation)
 * - Focus returns to FAB on close
 * - Tab cycles within dialog
 * - Escape closes dialog
 * 
 * @param isOpen - Dialog open state
 * @param onClose - Close handler
 * @returns Object with refs for dialog and focusable elements
 */
interface UseFocusTrapReturn {
  readonly dialogRef: React.RefObject<HTMLDivElement>;
  readonly firstFocusableRef: React.RefObject<HTMLElement>;
  readonly lastFocusableRef: React.RefObject<HTMLElement>;
}

function useFocusTrap(
  isOpen: boolean, 
  onClose: () => void
): UseFocusTrapReturn {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus first focusable after animation
      const timer = setTimeout(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'input, button, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, SWISS_TIMING.normal);
      
      return () => clearTimeout(timer);
    } else {
      // Restore focus on close
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      // Tab trap logic here
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return { dialogRef, firstFocusableRef: dialogRef, lastFocusableRef: dialogRef };
}
```

### 4.3 useScrollToBottom Hook

```typescript
/**
 * Scroll management hook for chat messages
 * 
 * Swiss Timing: Scroll triggers after SWISS_TIMING.normal (300ms)
 * to ensure new message DOM has rendered
 * 
 * @param messages - Current message array
 * @param prefersReducedMotion - From useReducedMotion hook
 * @returns Ref to attach to scroll anchor element
 */
function useScrollToBottom(
  messages: readonly ChatMessage[],
  prefersReducedMotion: boolean
): React.RefObject<HTMLDivElement> {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip scroll on initial mount (prevents jump)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounced scroll after DOM update
    const timer = setTimeout(() => {
      scrollRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'end',
      });
    }, TIME_CONSTANTS.SCROLL_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [messages, prefersReducedMotion]);

  return scrollRef;
}
```

### 4.4 useTypingSimulation Hook

```typescript
/**
 * Typing indicator simulation hook
 * 
 * Swiss Timing Calculation:
 *   T_typing = min(T_base + L_response × T_per_char, T_max)
 * 
 * @param responseLength - Length of upcoming response
 * @returns Object with isTyping state and simulate function
 */
interface UseTypingSimulationReturn {
  readonly isTyping: boolean;
  readonly simulateTyping: (responseLength: number) => Promise<void>;
}

function useTypingSimulation(): UseTypingSimulationReturn {
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = useCallback(async (responseLength: number): Promise<void> => {
    const T_BASE = SWISS_TIMING.slow;           // 500ms
    const T_PER_CHAR = 10;                       // 10ms per character
    const T_MAX = 3000;                          // 3 second cap

    const duration = Math.min(
      T_BASE + responseLength * T_PER_CHAR,
      T_MAX
    );

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  }, []);

  return { isTyping, simulateTyping };
}
```

---

## 5. Function Contracts

### 5.1 Message Sending Contract

```typescript
/**
 * Send Message Function Contract
 * 
 * Preconditions:
 *   - isOpen === true
 *   - isTyping === false
 *   - isValidMessage(text) === true
 * 
 * Postconditions:
 *   - New user message added to messages[]
 *   - inputValue cleared to ''
 *   - isTyping set to true during processing
 *   - New bot message added after typing simulation
 *   - Scroll triggered to bottom
 * 
 * Invariants:
 *   - messages.length <= MAX_MESSAGES
 *   - All messages have unique IDs
 *   - Timestamps are monotonically increasing
 * 
 * Error Handling:
 *   - On error: Add error message to chat
 *   - Never throw to caller
 *   - Log error for debugging
 */
async function handleSendMessage(
  text: string, 
  isQuickReply: boolean = false
): Promise<void> {
  // Precondition checks
  const sanitized = sanitizeInput(text);
  if (!isValidMessage(sanitized)) return;

  // Create user message
  const userMessage: ChatMessage = {
    id: generateMessageId('user'),
    text: sanitized,
    sender: 'user',
    timestamp: new Date(),
  };

  // Update state (with history limit)
  setMessages(prev => {
    const updated = [...prev, userMessage];
    return updated.length > LIMITS.MAX_MESSAGES 
      ? updated.slice(-LIMITS.MAX_MESSAGES) 
      : updated;
  });
  setInputValue('');

  try {
    // Simulate typing
    await simulateTyping();

    // Generate response
    const responseKey = isQuickReply ? text : getResponseKey(sanitized);
    const responseText = PREDEFINED_RESPONSES[responseKey] ?? PREDEFINED_RESPONSES['default'];

    // Create bot message
    const botMessage: ChatMessage = {
      id: generateMessageId('bot'),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };

    // Update state (with history limit)
    setMessages(prev => {
      const updated = [...prev, botMessage];
      return updated.length > LIMITS.MAX_MESSAGES 
        ? updated.slice(-LIMITS.MAX_MESSAGES) 
        : updated;
    });
  } catch (error) {
    // Error handling: add error message to chat
    const errorMessage: ChatMessage = {
      id: generateMessageId('error'),
      text: 'Sorry, something went wrong. Please try again.',
      sender: 'bot',
      timestamp: new Date(),
      error: true,
    };
    setMessages(prev => [...prev, errorMessage]);
    setIsTyping(false);
    console.error('Chatbot error:', error);
  }
}
```

### 5.2 Response Key Matching Contract

```typescript
/**
 * Response Key Matching Function Contract
 * 
 * Purpose: Map user input to predefined response category
 * 
 * Algorithm: Keyword-based regex matching with priority order
 * 
 * Priority (first match wins):
 *   1. Greeting patterns (hello, hi, hey)
 *   2. Case study patterns (case, study, portfolio, demo)
 *   3. Service patterns (service, offer, what do you do)
 *   4. Tech stack patterns (tech, stack, technology, framework)
 *   5. Collaboration patterns (work together, collaborate, hire, project)
 *   6. Default (catch-all)
 * 
 * @param input - User input text (already sanitized)
 * @returns Response key string
 */
function getResponseKey(input: string): string {
  const lowercaseInput = input.toLowerCase();

  // Priority-ordered pattern matching
  const patterns: Array<{ pattern: RegExp; key: string }> = [
    { pattern: /\b(hello|hi|hey|greetings?)\b/, key: 'greeting' },
    { pattern: /\b(case|study|studies|portfolio|demo)\b/, key: 'case-studies' },
    { pattern: /\b(service|offer|what do you do)\b/, key: 'services' },
    { pattern: /\b(tech|stack|technology|framework|tools?)\b/, key: 'tech-stack' },
    { pattern: /\b(work together|collaborate|hire|project|partner)\b/, key: 'collaboration' },
  ];

  for (const { pattern, key } of patterns) {
    if (pattern.test(lowercaseInput)) {
      return key;
    }
  }

  return 'default';
}
```

### 5.3 Toggle Open Contract

```typescript
/**
 * Toggle Open Function Contract
 * 
 * Behavior:
 *   - If closed: Open dialog, reset unread count
 *   - If open: Close dialog, calculate unread count
 * 
 * Unread Count Calculation:
 *   Count bot messages from last 10 seconds
 * 
 * Side Effects:
 *   - Focus management (handled by useFocusTrap)
 *   - Scroll to bottom (handled by useScrollToBottom)
 */
const handleToggleOpen = useCallback(() => {
  setIsOpen(prev => {
    if (!prev) {
      // Opening: reset unread
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
```

---

## 6. Helper Utilities

### 6.1 Message ID Generator

```typescript
/**
 * Generate unique message IDs
 * 
 * Format: {prefix}_{counter}_{timestamp_base36}
 * 
 * Guarantees:
 *   - Globally unique within session
 *   - Sortable by creation order
 *   - Compact representation
 * 
 * @param prefix - Message type prefix ('user', 'bot', 'error')
 * @returns Unique message ID string
 */
let messageIdCounter = 0;

function generateMessageId(prefix: string): string {
  return `${prefix}_${++messageIdCounter}_${Date.now().toString(36)}`;
}

// Examples:
// generateMessageId('user') → 'user_1_m2abc123'
// generateMessageId('bot')  → 'bot_2_m2abc124'
```

### 6.2 Input Sanitizer

```typescript
/**
 * Sanitize user input for safety and consistency
 * 
 * Steps:
 *   1. Trim leading/trailing whitespace
 *   2. Enforce maximum length
 *   3. Remove potentially dangerous characters
 * 
 * Security: Prevents basic XSS via angle bracket removal
 * Note: Server-side sanitization is still required
 * 
 * @param input - Raw user input
 * @returns Sanitized string
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, LIMITS.MAX_INPUT_LENGTH)
    .replace(/[<>]/g, '');
}

/**
 * Validate message before sending
 * 
 * @param text - Input text to validate
 * @returns Boolean indicating validity
 */
function isValidMessage(text: string): boolean {
  const sanitized = sanitizeInput(text);
  return sanitized.length > 0 && sanitized.length <= LIMITS.MAX_INPUT_LENGTH;
}
```

### 6.3 Timestamp Formatter

```typescript
/**
 * Format timestamp for display in chat bubbles
 * 
 * Swiss Precision: Always show hours and minutes
 * Locale-aware for internationalization
 * 
 * @param date - Message timestamp
 * @returns Formatted time string (e.g., "2:45 PM")
 */
function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

---

## 7. Timing Orchestration

### 7.1 Animation Sequence Timeline

```
CHATBOT OPEN ANIMATION SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time (ms)   Event                           Duration
────────────────────────────────────────────────────
0           User clicks FAB                  -
0-300       Dialog scale/fade animation      300ms (SWISS_TIMING.normal)
300-350     DOM stabilization                50ms buffer
350         Focus moves to input             instant
350+        Ready for user input             -

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHATBOT CLOSE ANIMATION SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time (ms)   Event                           Duration
────────────────────────────────────────────────────
0           User presses Escape/close        -
0-200       Dialog exit animation            200ms (SWISS_TIMING.fast)
200         Focus returns to FAB             instant
200         Dialog removed from DOM          -

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7.2 Message Send Timeline

```
MESSAGE SEND ANIMATION SEQUENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time (ms)   Event                           Duration
────────────────────────────────────────────────────
0           User submits message             -
0-50        Input clears, user msg appears   50ms (SWISS_STAGGER.tight)
50-100      User message animates in         50ms
100         Typing indicator appears         instant
100-1500    Bot "typing" simulation          500-3000ms (calculated)
1500        Typing indicator fades           100ms (SWISS_TIMING.micro)
1500-1600   Bot message animates in          100ms
1600-1700   Scroll to bottom                 100ms (debounced)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 7.3 Typing Indicator Timing

```typescript
/**
 * Typing Indicator Timing Constants
 */
const TYPING_TIMING = {
  /** Minimum display time */
  MIN_DURATION: SWISS_TIMING.slow,  // 500ms
  
  /** Time per character of response */
  PER_CHAR: 10,  // 10ms
  
  /** Maximum display time */
  MAX_DURATION: 3000,  // 3 seconds
  
  /** Dot animation stagger */
  DOT_STAGGER: SWISS_STAGGER.normal,  // 0.08s = 80ms
  
  /** Dot bounce cycle */
  DOT_CYCLE: SWISS_TIMING.slow,  // 500ms full cycle
} as const;

/**
 * Calculate typing duration based on response length
 */
function calculateTypingDuration(responseLength: number): number {
  return Math.min(
    TYPING_TIMING.MIN_DURATION + responseLength * TYPING_TIMING.PER_CHAR,
    TYPING_TIMING.MAX_DURATION
  );
}
```

---

## 8. Error Handling Patterns

### 8.1 Error State Flow

```
ERROR HANDLING FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│                      ERROR SOURCES                           │
├─────────────────────────────────────────────────────────────┤
│  1. Network failures    → Display retry message             │
│  2. Rate limiting       → Display wait message with timer   │
│  3. Invalid response    → Display generic error             │
│  4. Timeout             → Display timeout message           │
│  5. Server error        → Display maintenance message       │
└─────────────────────────────────────────────────────────────┘

                    ▼ Error Caught ▼

┌─────────────────────────────────────────────────────────────┐
│                   ERROR HANDLING STEPS                       │
├─────────────────────────────────────────────────────────────┤
│  1. Set isTyping = false                                    │
│  2. Create error ChatMessage                                │
│  3. Add to messages[] with error: true flag                 │
│  4. Log error to console (dev) / analytics (prod)          │
│  5. Display error styling on message bubble                 │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Error Message Types

```typescript
/**
 * Error message factory functions
 */
const ERROR_MESSAGES = {
  network: "I'm having trouble connecting. Please check your internet and try again.",
  rateLimit: "You're sending messages too quickly. Please wait a moment.",
  timeout: "That took too long to process. Please try again.",
  server: "Our service is temporarily unavailable. Please try again later.",
  default: "Sorry, something went wrong. Please try again.",
} as const;

function createErrorMessage(type: keyof typeof ERROR_MESSAGES): ChatMessage {
  return {
    id: generateMessageId('error'),
    text: ERROR_MESSAGES[type],
    sender: 'bot',
    timestamp: new Date(),
    error: true,
  };
}
```

### 8.3 Retry Logic

```typescript
/**
 * Exponential backoff retry configuration
 * 
 * Swiss Timing: Base delay is SWISS_TIMING.slow (500ms)
 * Multiplier: 2x per attempt
 * Max attempts: 3
 */
const RETRY_CONFIG = {
  maxAttempts: 3,
  baseDelay: SWISS_TIMING.slow,
  multiplier: 2,
  maxDelay: 5000,
} as const;

function calculateRetryDelay(attempt: number): number {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.multiplier, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
}

// Delays: 500ms, 1000ms, 2000ms (capped at 5000ms)
```

---

## 9. Performance Optimization

### 9.1 Memoization Strategy

```typescript
/**
 * Components to memoize (with memo()):
 */
const MEMOIZED_COMPONENTS = [
  'TypingIndicator',      // Static when not typing
  'MessageBubble',        // Each message is immutable
  'ChatHeader',           // Only changes on close
  'QuickRepliesSection',  // Static content
  'ChatInputForm',        // Re-renders on input only
  'ChatFAB',              // Only changes on unread count
  'ChatDialog',           // Parent container
] as const;

/**
 * Values to memoize (with useMemo()):
 */
const MEMOIZED_VALUES = [
  'QUICK_REPLIES',        // Static array reference
  'dialogVariants',       // Depends on prefersReducedMotion
] as const;

/**
 * Callbacks to memoize (with useCallback()):
 */
const MEMOIZED_CALLBACKS = [
  'handleToggleOpen',     // Depends on messages
  'handleSendMessage',    // Depends on getResponseKey, simulateTyping
  'handleSubmit',         // Depends on inputValue, handleSendMessage
  'handleQuickReply',     // Depends on handleSendMessage
  'handleInputChange',    // No dependencies
  'scrollToBottom',       // No dependencies
] as const;
```

### 9.2 Re-render Prevention

```typescript
/**
 * Prevent unnecessary re-renders by:
 * 
 * 1. Using stable references for callbacks
 * 2. Memoizing expensive computations
 * 3. Splitting state appropriately
 * 4. Using refs for mutable values that don't trigger renders
 */

// ❌ BAD: Creates new array on every render
const quickReplies = [
  { text: 'Option 1', value: 'opt1' },
];

// ✅ GOOD: Stable reference with useMemo
const quickReplies = useMemo(() => [
  { text: 'Option 1', value: 'opt1' },
], []);

// ❌ BAD: Creates new function on every render
<Button onClick={() => handleSend(value)} />

// ✅ GOOD: Stable reference with useCallback
const handleClick = useCallback(() => handleSend(value), [value, handleSend]);
<Button onClick={handleClick} />
```

### 9.3 Message Virtualization (Future)

```typescript
/**
 * For chat histories > 50 messages, consider virtualization
 * 
 * Libraries:
 *   - react-virtual (TanStack)
 *   - react-window
 *   - @tanstack/react-virtual
 * 
 * Implementation notes:
 *   - Measure each message height dynamically
 *   - Maintain scroll position on new message
 *   - Pre-render N messages above/below viewport
 */
const VIRTUALIZATION_THRESHOLD = 50;

const shouldVirtualize = (messages: ChatMessage[]): boolean =>
  messages.length > VIRTUALIZATION_THRESHOLD;
```

---

## 10. Accessibility Behavior

### 10.1 ARIA Live Regions

```typescript
/**
 * Live region configuration for screen readers
 */
const ARIA_REGIONS = {
  // Message container: announces new messages
  messages: {
    role: 'log',
    'aria-live': 'polite',
    'aria-label': 'Chat messages',
  },
  
  // Typing indicator: announces when bot is typing
  typingIndicator: {
    role: 'status',
    'aria-live': 'polite',
    'aria-label': 'Assistant is typing',
  },
  
  // Online status: announces connection state
  onlineStatus: {
    role: 'status',
    'aria-live': 'polite',
  },
  
  // Dialog: modal semantics
  dialog: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'chatbot-title',
    'aria-describedby': 'chatbot-description',
  },
} as const;
```

### 10.2 Keyboard Navigation Map

```
KEYBOARD NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Key         Action                    Context
────────────────────────────────────────────────────
Escape      Close dialog              When dialog is open
Enter       Send message              When input is focused
Tab         Move to next element      Within dialog
Shift+Tab   Move to previous element  Within dialog
Space       Activate button           When button is focused

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 10.3 Reduced Motion Support

```typescript
/**
 * All animations respect prefers-reduced-motion
 * 
 * Implementation:
 *   1. Use useReducedMotion() hook
 *   2. Pass prefersReducedMotion to all sub-components
 *   3. Use getAccessibleVariants() for Framer Motion
 *   4. Set scrollBehavior to 'auto' when reduced
 */

// Animation adaptation
const dialogVariants = getAccessibleVariants(chatbotVariants, prefersReducedMotion);

// Scroll adaptation
const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

// Typing dots adaptation
const typingDotVariants = prefersReducedMotion ? undefined : TYPING_DOT_VARIANTS;
```

---

## Appendix: Quick Reference

### Constants Summary

```typescript
const CHATBOT_CONSTANTS = {
  // Limits
  MAX_MESSAGES: 100,
  MAX_INPUT_LENGTH: 500,
  
  // Timing
  UNREAD_THRESHOLD_MS: 10000,
  SCROLL_DEBOUNCE_MS: 100,
  TYPING_MIN_MS: 500,
  TYPING_MAX_MS: 3000,
  TYPING_PER_CHAR_MS: 10,
  
  // Animation
  OPEN_DURATION: SWISS_TIMING.normal,   // 300ms
  CLOSE_DURATION: SWISS_TIMING.fast,    // 200ms
  MESSAGE_STAGGER: SWISS_STAGGER.tight, // 50ms
  
  // Keyboard
  KEYS: {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    TAB: 'Tab',
  },
} as const;
```

### Implementation Checklist

- [ ] State machine with defined transitions
- [ ] Focus trap on dialog open
- [ ] Escape key closes dialog
- [ ] Scroll to bottom on new message
- [ ] Typing indicator with Swiss timing
- [ ] Message history limits (100 max)
- [ ] Input sanitization and validation
- [ ] Error handling with user-friendly messages
- [ ] Reduced motion support
- [ ] ARIA live regions for accessibility
- [ ] Memoized components and callbacks
- [ ] Stable references for props

---

*Document Version: 1.0.0*
*Swiss Design System Compliance: Full*
*Last Updated: December 2024*
