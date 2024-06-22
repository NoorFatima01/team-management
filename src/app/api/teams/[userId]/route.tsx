import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) throw new Error('User id is required');

    const supabase = createSupabaseServerClient();

    const { data: teamsIdsUserIsIn, error: idsError } = await supabase
      .from('teams-members')
      .select('team_id')
      .eq('member_id', userId);

    if (idsError) {
      throw new Error(idsError.message);
    }

    const { data: teamsUserIsIn, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .in(
        'team_id',
        teamsIdsUserIsIn?.map(({ team_id }) => team_id)
      );

    if (teamsError) {
      throw new Error(teamsError.message);
    }
    return new Response(JSON.stringify(teamsUserIsIn), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) throw new Error('User id is required');
    const teamId = await req.json();

    const supabase = createSupabaseServerClient();

    const { error: deleteError } = await supabase
      .from('teams-members')
      .delete()
      .match({ team_id: teamId.team_id, member_id: userId });

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    //get teamsJoined from profiles table
    const { data } = await supabase
      .from('profiles')
      .select('teams_joined')
      .eq('id', userId);

    const teamsJoined = data?.[0]?.teams_joined - 1 || 0;
    //put it back in the table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ teams_joined: teamsJoined })
      .eq('id', userId);
    if (profileError) {
      throw new Error(profileError.message);
    }
    return new Response(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
