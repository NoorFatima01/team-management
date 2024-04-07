interface InboxLayoutProps {
  children: React.ReactNode;
}

import React from 'react';

import InboxSideBar from '@/components/layout/inbox-sidebar';
import PageDescriptionHeader from '@/components/layout/page-description-header';
import { Separator } from '@/components/ui/separator';

export default function InboxLayout({ children }: InboxLayoutProps) {
  return (
    <div className='container m-3 flex flex-col justify-start items-start spcae-y-6 h-[40rem]'>
      <PageDescriptionHeader
        title='Inbox'
        description='Connect through Messages'
      />

      <div className='w-full h-full flex flex-col lg:flex-row space-y-2'>
        <div className='p-4'>
          <InboxSideBar />
        </div>
        <Separator orientation='vertical' className='hidden lg:block' />
        <Separator orientation='horizontal' className='block lg:hidden' />
        <div className='flex-1 lg:self-end p-4'>{children}</div>
      </div>
    </div>
  );
}
