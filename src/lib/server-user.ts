import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function getUser() {
  const {
    data: { user },
  } = await createSupabaseServerClient().auth.getUser();
  return user;
}

export async function getRole(user_id: string) {
  try {
    const { data, error } = await createSupabaseServerClient()
      .from('profiles')
      .select('role')
      .eq('id', user_id);
    if (error) throw error;
    return data[0].role;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
