import { v4 } from 'uuid';
import { z } from 'zod';

import { teamFormSchema, teamSchemaType } from '@/lib/schemas';
import { getRole } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const teamData = teamFormSchema.parse(body);
    const serverSupabase = createSupabaseServerClient();

    //get current user id
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    const role = await getRole(user_id as string);

    if (role === 'TEAM_MEMBER') {
      //delete team head from members
      const { error: membersError } = await serverSupabase
        .from('members')
        .delete()
        .eq('member_id', user_id);
      if (membersError) {
        throw new Error(membersError.message);
      }

      //update role to TEAM_HEAD
      const { error: roleError } = await serverSupabase
        .from('profiles')
        .update({ role: 'TEAM_HEAD' })
        .eq('id', user_id);
      if (roleError) {
        throw new Error(roleError.message);
      }
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { team_head, members, ...team } = teamData;
    if (user_id) {
      const teamData: teamSchemaType = {
        ...team,
        team_head: user_id,
        team_id: v4(),
        created_at: new Date().toISOString(),
        projects_done: 0,
        projects_in_progress: 0,
      };

      members.push(user_id);

      //now add members to team-members table. Also add current user to team-members table and set isteamHead to true for him
      const membersData = members.map((member) => ({
        member_id: member,
        team_id: teamData.team_id,
        isTeamHead: member === user_id,
      }));

      const { error: teamMembersError } = await serverSupabase
        .from('teams-members')
        .insert(membersData);

      if (teamMembersError) {
        throw new Error('Failed to create team');
      }

      //now insert team data
      const { error: teamError } = await serverSupabase
        .from('teams')
        .insert([{ ...teamData }]);
      if (teamError) {
        throw new Error('Failed to create team');
      }

      return new Response(JSON.stringify(teamData), { status: 200 });
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
