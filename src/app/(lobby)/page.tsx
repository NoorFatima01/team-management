import * as React from 'react';
import '@/lib/env';

import Features from '@/components/landing-page/features';
import Gradient from '@/components/landing-page/gardient';
import HeroSection from '@/components/landing-page/hero-section';

export default function HomePage() {
  return (
    <section className='overflow-hidden'>
      <Gradient />
      <HeroSection />
      <Features />
    </section>
  );
}
