import React from 'react';

import SiteHeader from '@/components/layout/site-header';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default function LobbyLayout({ children }: LobbyLayoutProps) {
  //create a dummy user
  const siteHeaderUser = {
    name: 'John Doe',
    email: 'jhon@gmail.com',
  };
  return (
    <div>
      <SiteHeader user={siteHeaderUser} />

      <main>{children}</main>
    </div>
  );
}
