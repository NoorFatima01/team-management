import React from 'react';

import HeroSectionWave from '@/components/svg/hero-section-wave';

const HeroSection = () => {
  return (
    <div className='relative h-[90vh] flex items-center justify-center'>
      <HeroSectionWave className='absolute w-full h-full z-[-1] object-cover' />
      <div className='flex flex-col items-center p-8'>
        <h1 className='text-5xl leading-tight tracking-tighter font-bold'>
          A Team Management Platform
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
