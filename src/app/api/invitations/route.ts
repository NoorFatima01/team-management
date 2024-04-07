import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

import { invitationSchema, invitationSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  let body = await req.json(); //body will contain text, member_id

  const serverSupabase = createSupabaseServerClient();

  const {
    data: { user: serverUser },
  } = await serverSupabase.auth.getUser();
  const user_id = serverUser?.id;

  //append accpetance, id, and deptHead_id to the body
  body = {
    ...body,
    inv_id: v4(),
    teamHead_id: user_id,
    status: 'PENDING',
  };

  let invitationData: invitationSchemaType | undefined = undefined;

  //parse the body
  const parsedData = invitationSchema.safeParse(body);

  if (parsedData.success) {
    invitationData = parsedData.data;
  } else {
    return NextResponse.json(
      { success: false, error: parsedData.error },
      { status: 400 }
    );
  }

  //Check if invitationData exists
  if (!invitationData) {
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 400 }
    );
  }

  //insert in database
  const { error } = await serverSupabase
    .from('invitations')
    .insert([invitationData]);

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Invitation not inserted in the database',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
