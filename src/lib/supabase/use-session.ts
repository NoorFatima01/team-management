'use client';

import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { createSupabaseBrowserClient } from './browser-clients';

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();
  }, []);

  return session;
}
