import React from 'react';

import { getRole, getUser } from '@/lib/server-user';

import AccountNav from '@/components/layout/account-nav';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const user = await getUser();
  const role = await getRole(user?.id as string);

  const accountNavUser = {
    name: user?.user_metadata.full_name,
    email: user?.email,
    image: user?.user_metadata.avatar_url,
    id: user?.id as string,
    role,
  };

  return (
    <div>
      <AccountNav user={accountNavUser}>{children}</AccountNav>
    </div>
  );
}
