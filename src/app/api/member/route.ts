import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

// eslint-disable-next-line unused-imports/no-unused-vars
export async function POST(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;

    const memberData = {
      member_id: user_id,
      created_at: new Date().toISOString(),
      open_to_work: true,
    };
    const { error } = await serverSupabase
      .from('members')
      .insert([{ ...memberData }]);
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

//get only those members who are open to work
export async function GET() {
  try {
    const serverSupabase = createSupabaseServerClient();
    const { data: membersWithProfiles, error } = await serverSupabase
      .from('profiles')
      .select('email, username, id, members(open_to_work)')
      .eq('members.open_to_work', true);

    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify(membersWithProfiles), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
