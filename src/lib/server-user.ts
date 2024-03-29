import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function getUser() {
  const {
    data: { user },
  } = await createSupabaseServerClient().auth.getUser();
  return user;
}
