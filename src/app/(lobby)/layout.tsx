import React from 'react';

import { getUser } from '@/lib/server-user';

import SiteHeader from '@/components/layout/site-header';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

export default async function LobbyLayout({ children }: LobbyLayoutProps) {
  const user = await getUser();

  const siteHeaderUser = {
    name: user?.user_metadata.full_name,
    email: user?.email,
    image: user?.user_metadata.avatar_url,
  };
  return (
    <div>
      <SiteHeader user={siteHeaderUser} />
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_115%_at_50%_10%,#000_40%,#135A13_100%)]'></div>

      <main>{children}</main>
    </div>
  );
}
