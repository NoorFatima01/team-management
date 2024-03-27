'use client';

import { useRouter } from 'next/navigation';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button variant='outline' size='sm' onClick={handleLogout}>
      Logout
    </Button>
  );
}
