import { Hero } from '@/components/sections/Hero';
import { AboutUs } from '@/components/sections/AboutUs';
import { WhyUs } from '@/components/sections/WhyUs';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { TechStack } from '@/components/sections/TechStack';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <WhyUs />
      <CaseStudies />
      <TechStack />
      <ContactCTA />
    </>
  );
}
