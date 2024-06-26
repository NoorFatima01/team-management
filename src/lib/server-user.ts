import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server-clients';

export async function getUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getRole(user_id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
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
