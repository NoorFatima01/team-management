import React from 'react';

import { Icons } from '@/components/icons';

const features = [
  {
    heading: 'Register yourself',
    description: 'Register as a member to access the platform',
    icon: <Icons.user />,
  },
  {
    heading: 'Create or Join Teams',
    description: 'Become a team head. Create and manage your own teams.',
    icon: <Icons.add />,
  },
  {
    heading: 'Create Projects',
    description:
      'Create projects, divide them into tasks and keep track of your progress.',
    icon: <Icons.folder />,
  },
  {
    heading: 'View Reports',
    description: 'View reports of your projects and tasks.',
    icon: <Icons.file />,
  },
  {
    heading: 'Real time Chat',
    description: 'Access the inbox to chat with your team members.',
    icon: <Icons.message />,
  },
  {
    heading: 'Get Notified',
    description: 'Get notified of your project and task updates.',
    icon: <Icons.bell />,
  },
];

const Features = () => {
  return (
    <section className='my-12'>
      <div className='mx-auto w-[130px]'>
        <h2 className='text-3xl font-bold text-foreground '>Features</h2>
      </div>

      <div className='container'>
        <div className='mt-16 grid divide-y divide-muted-foreground/10 border-y border-muted-foreground/10 sm:grid-cols-2 sm:divide-x sm:border-y-0 sm:border-b lg:grid-cols-3 lg:border-r'>
          {features.map((feature, index) => (
            <div
              className='border-muted-foreground/10 px-7 py-9 pb-10 sm:first:border-t first:lg:border-l'
              key={index}
            >
              <div>{feature.icon}</div>
              <h5 className='mt-7 text-lg font-medium text-blue-1'>
                {feature.heading}
              </h5>
              <div className='mt-2 font-light text-neutral-4'>
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
