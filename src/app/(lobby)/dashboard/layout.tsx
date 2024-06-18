import React from 'react';

import DashboardTabs from '@/components/dashboard-tabs';
import PageDescriptionHeader from '@/components/layout/page-description-header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='container flex flex-col gap-6 mt-6 p-6'>
      <PageDescriptionHeader title='Dashboard' description='Manage Your Work' />
      <DashboardTabs />
      <main>{children}</main>
    </div>
  );
}
