'use client';
import { motion, useInView } from 'framer-motion';
import { Building2, Rocket } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { AngleDivider } from '@/components/ui/AngleDivider';
import { useRef } from 'react';
import Image from 'next/image';

// Swiss Design System
import { SwissServiceCard } from '@/components/ui/swiss';
import {
  SWISS_TIMING,
  SWISS_EASING,
  SWISS_STAGGER,
  createStaggerContainerVariants,
  createSlideUpVariants,
  createSlideInLeftVariants,
  createLetterVariants,
  createWordVariants,
} from '@/lib/motion';

// =============================================================================
// STATIC CONTENT (Separated from component)
// =============================================================================

const SERVICES = [
  {
    title: 'Enterprise Clients',
    description:
      'We modernize legacy architectures, strengthen infrastructure, and create automation that scales cleanly.',
    icon: Building2,
    primaryLink: '/blog',
    primaryText: 'Read Our Insights',
    secondaryLink: '/about',
    secondaryText: 'About Our Company',
  },
  {
    title: 'Local & Growing Brands',
    description:
      'We deliver the same engineering standard — building systems that simplify operations, improve reliability, and accelerate growth.',
    icon: Rocket,
    primaryLink: '/personas/saas',
    primaryText: 'See Demo Playground',
    secondaryLink: '/case-studies',
    secondaryText: 'Resources & Case Studies',
  },
] as const;

const MANIFESTO = [
  'We build with discipline.',
  'We build with purpose.',
  'We build for the way your business actually works.',
] as const;

// =============================================================================
// SWISS ANIMATION VARIANTS (Using motion library)
// =============================================================================

const containerVariants = createStaggerContainerVariants('dramatic');

const itemVariants = createSlideUpVariants(32, 'slow'); // 32px = 8px × 4

const slideInVariants = createSlideInLeftVariants(64, 'slow'); // 64px = 8px × 8

const letterVariants = createLetterVariants(0.8, 0.05);

const manifestoLineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: SWISS_STAGGER.normal },
  },
};

const manifestoWordVariants = createWordVariants();

const slideFromRightVariants = {
  hidden: { opacity: 0, x: 64 }, // 64px = 8px × 8
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.3,
      duration: SWISS_TIMING.slow / 1000,
      ease: SWISS_EASING.default,
    },
  }),
};

const signatureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1.2,
      duration: SWISS_TIMING.hero / 1000,
      ease: SWISS_EASING.default,
    },
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function AboutUsSwiss() {
  const headlineRef = useRef(null);
  const manifestoRef = useRef(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: '-100px' });
  const isManifestoInView = useInView(manifestoRef, { once: true, margin: '-48px' }); // -48px = 8px × 6

  // Word-by-word animation for manifesto lines
  const manifestoWords = MANIFESTO.map(line => line.split(' '));

  // Letter-by-letter animation for "Intentional Engineering"
  const engineeringText = 'Intentional Engineering.';
  const letters = Array.from(engineeringText);

  return (
    <>
      <AngleDivider fromColor='#030712' toColor='#ffffff' />

      {/* Swiss spacing: py-20 (80px) lg:py-32 (128px) - both 8px multiples ✅ */}
      <Section id='about' data-testid='about-section' className='bg-white py-20 lg:py-32'>
        <Container>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-96px' }} // -96px = 8px × 12
            variants={containerVariants}
          >
            {/* Headline Section */}
            {/* Swiss spacing: mb-20 (80px) = 8px × 10 ✅ */}
            <div ref={headlineRef} className='mb-20'>
              {/* Swiss spacing: mb-4 (16px) = 8px × 2 ✅ */}
              <motion.div variants={slideInVariants} className='mb-4'>
                <h2 className='text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-none'>
                  <span
                    className='block'
                    style={{
                      textShadow: `
                        0 1px 3px rgba(0, 0, 0, 0.1),
                        0 4px 12px rgba(0, 0, 0, 0.05),
                        0 8px 24px rgba(0, 0, 0, 0.03)
                      `,
                    }}
                  >
                    Precision. Discipline.
                  </span>
                </h2>
              </motion.div>

              <motion.div className='overflow-hidden'>
                <h2 className='text-4xl lg:text-6xl font-bold text-blue-600 tracking-tight leading-none'>
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial='hidden'
                      animate={isHeadlineInView ? 'visible' : 'hidden'}
                      variants={letterVariants}
                      className='inline-block'
                      style={{
                        textShadow: `
                          0 2px 4px rgba(59, 130, 246, 0.15),
                          0 8px 16px rgba(59, 130, 246, 0.08),
                          0 16px 32px rgba(59, 130, 246, 0.04)
                        `,
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </h2>
              </motion.div>

              {/* Swiss spacing: mt-8 (32px) = 8px × 4 ✅ */}
              <motion.div
                variants={itemVariants}
                className='h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mt-8'
                style={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)' }}
              />
            </div>

            {/* Narrative Section */}
            {/* Swiss spacing: mb-24 (96px) = 8px × 12 ✅ */}
            <motion.div variants={itemVariants} className='relative mb-24 max-w-4xl'>
              <div
                className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400'
                style={{
                  boxShadow: `
                    0 0 20px rgba(59, 130, 246, 0.3),
                    inset 0 0 20px rgba(59, 130, 246, 0.1)
                  `,
                }}
              />
              {/* Swiss spacing: pl-12 (48px) lg:pl-16 (64px) = 8px multiples ✅ */}
              <div className='pl-12 lg:pl-16'>
                {/* Swiss spacing: mb-8 (32px) = 8px × 4 ✅ */}
                <p className='text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light'>
                  We are{' '}
                  <strong className='text-gray-900 font-semibold'>Crafted by Demetrius</strong> — a
                  digital systems studio built on precision, discipline, and intentional
                  engineering. Our work is grounded in a simple principle: technology should make
                  business easier, not harder.
                </p>
                <p className='text-lg text-gray-600 leading-relaxed mb-8'>
                  We design and build the infrastructures, workflows, and automation layers that sit
                  behind the scenes and power how companies operate — whether they&apos;re local
                  businesses growing into their next phase or enterprise organizations modernizing
                  at scale.
                </p>
                <p className='text-lg text-gray-600 leading-relaxed'>
                  We are not in the business of quick fixes or surface-level websites. We architect
                  the systems underneath — the backend logic, secure portals, operational pipelines,
                  and AI-augmented processes that support how a business runs day-to-day.
                </p>
              </div>
            </motion.div>

            {/* Service Cards */}
            {/* Swiss spacing: gap-12 (48px) mb-24 (96px) = 8px multiples ✅ */}
            <motion.div variants={itemVariants} className='grid md:grid-cols-2 gap-12 mb-24'>
              {SERVICES.map((service, index) => (
                <SwissServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  primaryLink={service.primaryLink}
                  primaryText={service.primaryText}
                  secondaryLink={service.secondaryLink}
                  secondaryText={service.secondaryText}
                  index={index}
                  testId={`service-card-${index}`}
                />
              ))}
            </motion.div>

            {/* Manifesto Section */}
            {/* Swiss spacing: pt-20 (80px) = 8px × 10 ✅ */}
            <div ref={manifestoRef} className='relative pt-20'>
              {/* Blueprint Technical Lines Background */}
              <div
                className='absolute inset-0 pointer-events-none opacity-60'
                style={{
                  backgroundImage: 'url(/images/who-we-are/blueprint-technical-lines.svg)',
                  backgroundSize: '100% 120px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top left',
                }}
              />

              {/* Gradient border top */}
              <div
                className='absolute top-0 left-0 right-0 h-px'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1) 50%, transparent)',
                }}
              />

              {/* Swiss spacing: gap-16 (64px) = 8px × 8 ✅ */}
              <div className='relative flex flex-col lg:flex-row gap-16 items-start'>
                {/* Manifesto Text */}
                <div className='flex-1 max-w-3xl'>
                  {manifestoWords.map((words, lineIndex) => (
                    <motion.div
                      key={lineIndex}
                      initial='hidden'
                      animate={isManifestoInView ? 'visible' : 'hidden'}
                      variants={manifestoLineVariants}
                      custom={lineIndex}
                      className='mb-6 overflow-hidden'
                      style={{ perspective: '1000px' }}
                    >
                      <p className='text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight'>
                        {words.map((word, wordIndex) => (
                          <motion.span
                            key={wordIndex}
                            variants={manifestoWordVariants}
                            className='inline-block mr-4'
                            style={{
                              textShadow: `
                                0 2px 4px rgba(0, 0, 0, 0.1),
                                0 8px 16px rgba(0, 0, 0, 0.05),
                                0 16px 32px rgba(0, 0, 0, 0.03)
                              `,
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </p>
                    </motion.div>
                  ))}

                  {/* Signature line */}
                  {/* Swiss spacing: mt-12 (48px) pt-8 (32px) = 8px multiples ✅ */}
                  <motion.div
                    initial='hidden'
                    animate={isManifestoInView ? 'visible' : 'hidden'}
                    variants={signatureVariants}
                    className='mt-12 pt-8 border-t border-gray-100'
                  >
                    <p className='text-xl text-gray-500 italic font-light leading-relaxed'>
                      This is who we are — and this is what it means to be{' '}
                      <span
                        className='text-gray-900 font-semibold not-italic'
                        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.08)' }}
                      >
                        Crafted by Demetrius
                      </span>
                      .
                    </p>
                  </motion.div>
                </div>

                {/* Architectural Detail Image */}
                <motion.div
                  initial='hidden'
                  animate={isManifestoInView ? 'visible' : 'hidden'}
                  variants={slideFromRightVariants}
                  custom={0}
                  className='hidden lg:block w-64 flex-shrink-0'
                >
                  <div
                    className='relative overflow-hidden rounded-lg'
                    style={{
                      boxShadow: `
                        0 4px 12px rgba(0, 0, 0, 0.1),
                        0 16px 32px rgba(0, 0, 0, 0.08),
                        0 32px 64px rgba(0, 0, 0, 0.04)
                      `,
                    }}
                  >
                    <Image
                      src='/images/who-we-are/steel-concrete-intersection.svg'
                      alt='Precision engineering architectural detail'
                      width={300}
                      height={400}
                      className='w-full h-auto grayscale contrast-125 hover:grayscale-0 transition-all'
                      style={{ transitionDuration: `${SWISS_TIMING.hero}ms` }}
                    />
                    {/* Blue tint overlay */}
                    <div
                      className='absolute inset-0 bg-blue-600 mix-blend-multiply opacity-10 hover:opacity-0 transition-opacity'
                      style={{ transitionDuration: `${SWISS_TIMING.hero}ms` }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
