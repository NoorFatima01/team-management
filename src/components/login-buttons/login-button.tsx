'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Button } from '@/components/ui/button';

export default function LoginButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback?next=${
          props.nextUrl || ''
        }`,
      },
    });
  };

  return (
    <Button size='sm' onClick={handleLogin}>
      Login
    </Button>
  );
}
