import React from 'react';

import { memberTableSchemaType, teamSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import TeamsTabs from '@/components/teams-tabs';

export default async function TeamsPage() {
  const serverSupabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();
  const user_id = user?.id;
  if (!user_id) {
    return (
      <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
        <p className='text-muted-foreground text-sm text-center'>
          No user. Login to view teams
        </p>
      </div>
    );
  }

  //get teams
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

  //get members of the teams
  const membersWithTeamIds = await Promise.all(
    userTeams.map(async (team) => {
      const { data: membersIds } = await serverSupabase
        .from('teams-members')
        .select('member_id')
        .eq('team_id', team.team_id);
      // .eq('isTeamHead', false);

      const { data: members } = await serverSupabase
        .from('profiles')
        .select('*')
        .in(
          'id',
          membersIds?.map((member) => member.member_id) ?? [] //Add nullish coalescing operator
        );

      const teamMembers: memberTableSchemaType[] =
        members?.map((member) => {
          return {
            username: member.username as string,
            member_id: member.id as string,
            email: member.email as string,
          };
        }) ?? [];
      return {
        team_id: team.team_id,
        members: teamMembers,
      };
    })
  );

  return (
    <div>
      <TeamsTabs teams={userTeams} membersWithTeamIds={membersWithTeamIds} />
    </div>
  );
}
