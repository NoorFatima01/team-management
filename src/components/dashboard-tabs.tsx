'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TABSLIST = [
  {
    name: 'Overview',
    value: 'overview',
    link: '/dashboard',
  },
  {
    name: 'Projects',
    value: 'projects',
    link: '/dashboard/projects',
  },
  {
    name: 'Teams',
    value: 'teams',
    link: '/dashboard/teams',
  },
];

export default function DashboardTabs() {
  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className='w-1/2'>
      <Tabs className='flex flex-col'>
        <TabsList className='flex justify-evenly'>
          {TABSLIST.map((tab) => (
            <TabsTrigger
              className='flex flex-1'
              key={tab.value}
              value={tab.value}
              onClick={() => handleClick(tab.link)}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
