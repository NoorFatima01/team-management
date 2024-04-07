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

  const allNotificationIds: string[] = [];

  //fetch from members-notifications table all the notf_id where the member_id is userId
  const { data: memberNotifications, error: memberNotificationError } =
    await supabase.from('members-notifications').select('notf_id');
  if (memberNotificationError) {
    return NextResponse.json(
      { success: false, error: memberNotificationError.message },
      { status: 500 }
    );
  }

  memberNotifications.map((notification) => {
    allNotificationIds.push(notification.notf_id);
  });

  //fetch from the notifications table all the notifications where notf_id is in allNotificationIds and the notifications have not been read yet
  const { data: notifications, error: error3 } = await supabase
    .from('notifications')
    .select()
    .in('notf_id', allNotificationIds)
    .eq('read', false);

  if (error3) {
    return NextResponse.json(
      { success: false, error: error3.message },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { success: true, data: notifications },
    { status: 200 }
  );
}
