/**
 * Chatbot Constants
 *
 * All static data, configuration, and animation variants.
 * Reference: MASTER-STYLE-GUIDE.md §2.1, ANIMATION-SPECIFIC-GUIDE.md §2
 *
 * @module chatbot/constants
 */

import { SWISS_TIMING, SWISS_EASING, SWISS_TRANSITIONS } from '@/lib/motion';
import type { ChatMessage, QuickReply } from '../types';

// =============================================================================
// SWISS SPACING (Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const SWISS_SPACING = {
  /** S₁ = 8px */
  XS: 8,
  /** S₂ = 16px */
  SM: 16,
  /** S₃ = 24px */
  MD: 24,
  /** S₄ = 32px */
  LG: 32,
  /** S₆ = 48px */
  XL: 48,
} as const;

// =============================================================================
// SWISS DIMENSIONS (8px grid)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// =============================================================================

export const DIALOG_DIMENSIONS = {
  /** Width: S₄₈ = 8 × 48 = 384px */
  WIDTH: 384,
  /** Height: S₆₃ = 8 × 63 = 504px */
  HEIGHT: 504,
  /** Header: S₉ = 8 × 9 = 72px */
  HEADER_HEIGHT: 72,
  /** Input area: S₈ = 8 × 8 = 64px */
  INPUT_HEIGHT: 64,
} as const;

/** FAB size: S₇ = 8 × 7 = 56px */
export const FAB_SIZE = 56;

// =============================================================================
// TIME CONSTANTS
// =============================================================================

export const TIME_CONSTANTS = {
  /** Unread message threshold (10s) */
  UNREAD_THRESHOLD_MS: 10000,
  /** Debounce delay for scroll (100ms) */
  SCROLL_DEBOUNCE_MS: 100,
} as const;

// =============================================================================
// PERFORMANCE LIMITS
// =============================================================================

export const LIMITS = {
  /** Maximum messages in history */
  MAX_MESSAGES: 100,
  /** Maximum input length */
  MAX_INPUT_LENGTH: 500,
} as const;

// =============================================================================
// KEYBOARD KEYS
// =============================================================================

export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  TAB: 'Tab',
} as const;

// =============================================================================
// ANIMATION VARIANTS
// Reference: ANIMATION-SPECIFIC-GUIDE.md §2
// =============================================================================

export const chatbotVariants = {
  closed: {
    scale: 0.95,
    opacity: 0,
    y: SWISS_SPACING.SM, // S₂ = 16px
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
    y: SWISS_SPACING.XS, // S₁ = 8px
    transition: {
      duration: SWISS_TIMING.fast / 1000,
      ease: SWISS_EASING.easeIn,
    },
  },
};

export const fabVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.02, // Swiss: max 2% scale
    transition: SWISS_TRANSITIONS.micro,
  },
  tap: {
    scale: 0.98,
    transition: SWISS_TRANSITIONS.micro,
  },
  icon: {
    initial: { opacity: 0, scale: 0.8, rotate: -90 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: SWISS_TIMING.fast / 1000,
        ease: SWISS_EASING.easeOut,
      },
    },
    exit: { opacity: 0, scale: 0.8, rotate: 90 },
  },
};

export const messageVariants = {
  hidden: { opacity: 0, y: SWISS_SPACING.XS },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SWISS_TIMING.fast / 1000,
      ease: SWISS_EASING.easeOut,
    },
  },
};

export const typingDotVariants = {
  bounce: {
    y: [0, -6, 0],
    transition: {
      duration: SWISS_TIMING.slow / 1000,
      ease: SWISS_EASING.easeInOut,
      repeat: Infinity,
    },
  },
};

// =============================================================================
// STATIC DATA
// =============================================================================

export const QUICK_REPLIES: readonly QuickReply[] = [
  { id: 'qr-case-studies', text: 'Show me your case studies', value: 'case-studies' },
  { id: 'qr-services', text: 'What services do you offer?', value: 'services' },
  { id: 'qr-tech-stack', text: 'Tell me about your tech stack', value: 'tech-stack' },
  { id: 'qr-collaboration', text: 'How can we work together?', value: 'collaboration' },
] as const;

export const PREDEFINED_RESPONSES: Readonly<Record<string, string>> = {
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

export const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial_1',
  text: "Hi! I'm your AI assistant. I can help you learn more about our portfolio, case studies, and services. What would you like to know?",
  sender: 'bot',
  timestamp: new Date(),
};
