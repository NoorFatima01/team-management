import React from 'react';

import { getRole, getUser } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import CreateTeamForm from '@/components/forms/create-team-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

export default async function CreateTeamPage() {
  const serverSupabase = createSupabaseServerClient();
  const user = await getUser();
  const teamFormUser = {
    name: user?.user_metadata.full_name,
    id: user?.id as string,
  };
  const role = await getRole(teamFormUser.id);
  const { data } = await serverSupabase
    .from('profiles')
    .select('teams_joined')
    .eq('id', teamFormUser.id)
    .single();

  if (!data) {
    return <div>no data</div>;
  }
  const teamsJoined = data.teams_joined;

  return (
    <div className='flex flex-col gap-6 mt-8'>
      <PageDescriptionHeader
        title='Create Team'
        description='Form for the new team'
      />
      <CreateTeamForm
        user={teamFormUser}
        isNotTeamHead={teamsJoined > 0 && role !== 'TEAM_HEAD'}
      />
    </div>
  );
}
