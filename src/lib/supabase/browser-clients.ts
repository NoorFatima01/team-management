import { createBrowserClient } from '@supabase/ssr';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constant/env';

export function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
