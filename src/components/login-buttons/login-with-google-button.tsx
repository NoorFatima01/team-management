'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';
import useSession from '@/lib/supabase/use-session';

import LoginButton from './login-button';
import LogoutButton from './logout-button';

export default function GoogleLoginButton() {
  const user = useSession()?.user;
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <>
      {isLoggedIn ? <LogoutButton onLogout={handleLogout} /> : <LoginButton />}
    </>
  );
}
