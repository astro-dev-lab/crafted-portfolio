/**
 * MenuFooter Component
 *
 * Optional footer for mega menus with CTA link.
 *
 * Swiss Design Principles:
 * - Subtle separation from content (border-t)
 * - Clear call-to-action with brand color
 * - Balanced whitespace
 *
 * Mathematical Foundation:
 * - Padding: px-6 py-4 (24px × 16px)
 * - Background: bg-gray-50 for subtle contrast
 * - Link color: blue-600 (primary action)
 *
 * @module header/components/MenuFooter
 */

'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MENU_FOOTER_CLASSES, MENU_ITEM_VARIANTS } from '../constants';

interface MenuFooterProps {
  readonly text: string;
  readonly href: string;
  readonly linkText: string;
}

export const MenuFooter = memo<MenuFooterProps>(function MenuFooter({ text, href, linkText }) {
  return (
    <motion.div className={MENU_FOOTER_CLASSES.container} variants={MENU_ITEM_VARIANTS}>
      <span className={MENU_FOOTER_CLASSES.text}>{text}</span>
      <Link href={href} className={MENU_FOOTER_CLASSES.link}>
        {linkText}
      </Link>
    </motion.div>
  );
});

MenuFooter.displayName = 'MenuFooter';
