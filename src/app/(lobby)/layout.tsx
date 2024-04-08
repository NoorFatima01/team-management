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
      <main>{children}</main>
    </div>
  );
}
