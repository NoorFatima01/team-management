import React from 'react';

import { getRole, getUser } from '@/lib/server-user';

import Invitations from '@/components/pending-invitations';

export default async function InvitationsPage() {
  const user = await getUser();
  if (!user) {
    return (
      <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
        <p className='text-muted-foreground text-sm text-center'>
          No user. Login to view invitations
        </p>
      </div>
    );
  }
  const userId = user.id as string;
  const role = await getRole(userId);

  return (
    <div>
      <Invitations role={role} />
    </div>
  );
}
