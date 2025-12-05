'use client';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

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

  const simulateTyping = async (): Promise<void> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
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
      <div className='fixed bottom-6 right-6 z-50'>
        <Button
          onClick={handleToggleOpen}
          className='relative w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110'
        >
          <span className='text-xl'>💬</span>
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              className='absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs'
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <Card className='w-96 h-[500px] shadow-xl border-0 overflow-hidden'>
        <CardHeader className='bg-blue-600 text-white p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                <span className='text-sm'>🤖</span>
              </div>
              <div>
                <CardTitle className='text-lg'>Portfolio Assistant</CardTitle>
                <div className='flex items-center space-x-2 text-sm text-blue-100'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleToggleOpen}
              className='text-white hover:bg-white/20'
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className='p-0 flex flex-col h-full'>
          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map(message => (
              <div
                key={message.id}
                className={cn('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg p-3 text-sm',
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  {message.text}
                  <div
                    className={cn(
                      'text-xs mt-1 opacity-70',
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='bg-gray-100 rounded-lg p-3'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100' />
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200' />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className='px-4 pb-2'>
              <div className='text-xs text-gray-500 mb-2'>Quick questions:</div>
              <div className='flex flex-wrap gap-2'>
                {quickReplies.map(reply => (
                  <Button
                    key={reply.value}
                    variant='outline'
                    size='sm'
                    className='text-xs h-7'
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className='border-t p-4'>
            <form onSubmit={handleSubmit} className='flex space-x-2'>
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='Ask me anything...'
                className='flex-1'
                disabled={isTyping}
              />
              <Button type='submit' disabled={!inputValue.trim() || isTyping} className='px-3'>
                <span className='text-lg'>→</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
