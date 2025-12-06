/**
 * ActionButtons Component
 *
 * Container for Sign In and Get Started CTA buttons.
 * Reference: MASTER-STYLE-GUIDE.md §2.1
 *
 * @module header/components/ActionButtons
 */

'use client';

import { memo } from 'react';
import { SignInButton } from './SignInButton';
import { GetStartedCTA } from './GetStartedCTA';
import type { ActionButtonsProps } from '../types';

export const ActionButtons = memo<ActionButtonsProps>(function ActionButtons({ isScrolled }) {
  return (
    <div className='flex items-center space-x-4'>
      <SignInButton isScrolled={isScrolled} />
      <GetStartedCTA isScrolled={isScrolled} />
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';
