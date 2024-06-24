import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

//get other users for team creation
export async function GET() {
  try {
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    const { data: availableMembers, error } = await serverSupabase
      .from('profiles')
      .select('email, username, id')
      .neq('id', user_id)
      .neq('role', 'TEAM_HEAD')
      .neq('teams_joined', 3);

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(availableMembers), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
