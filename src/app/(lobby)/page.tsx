import * as React from 'react';
import '@/lib/env';

import HeroSection from '@/components/landing-page/hero-section';

export default function HomePage() {
  return (
    <section className='overflow-hidden'>
      <HeroSection />
    </section>
  );
}
