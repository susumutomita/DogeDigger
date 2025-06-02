import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WaitlistSection from '@/components/WaitlistSection';
import FeaturesSection from '@/components/FeaturesSection';
import DemoSection from '@/components/DemoSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <div id="waitlist">
          <WaitlistSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <DemoSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}