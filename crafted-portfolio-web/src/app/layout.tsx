import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from './components/AuthProvider';
import { StickyHeader } from '@/components/layout/StickyHeader';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Crafted Portfolio - Enterprise Web Platforms',
  description: 'We build production-grade internal tools and platforms for modern enterprises.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <StickyHeader />
          <div className='min-h-screen'>{children}</div>
          <footer className='border-t bg-gray-50'>
            <div className='mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-500'>
              © 2025 Crafted Portfolio. Built with Next.js, TypeScript & Tailwind CSS.
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
