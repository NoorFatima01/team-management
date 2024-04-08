import * as React from 'react';
import '@/lib/env';

import HeroSection from '@/components/landing-page/hero-section';
import SendEmail from '@/components/layout/send-email';

export default function HomePage() {
  return (
    <section className='overflow-hidden'>
      <HeroSection />
      <SendEmail />
    </section>
  );
}
