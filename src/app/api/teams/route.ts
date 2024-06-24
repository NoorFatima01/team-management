import { v4 } from 'uuid';
import { z } from 'zod';

import { teamFormSchema, teamSchemaType } from '@/lib/schemas';
import { getRole } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamData } = body;
    const teamDataParsed = teamFormSchema.parse(teamData);
    const serverSupabase = createSupabaseServerClient();

    //get current user id
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    const role = await getRole(user_id as string);

    if (role === 'TEAM_MEMBER') {
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
    const { team_head, members, ...team } = teamDataParsed;
    if (user_id) {
      const teamDataParsed: teamSchemaType = {
        ...team,
        team_head: user_id,
        team_id: v4(),
        created_at: new Date().toISOString(),
        projects_in_progress: 0,
      };

      members.push(user_id);

      //now add members to team-members table. Also add current user to team-members table and set isteamHead to true for him
      const membersData = members.map((member) => ({
        member_id: member,
        team_id: teamDataParsed.team_id,
        isTeamHead: member === user_id,
      }));

      //map over membersData and get their teams_joined from profiles table and update it
      const updateDataArray = await Promise.all(
        membersData.map(async (member) => {
          const { data: profileData, error } = await serverSupabase
            .from('profiles')
            .select('teams_joined')
            .eq('id', member.member_id);
          if (error) {
            throw new Error(error.message);
          }
          return {
            teams_joined: profileData[0].teams_joined + 1,
            user_id: member.member_id,
            requester_id: user_id,
          };
        })
      );

      await Promise.all(
        updateDataArray.map(async (updateData) => {
          const { error } = await serverSupabase.rpc('update_teams_joined', {
            requester_id: updateData.requester_id,
            user_id: updateData.user_id,
            updated_teams_joined: updateData.teams_joined,
          });
          if (error) {
            throw new Error(error.message);
          }
        })
      );

      //now insert team data
      const { error: teamError } = await serverSupabase
        .from('teams')
        .insert([{ ...teamDataParsed }]);
      if (teamError) {
        throw new Error(teamError.message);
      }

      const { error: teamMembersError } = await serverSupabase
        .from('teams-members')
        .insert(membersData);

      if (teamMembersError) {
        throw new Error('Failed to create team');
      }

      return new Response(JSON.stringify(teamDataParsed), { status: 200 });
    }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 404 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  try {
    const pageSize = 3;
    const pageNumber = parseInt(req.url.split('?')[1].split('page=')[1] || '1');
    const serverSupabase = createSupabaseServerClient();

    //first get total number of teams
    const { data: teamsCount, error: countError } = await serverSupabase
      .from('teams')
      .select('team_id');
    const totalTeams = teamsCount?.length || 0;
    if (totalTeams === 0) {
      const teamsResponse = {
        teams: [],
        totalTeams,
        totalPages: 0,
        currentPage: 1,
      };
      return new Response(JSON.stringify(teamsResponse), { status: 200 });
    }
    if (countError) {
      throw new Error(countError.message);
    }
    const skip = (pageNumber - 1) * pageSize;

    //get only those teams that are in the current page
    const { data: teams, error } = await serverSupabase
      .from('teams')
      .select('team_id, name, description, projects_in_progress, created_at')
      .range(skip, skip + pageSize - 1);
    if (error) {
      throw new Error(error.message);
    }
    const teamsResponse = {
      teams,
      totalTeams,
      totalPages: Math.ceil(totalTeams / pageSize),
      currentPage: pageNumber,
    };
    return new Response(JSON.stringify(teamsResponse), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message);
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
