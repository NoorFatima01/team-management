import React from 'react';

import { teamSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import TeamsTabs from '@/components/teams-tabs';

export default async function TeamsPage() {
  const serverSupabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();
  const user_id = user?.id;
  if (!user_id) {
    return <div>no user</div>;
  }

  const { data: teamsIds } = await serverSupabase
    .from('teams-members')
    .select('team_id')
    .eq('member_id', user_id);
  if (!teamsIds) {
    return <div>no teams</div>;
  }
  const { data: teams } = await serverSupabase
    .from('teams')
    .select('*')
    .in(
      'team_id',
      teamsIds.map(({ team_id }) => team_id)
    );

  const userTeams = teams as teamSchemaType[];

  return (
    <div>
      <TeamsTabs teams={userTeams} />
    </div>
  );
}
