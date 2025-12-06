/**
 * ChatInput Component
 *
 * Form input area with send button.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * **CRITICAL**: Uses `shrink-0` to prevent compression.
 *
 * @module chatbot/components/ChatInput
 */

'use client';

import { memo, forwardRef, type FormEvent, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { ChatInputProps } from '../types';

export const ChatInput = memo(
  forwardRef<HTMLInputElement, ChatInputProps>(function ChatInput(
    { value, onChange, onSubmit, onKeyDown, disabled, inputId },
    ref
  ) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
    };

    const canSend = value.trim().length > 0;

    return (
      <form
        onSubmit={handleSubmit}
        className='shrink-0 flex items-center gap-2 p-4 border-t border-swiss-border'
      >
        <Input
          ref={ref}
          id={inputId}
          type='text'
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type a message...'
          disabled={disabled}
          className='flex-1 min-w-0'
          aria-label='Type a message'
          autoComplete='off'
        />
        <Button
          type='submit'
          size='icon'
          disabled={disabled || !canSend}
          aria-label='Send message'
          className='shrink-0 w-10 h-10'
        >
          <Send className='h-4 w-4' aria-hidden='true' />
        </Button>
      </form>
    );
  })
);

ChatInput.displayName = 'ChatInput';
