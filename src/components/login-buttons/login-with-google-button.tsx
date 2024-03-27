import { createSupabaseServerComponentClient } from '@/lib/supabase/server-clients';

import LoginButton from './login-button';
import LogoutButton from './logout-button';
//make this not use client, get the session from the server client
export default async function GoogleLoginButton() {
  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  const user = session?.user;
  return <>{user ? <LogoutButton /> : <LoginButton />}</>;
}
