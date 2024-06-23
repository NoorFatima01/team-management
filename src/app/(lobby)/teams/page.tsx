import React from 'react';

import { getRole, getUser } from '@/lib/server-user';

import PageDescriptionHeader from '@/components/layout/page-description-header';
import PaginatedTeams from '@/components/paginated-teams';

export default async function TeamsPage() {
  const user = await getUser();
  const user_id = user?.id as string;
  const role = await getRole(user_id);
  return (
    <section className='container p-6 mt-6'>
      <PageDescriptionHeader
        title='Teams'
        description='Explore all the teams and join the one you like.'
      />
      <PaginatedTeams role={role} />
    </section>
  );
}
