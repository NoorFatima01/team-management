import React from 'react';

import { Icons } from '@/components/icons';

const features = [
  {
    heading: 'Create or Join Teams',
    description:
      'Create and manage your own teams. Or join a team as a member.',
    icon: <Icons.add />,
  },
  {
    heading: 'Create Projects',
    description:
      'Create projects, divide them into tasks and keep track of your progress.',
    icon: <Icons.folder />,
  },
  {
    heading: 'Assign Tasks',
    description: 'Assign tasks to your team members and track their progress.',
    icon: <Icons.check />,
  },
  {
    heading: 'Upload and download files',
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
    description: 'Get notified of your team invites.',
    icon: <Icons.bell />,
  },
];

const Features = () => {
  return (
    <section className=' my-12 bg-gradient-to-b '>
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
