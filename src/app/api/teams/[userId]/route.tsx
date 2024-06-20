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
