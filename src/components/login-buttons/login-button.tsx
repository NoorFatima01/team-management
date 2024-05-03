'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useLogInStatusStore } from '@/lib/store';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';
import useSession from '@/lib/supabase/use-session';

import LoginDialog from '@/components/login-buttons/login-dialog';

import LogoutButton from './logout-button';

export default function LoginButton() {
  const user = useSession()?.user;
  const { logInStatus, setLogInStatus } = useLogInStatusStore();

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setLogInStatus(false);
  };

  useEffect(() => {
    setLogInStatus(!!user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {logInStatus ? <LogoutButton onLogout={handleLogout} /> : <LoginDialog />}
    </>
  );
}
