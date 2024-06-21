import React from 'react';

import PageDescriptionHeader from '@/components/layout/page-description-header';
import PaginatedTeams from '@/components/paginated-teams';

export default async function TeamsPage() {
  return (
    <section className='container p-6 mt-6'>
      <PageDescriptionHeader
        title='Teams'
        description='Explore all the teams and join the one you like.'
      />
      <PaginatedTeams />
    </section>
  );
}
