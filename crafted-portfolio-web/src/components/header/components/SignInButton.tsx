/**
 * SignInButton Component
 *
 * Authentication link with scroll-aware styling.
 * Reference: MASTER-STYLE-GUIDE.md §2.2
 *
 * @module header/components/SignInButton
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINK_CLASSES } from '../constants';
import type { SignInButtonProps } from '../types';

export const SignInButton = memo<SignInButtonProps>(function SignInButton({ isScrolled }) {
  return (
    <Link
      href='/login'
      className={cn(
        NAV_LINK_CLASSES.base,
        isScrolled ? NAV_LINK_CLASSES.scrolled : NAV_LINK_CLASSES.transparent
      )}
    >
      Sign In
    </Link>
  );
});

SignInButton.displayName = 'SignInButton';
