import { Hero } from '@/components/hero';
import { AboutUs } from '@/components/sections/AboutUs';
import { AboutUsSwiss } from '@/components/sections/AboutUsSwiss';
import { WhyUs } from '@/components/why-us';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { TechStack } from '@/components/sections/TechStack';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Chatbot } from '@/components/chatbot';

// Swiss Design System Feature Flag
// Set to true to enable Swiss-compliant sections
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
