import { createSupabaseServerComponentClient } from '@/lib/supabase/server-clients';

import LoginButton from './login-button';
import LogoutButton from './logout-button';

export default async function GoogleLoginButton() {
  const {
    data: { session },
  } = await createSupabaseServerComponentClient().auth.getSession();

  const user = session?.user;
  return <>{user ? <LogoutButton /> : <LoginButton />}</>;
}
