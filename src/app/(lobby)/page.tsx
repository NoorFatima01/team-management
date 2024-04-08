import * as React from 'react';
import '@/lib/env';

import HeroSection from '@/components/landing-page/hero-section';

export default function HomePage() {
  return (
    <section className='overflow-hidden'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_115%_at_50%_10%,#000_40%,#135A13_100%)]'></div>

      <HeroSection />
    </section>
  );
}
