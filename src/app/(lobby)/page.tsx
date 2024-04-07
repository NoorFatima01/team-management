import * as React from 'react';
import '@/lib/env';

export default function HomePage() {
  return (
    <section className='w-full h-screen rounded-md !overflow-visible relative flex flex-col iteams-center antialiased'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_115%_at_50%_10%,#000_40%,#135A13_100%)]'></div>
    </section>
  );
}
