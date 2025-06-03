'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import WaitlistSection from '@/components/WaitlistSection';
import FeaturesSection from '@/components/FeaturesSection';
import DemoSection from '@/components/DemoSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced from 2000ms to 1000ms for faster testing

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="transition-opacity duration-500 opacity-100">
      <Navigation />
      <main>
        <HeroSection />
        <WaitlistSection />
        <FeaturesSection />
        <DemoSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
