import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import { memberProfile } from '@/types';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const supabase = createSupabaseServerClient();

  //first check role of user
  const { data: roleData, error: roleError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId);

  if (roleError) {
    return NextResponse.json(
      { success: false, error: roleError.message },
      { status: 500 }
    );
  }

  if (roleData[0].role === 'USER') {
    return NextResponse.json(
      { success: true, memberData: null },
      { status: 200 }
    );
  }

  const { data: memberInfo, error: memberInfoError } = await supabase
    .from('profiles')
    .select('email, username, members(open_to_work),role')
    .eq('id', userId);

  if (memberInfoError) {
    return NextResponse.json(
      { success: false, error: memberInfoError.message },
      { status: 500 }
    );
  }

  const { data: teamId, error: teamIdError } = await supabase
    .from('teams-members')
    .select('team_id')
    .eq('member_id', userId); //this will give us team id

  if (teamIdError) {
    return NextResponse.json(
      { success: false, error: teamIdError.message },
      { status: 500 }
    );
  }

  //find team name only if user is part of a team i.e. teamId is not empty

  if (teamId.length === 0) {
    const entireProfile = {
      id: userId,
      email: memberInfo[0].email,
      username: memberInfo[0].username,
      open_to_work: true,
      role: memberInfo[0].role,
      team: null,
    };
    return NextResponse.json({ success: true, memberData: entireProfile });
  }

  const { data: teamInfo, error: teamInfoError } = await supabase
    .from('teams')
    .select('name')
    .eq('team_id', teamId[0].team_id); //this will give us team name

  if (teamInfoError) {
    return NextResponse.json(
      { success: false, error: teamInfoError.message },
      { status: 500 }
    );
  }

  const entireProfile: memberProfile = {
    id: userId,
    email: memberInfo[0].email,
    username: memberInfo[0].username,
    open_to_work: false,
    role: memberInfo[0].role,
    team: teamInfo[0].name,
  };

  return NextResponse.json(
    { success: true, memberData: entireProfile },
    { status: 200 }
  );
}
