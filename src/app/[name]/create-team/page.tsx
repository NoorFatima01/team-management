import React from 'react';

import { getUser } from '@/lib/server-user';

import CreateTeamForm from '@/components/forms/create-team-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

export default async function CreateTeamPage() {
  const user = await getUser();
  const teamFormUser = {
    name: user?.user_metadata.full_name,
    id: user?.id as string,
  };
  return (
    <div className='flex flex-col gap-6 mt-8'>
      <PageDescriptionHeader
        title='Create Team'
        description='Form for the new team'
      />
      <CreateTeamForm user={teamFormUser} />
    </div>
  );
}
