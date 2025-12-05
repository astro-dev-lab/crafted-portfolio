import { Hero } from '@/components/sections/Hero';
import { AboutUs } from '@/components/sections/AboutUs';
import { AboutUsSwiss } from '@/components/sections/AboutUsSwiss';
import { WhyUs } from '@/components/sections/WhyUs';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { TechStack } from '@/components/sections/TechStack';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Chatbot } from '@/components/Chatbot';

// Swiss Design System Feature Flag
// Set to true to enable Swiss-compliant AboutUs section
const USE_SWISS_DESIGN = true;

export default function Home() {
  return (
    <>
      <Hero />
      {USE_SWISS_DESIGN ? <AboutUsSwiss /> : <AboutUs />}
      <WhyUs />
      <CaseStudies />
      <TechStack />
      <ContactCTA />
      <Chatbot />
    </>
  );
}
