import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseReqResClient } from '@/lib/supabase/server-clients';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabaseReqResClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user && request.nextUrl.pathname.startsWith('/my-profile')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/my-profile'],
};
