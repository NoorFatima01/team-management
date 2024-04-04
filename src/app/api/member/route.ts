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

    //upgrade role to member in profiles table
    const { error: roleError } = await serverSupabase
      .from('profiles')
      .update({ role: 'TEAM_MEMBER' })
      .eq('id', user_id);
    if (roleError) {
      throw new Error(roleError.message);
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

//get only those members who are open to work except current user if he is in members table
export async function GET() {
  try {
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    const { data: membersWithProfiles, error } = await serverSupabase
      .from('profiles')
      .select('email, username, id, members(open_to_work)')
      .eq('members.open_to_work', true);

    if (error) {
      throw new Error(error.message);
    }
    const availableMembers = membersWithProfiles.filter(
      (member) => member.id !== user_id
    );
    return new Response(JSON.stringify(availableMembers), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
