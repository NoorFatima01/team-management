'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Button } from '@/components/ui/button';

export default function LoginWithGoogleButton(props: { nextUrl?: string }) {
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth/callback?next=${
          props.nextUrl || ''
        }`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  return (
    <Button size='sm' onClick={handleLogin}>
      Login with Google
    </Button>
  );
}
