import React from 'react';

import { getRole, getUser } from '@/lib/server-user';

import Invitations from '@/components/pending-invitations';

export default async function InvitationsPage() {
  const user = await getUser();
  if (!user) {
    return <div>no user</div>;
  }
  const userId = user.id as string;
  const role = await getRole(userId);

  return (
    <div>
      <Invitations role={role} />
    </div>
  );
}
