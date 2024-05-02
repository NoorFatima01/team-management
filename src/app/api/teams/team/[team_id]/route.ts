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

  //also update the member_id open to work to false
  const { error: error2 } = await serverSupabase
    .from('members')
    .update({ open_to_work: false })
    .eq('member_id', body.member_id);

  if (error2) {
    return new Response(
      JSON.stringify({ success: false, error: error2.message }),
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
    const { team_id } = params;

    const serverSupabase = createSupabaseServerClient();
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
