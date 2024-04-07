import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User Id not found' },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServerClient();

  //get the invitations where the member_id is equal to the userId and acceptance is pending
  const { data: invitations, error } = await supabase
    .from('invitations')
    .select()
    .eq('member_id', userId)
    .eq('inv_status', 'PENDING');

  if (error) {
    return NextResponse.json({ success: false, error: error.message });
  }

  return NextResponse.json(
    { success: true, data: invitations },
    { status: 200 }
  );
}
