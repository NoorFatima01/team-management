import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { type NextRequest, type NextResponse } from 'next/server';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constant/env';

// server component can only get cookies and not set them, hence the "component" check
export function createSupabaseServerClient(component = false) {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return getCookie(name, { cookies });
      },
      set(name: string, value: string, options: CookieOptions) {
        if (component) return;
        setCookie(name, value, { cookies, ...options });
      },
      remove(name: string, options: CookieOptions) {
        if (component) return;
        deleteCookie(name, { cookies, ...options });
      },
    },
  });
}

export function createSupabaseServerComponentClient() {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createSupabaseServerClient(true);
}

export function createSupabaseReqResClient(
  req: NextRequest,
  res: NextResponse
) {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
