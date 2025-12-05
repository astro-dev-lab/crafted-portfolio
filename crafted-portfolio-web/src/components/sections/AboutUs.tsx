'use client';
import { motion, useInView } from 'framer-motion';
import { Building2, Rocket, ArrowRight, BookOpen, Play } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AngleDivider } from '@/components/ui/AngleDivider';
import Link from 'next/link';
import { useRef } from 'react';

export function AboutUs() {
  const headlineRef = useRef(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: 'Enterprise Clients',
      description: 'We modernize legacy architectures, strengthen infrastructure, and create automation that scales cleanly.',
      icon: Building2,
      primaryLink: '/blog',
      primaryText: 'Read Our Insights',
      secondaryLink: '/about',
      secondaryText: 'About Our Company',
    },
    {
      title: 'Local & Growing Brands',
      description: 'We deliver the same engineering standard — building systems that simplify operations, improve reliability, and accelerate growth.',
      icon: Rocket,
      primaryLink: '/personas/saas',
      primaryText: 'See Demo Playground',
      secondaryLink: '/case-studies',
      secondaryText: 'Resources & Case Studies',
    },
  ];

  const manifesto = [
    'We build with discipline.',
    'We build with purpose.',
    'We build for the way your business actually works.',
  ];

  // Letter-by-letter animation for "Intentional Engineering"
  const engineeringText = "Intentional Engineering.";
  const letters = Array.from(engineeringText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + (i * 0.05),
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const manifestoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <>
      <AngleDivider fromColor="#030712" toColor="#ffffff" />
      
      <Section id="about" className="bg-white py-20 lg:py-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            {/* Enhanced Headline with Choreographed Animation */}
            <div ref={headlineRef} className="mb-20">
              <motion.div
                variants={slideInVariants}
                className="mb-4"
              >
                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-none">
                  <span 
                    className="block"
                    style={{
                      textShadow: `
                        0 1px 3px rgba(0, 0, 0, 0.1),
                        0 4px 12px rgba(0, 0, 0, 0.05),
                        0 8px 24px rgba(0, 0, 0, 0.03)
                      `
                    }}
                  >
                    Precision. Discipline.
                  </span>
                </h2>
              </motion.div>
              
              <motion.div className="overflow-hidden">
                <h2 className="text-4xl lg:text-6xl font-bold text-blue-600 tracking-tight leading-none">
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate={isHeadlineInView ? "visible" : "hidden"}
                      variants={letterVariants}
                      className="inline-block"
                      style={{
                        textShadow: `
                          0 2px 4px rgba(59, 130, 246, 0.15),
                          0 8px 16px rgba(59, 130, 246, 0.08),
                          0 16px 32px rgba(59, 130, 246, 0.04)
                        `
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </h2>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mt-8"
                style={{
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                }}
              />
            </div>

            {/* Narrative with Enhanced Accent Line */}
            <motion.div
              variants={itemVariants}
              className="relative mb-24 max-w-4xl"
            >
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400"
                style={{
                  boxShadow: `
                    0 0 20px rgba(59, 130, 246, 0.3),
                    inset 0 0 20px rgba(59, 130, 246, 0.1)
                  `
                }}
              />
              <div className="pl-12 lg:pl-16">
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                  We are <strong className="text-gray-900 font-semibold">Crafted by Demetrius</strong> — a digital
                  systems studio built on precision, discipline, and intentional engineering. Our
                  work is grounded in a simple principle: technology should make business easier, not
                  harder.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  We design and build the infrastructures, workflows, and automation layers that sit
                  behind the scenes and power how companies operate — whether they&apos;re local
                  businesses growing into their next phase or enterprise organizations modernizing at
                  scale.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We are not in the business of quick fixes or surface-level websites. We architect
                  the systems underneath — the backend logic, secure portals, operational pipelines,
                  and AI-augmented processes that support how a business runs day-to-day.
                </p>
              </div>
            </motion.div>

            {/* Ultra-Luxury Cards */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-12 mb-24"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  whileHover={{ 
                    y: -12, 
                    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } 
                  }}
                  className="group relative"
                >
                  <Card className="h-full border-0 bg-white relative overflow-hidden p-0">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"
                      style={{
                        boxShadow: `
                          0 1px 3px rgba(0, 0, 0, 0.12),
                          0 8px 32px rgba(0, 0, 0, 0.08),
                          0 32px 64px rgba(0, 0, 0, 0.04),
                          inset 0 1px 0 rgba(255, 255, 255, 0.6)
                        `
                      }}
                    />
                    <CardContent className="relative p-12 h-full flex flex-col">
                      {/* Geometric Accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent opacity-60" />
                      
                      {/* Icon with Premium Treatment */}
                      <div className="mb-8">
                        <div 
                          className="inline-flex p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-500"
                          style={{
                            boxShadow: `
                              0 4px 12px rgba(59, 130, 246, 0.15),
                              0 16px 32px rgba(59, 130, 246, 0.08),
                              inset 0 1px 0 rgba(255, 255, 255, 0.2)
                            `
                          }}
                        >
                          <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
                        </div>
                      </div>

                      {/* Typography with Mathematical Spacing */}
                      <h3 
                        className="text-3xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
                        style={{
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-8 flex-grow text-lg">
                        {service.description}
                      </p>

                      {/* Enhanced CTA Buttons */}
                      <div className="space-y-4">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 py-4 text-lg font-semibold tracking-wide transition-all duration-300"
                          style={{
                            boxShadow: `
                              0 4px 12px rgba(59, 130, 246, 0.3),
                              0 8px 24px rgba(59, 130, 246, 0.15)
                            `
                          }}
                        >
                          <Link href={service.primaryLink} className="flex items-center justify-center gap-3">
                            {index === 0 ? <BookOpen className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {service.primaryText}
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </Button>
                        
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 py-3 transition-all duration-300"
                        >
                          <Link href={service.secondaryLink} className="flex items-center justify-center gap-2">
                            {service.secondaryText}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Manifesto */}
            <motion.div
              variants={itemVariants}
              className="border-t border-gray-200 pt-20"
              style={{
                borderImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent) 1'
              }}
            >
              <div className="max-w-3xl">
                {manifesto.map((line, i) => (
                  <motion.p
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={manifestoVariants}
                    className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 tracking-tight"
                    style={{
                      textShadow: `
                        0 1px 3px rgba(0, 0, 0, 0.08),
                        0 4px 12px rgba(0, 0, 0, 0.04)
                      `
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
                <motion.p
                  custom={manifesto.length}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={manifestoVariants}
                  className="text-xl text-gray-500 mt-12 italic font-light"
                >
                  This is who we are — and this is what it means to be Crafted by Demetrius.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
