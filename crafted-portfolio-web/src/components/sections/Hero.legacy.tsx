'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), { ssr: false });

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative h-screen flex items-center overflow-hidden bg-gray-950'>
      {/* 3D Background/Scene */}
      <div className='absolute inset-0 z-0'>
        <HeroScene />
      </div>

      {/* Overlay Gradient for text readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-0 pointer-events-none' />

      <Container className='relative z-10'>
        <div className='max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className='text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white'>
              We Build Enterprise-Grade
              <span className='block text-blue-500'>Web Platforms</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className='text-xl lg:text-2xl mb-8 text-gray-300 max-w-2xl'
          >
            From SaaS admin consoles to AI operation hubs, we craft production-ready systems that
            scale with your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className='flex flex-col sm:flex-row gap-4'
          >
            <Button
              size='lg'
              className='bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4'
              onClick={() => scrollToSection('case-studies')}
            >
              View Our Work
            </Button>
            <Link href='#contact'>
              <Button
                size='lg'
                variant='outline'
                className='border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 text-lg px-8 py-4'
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
