'use client';
import { useState, useEffect, useRef } from 'react';
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
} from '@/lib/motion';

/**
 * SWISS DESIGN SYSTEM - Chatbot Component
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
// SWISS SPACING REFERENCE (8px grid: Sₙ = 8 × n)
// Reference: MASTER-STYLE-GUIDE.md §2.1
// Values used in Tailwind classes: xs=8px(gap-2), sm=16px(p-4), lg=32px(w-8)
// =============================================================================

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

// Simple ID generator
let messageIdCounter = 0;
const generateMessageId = (prefix: string) =>
  `${prefix}_${++messageIdCounter}_${Math.random().toString(36).slice(2, 9)}`;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

interface QuickReply {
  text: string;
  value: string;
}

export function Chatbot() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you learn more about our portfolio, case studies, and services. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const quickReplies: QuickReply[] = [
    { text: 'Show me your case studies', value: 'case-studies' },
    { text: 'What services do you offer?', value: 'services' },
    { text: 'Tell me about your tech stack', value: 'tech-stack' },
    { text: 'How can we work together?', value: 'collaboration' },
  ];

  const predefinedResponses: Record<string, string> = {
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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update unread count when opening/closing chat
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    } else {
      // Calculate unread when closing
      const count = messages.filter(
        m => m.sender === 'bot' && m.timestamp > new Date(Date.now() - 10000)
      ).length;
      setUnreadCount(count);
    }
  };

  const getResponseKey = (input: string): string => {
    const lowercaseInput = input.toLowerCase();

    if (
      lowercaseInput.includes('hello') ||
      lowercaseInput.includes('hi') ||
      lowercaseInput.includes('hey')
    ) {
      return 'greeting';
    }
    if (
      lowercaseInput.includes('case') ||
      lowercaseInput.includes('study') ||
      lowercaseInput.includes('portfolio') ||
      lowercaseInput.includes('demo')
    ) {
      return 'case-studies';
    }
    if (
      lowercaseInput.includes('service') ||
      lowercaseInput.includes('what do you do') ||
      lowercaseInput.includes('offer')
    ) {
      return 'services';
    }
    if (
      lowercaseInput.includes('tech') ||
      lowercaseInput.includes('stack') ||
      lowercaseInput.includes('technology') ||
      lowercaseInput.includes('framework')
    ) {
      return 'tech-stack';
    }
    if (
      lowercaseInput.includes('work together') ||
      lowercaseInput.includes('collaborate') ||
      lowercaseInput.includes('hire') ||
      lowercaseInput.includes('project')
    ) {
      return 'collaboration';
    }

    return 'default';
  };

  /**
   * Swiss-compliant typing simulation
   * Reference: TIMING-SPECIFIC-GUIDE.md §1 - slow timing (800ms)
   */
  const simulateTyping = async (): Promise<void> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, SWISS_TIMING.slow));
    setIsTyping(false);
  };

  const sendMessage = async (text: string, isQuickReply = false) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateMessageId('user'),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    await simulateTyping();

    // Generate bot response
    const responseKey = isQuickReply ? text : getResponseKey(text);
    const responseText = predefinedResponses[responseKey] || predefinedResponses['default'];

    const botMessage: Message = {
      id: generateMessageId('bot'),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.value, true);
  };

  if (!isOpen) {
    return (
      <div className='fixed bottom-6 right-6 z-50' role='region' aria-label='Chat assistant'>
        {/* 
          FAB Button - Swiss Design Compliant
          Reference: MASTER-STYLE-GUIDE.md §2.1 (56px = S₇ = 8 × 7)
          Reference: COLOR-STYLE-ACCENT-UI-UX.md §2 (Swiss accent tokens)
          Reference: ANIMATION-SPECIFIC-GUIDE.md §2 (scale max 2%)
        */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fabVariants}
          initial='idle'
          whileHover='hover'
          whileTap='tap'
        >
          <Button
            onClick={handleToggleOpen}
            aria-label='Open chat assistant'
            aria-expanded={isOpen}
            aria-controls='chatbot-dialog'
            className={cn(
              // Size: S₇ = 8 × 7 = 56px (Swiss grid compliant)
              'relative w-14 h-14 rounded-full',
              // Colors: Swiss accent tokens
              'bg-swiss-accent hover:bg-swiss-accent-dark',
              // Shadows: Swiss elevated shadow
              'shadow-swiss-elevated hover:shadow-swiss-floating',
              // Focus: WCAG AAA compliant
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
                  // Position: S₂ = 8 × 2 = 16px offset (negative)
                  'absolute -top-2 -right-2',
                  // Size: S₃ = 8 × 3 = 24px
                  'w-6 h-6 rounded-full',
                  'flex items-center justify-center',
                  // Typography: T₀ = 12px
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
  }

  return (
    <div className='fixed bottom-6 right-6 z-50' role='region' aria-label='Chat assistant'>
      {/* 
        Chat Dialog - Swiss Design Compliant
        Reference: MASTER-STYLE-GUIDE.md §2.1 (384px = S₄₈, 504px = S₆₃)
        Reference: ANIMATION-SPECIFIC-GUIDE.md §2 (chatbotVariants)
      */}
      <AnimatePresence mode='wait'>
        <motion.div
          key='chatbot-dialog'
          variants={prefersReducedMotion ? undefined : chatbotVariants}
          initial='closed'
          animate='open'
          exit='exit'
        >
          <Card
            id='chatbot-dialog'
            role='dialog'
            aria-labelledby='chatbot-title'
            aria-describedby='chatbot-description'
            className={cn(
              // Size: S₄₈ × S₆₃ = 384 × 504 (Swiss grid)
              'w-96 h-[504px]',
              // Shadow: Swiss floating shadow
              'shadow-swiss-floating border-0 overflow-hidden'
            )}
          >
            {/* 
              Header - Swiss Design Compliant
              Reference: COLOR-STYLE-ACCENT-UI-UX.md §2 (accent background)
              Reference: MASTER-STYLE-GUIDE.md §2.1 (p-4 = S₂ = 16px)
            */}
            <CardHeader className='bg-swiss-accent text-white p-4'>
              <div className='flex items-center justify-between'>
                {/* Left: Avatar and Status - gap-4 = S₂ = 16px */}
                <div className='flex items-center gap-4'>
                  {/* Avatar: S₄ = 32px */}
                  <div
                    className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'
                    aria-hidden='true'
                  >
                    <span className='text-sm'>🤖</span>
                  </div>
                  <div>
                    <CardTitle id='chatbot-title' className='text-xl font-semibold'>
                      Portfolio Assistant
                    </CardTitle>
                    {/* Status indicator with aria */}
                    <div
                      className='flex items-center gap-2 text-base text-swiss-accent-lighter'
                      role='status'
                      aria-live='polite'
                    >
                      <motion.div
                        className='w-2 h-2 bg-swiss-success rounded-full'
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{
                          duration: SWISS_TIMING.hero / 1000,
                          ease: SWISS_EASING.easeInOut,
                          repeat: Infinity,
                        }}
                        aria-hidden='true'
                      />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                {/* Close button */}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleToggleOpen}
                  aria-label='Close chat'
                  className='text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white'
                >
                  <span aria-hidden='true'>✕</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className='p-0 flex flex-col h-full'>
              {/* Screen reader description */}
              <p id='chatbot-description' className='sr-only'>
                Interactive chat assistant to help you explore our portfolio, case studies, and
                services.
              </p>

              {/* 
                Messages Container
                Reference: MASTER-STYLE-GUIDE.md §2.1 (p-4 = S₂, gap-4 = S₂)
              */}
              <div
                ref={chatContainerRef}
                className='flex-1 overflow-y-auto p-4 space-y-4'
                role='log'
                aria-live='polite'
                aria-label='Chat messages'
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    variants={prefersReducedMotion ? undefined : messageVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ delay: index * SWISS_STAGGER.tight }}
                    className={cn(
                      'flex',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {/* 
                      Message Bubble
                      Reference: MASTER-STYLE-GUIDE.md §2.1 (p-4 = S₂ = 16px)
                      Reference: MASTER-STYLE-GUIDE.md §2.2 (text-base = T₁ ≈ 15px)
                      Reference: COLOR-STYLE-ACCENT-UI-UX.md §2 (Swiss colors)
                    */}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg p-4 text-base',
                        message.sender === 'user'
                          ? 'bg-swiss-accent text-white'
                          : 'bg-swiss-surface text-swiss-text'
                      )}
                      role='article'
                      aria-label={`Message from ${message.sender === 'user' ? 'you' : 'assistant'}`}
                    >
                      {message.text}
                      {/* 
                        Timestamp
                        Reference: MASTER-STYLE-GUIDE.md §2.1 (mt-2 = S₁ = 8px)
                        Reference: MASTER-STYLE-GUIDE.md §2.2 (text-xs = T₀ = 12px)
                      */}
                      <div
                        className={cn(
                          'text-xs mt-2 opacity-70',
                          message.sender === 'user'
                            ? 'text-swiss-accent-lighter'
                            : 'text-swiss-text-muted'
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
                ))}

                {/* 
                  Typing Indicator
                  Reference: ANIMATION-SPECIFIC-GUIDE.md §2 (typingDotVariants)
                  Reference: MASTER-STYLE-GUIDE.md §2.1 (p-4, gap-2)
                */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      className='flex justify-start'
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
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
                              variants={typingDotVariants}
                              animate='bounce'
                              transition={{
                                delay: i * SWISS_STAGGER.normal,
                              }}
                              aria-hidden='true'
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* 
                Quick Replies
                Reference: MASTER-STYLE-GUIDE.md §2.1 (px-4 = S₂, pb-2 = S₁, gap-2 = S₁, h-8 = S₄)
                Reference: MASTER-STYLE-GUIDE.md §2.2 (text-xs = T₀)
              */}
              <AnimatePresence>
                {messages.length <= 2 && (
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
                    <div
                      className='flex flex-wrap gap-2'
                      role='group'
                      aria-labelledby='quick-replies-label'
                    >
                      {quickReplies.map((reply, index) => (
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
                            onClick={() => handleQuickReply(reply)}
                          >
                            {reply.text}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 
                Input Form
                Reference: MASTER-STYLE-GUIDE.md §2.1 (p-4 = S₂, gap-2 = S₁, px-4 = S₂)
              */}
              <div className='border-t border-swiss-border p-4'>
                <form onSubmit={handleSubmit} className='flex gap-2' aria-label='Send a message'>
                  <Input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder='Ask me anything...'
                    className='flex-1'
                    disabled={isTyping}
                    aria-label='Message input'
                    aria-describedby={isTyping ? 'typing-status' : undefined}
                  />
                  {isTyping && (
                    <span id='typing-status' className='sr-only'>
                      Please wait, assistant is typing a response
                    </span>
                  )}
                  <Button
                    type='submit'
                    disabled={!inputValue.trim() || isTyping}
                    className='px-4'
                    aria-label='Send message'
                  >
                    <span className='text-xl' aria-hidden='true'>
                      →
                    </span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
