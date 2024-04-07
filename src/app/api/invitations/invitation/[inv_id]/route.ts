import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function PUT(
  req: Request,
  { params }: { params: { inv_id: string } }
) {
  //get id from api url
  const inv_id = params.inv_id;
  const body = await req.json(); //body will contain status

  const serverSupabase = createSupabaseServerClient();

  const { data: invitationData, error } = await serverSupabase
    .from('invitations')
    .update({ inv_status: body.status })
    .eq('inv_id', inv_id);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, data: invitationData },
    { status: 200 }
  );
}
