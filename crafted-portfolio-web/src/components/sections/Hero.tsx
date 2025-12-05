'use client';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-black/20" />
      <Container className="relative z-10 text-center text-white">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          We Build Enterprise-Grade
          <span className="block text-blue-400">Web Platforms</span>
        </h1>
        <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          From SaaS admin consoles to AI operation hubs, we craft production-ready systems 
          that scale with your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
            View Our Work
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
            Get In Touch
          </Button>
        </div>
      </Container>
    </section>
  );
}