import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { type NextRequest, type NextResponse } from 'next/server';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constant/env';

export function createSupabaseReqResClient(
  req: NextRequest,
  res: NextResponse
) {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerClient(SUPABASE_URL as string, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return getCookie(name, { req, res });
      },
      set(name: string, value: string, options: CookieOptions) {
        setCookie(name, value, { req, res, ...options });
      },
      remove(name: string, options: CookieOptions) {
        setCookie(name, '', { req, res, ...options });
      },
    },
  });
}

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(SUPABASE_URL as string, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return supabase;
};
