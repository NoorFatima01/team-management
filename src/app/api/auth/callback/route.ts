import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');

  // if "next" is in param, use it in the redirect URL
  // const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(origin);
    }
  }

  // TODO:
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
