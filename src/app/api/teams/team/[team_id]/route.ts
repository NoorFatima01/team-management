import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(
  req: Request,
  { params }: { params: { team_id: string } }
) {
  const team_id = params.team_id;

  const body = await req.json(); //body will contain member_id

  const serverSupabase = createSupabaseServerClient();

  //update the team with the new member
  const { error } = await serverSupabase
    .from('teams-members')
    .insert([{ team_id, member_id: body.member_id, isTeamHead: false }]);

  if (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { team_id: string } }
) {
  try {
    const team_id = params.team_id;
    const teamHead = await req.json();
    const serverSupabase = createSupabaseServerClient();

    //before deleting team, get all members of the team
    const { data: membersData, error: membersError } = await serverSupabase
      .from('teams-members')
      .select('member_id')
      .eq('team_id', team_id);
    if (membersError) {
      throw new Error(membersError.message);
    }

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
          teams_joined: profileData[0].teams_joined - 1,
          user_id: member.member_id,
          requester_id: teamHead.userId,
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

    //delete team
    const { error } = await serverSupabase
      .from('teams')
      .delete()
      .eq('team_id', team_id);
    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { team_id: string } }
) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    if (!user_id) {
      throw new Error('User not found');
    }
    const { team_id } = params;
    const teams_joined = await req.json();
    const newMemberData = {
      team_id,
      member_id: user_id,
      isTeamHead: false,
    };
    const { data, error } = await serverSupabase
      .from('teams-members')
      .insert(newMemberData);
    if (error) {
      throw new Error(error.message);
    }

    //also increase teams_joined in profiles by 1
    const { error: profileError } = await serverSupabase
      .from('profiles')
      .update({ teams_joined: teams_joined.teams_joined })
      .eq('id', user_id);
    if (profileError) {
      throw new Error(profileError.message);
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message);
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
