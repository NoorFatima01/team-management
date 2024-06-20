import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

import { pusherServer } from '@/lib/pusher';
import { notificationSchema, notificationSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  let body = await req.json(); //body will contain the text of the notification and id of the member
  const { member_id } = body;
  const serverSupabase = createSupabaseServerClient();

  const {
    data: { user: serverUser },
  } = await serverSupabase.auth.getUser();
  const user_id = serverUser?.id;

  //add read, id and created at to the body
  body = {
    ...body,
    read: false,
    created_at: new Date().toISOString(),
    notf_id: v4(),
  };

  //Parse the body
  let notificationData: notificationSchemaType | undefined = undefined;
  const validationResult = notificationSchema.safeParse(body);
  if (validationResult.success) {
    notificationData = validationResult.data;
  } else {
    return NextResponse.json(
      { success: false, error: validationResult.error },
      {
        status: 400,
      }
    );
  }

  //Check if the notificationData exists
  if (!notificationData) {
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      {
        status: 400,
      }
    );
  }

  //insert the notificationData into the database
  const { error } = await serverSupabase
    .from('notifications')
    .insert([notificationData]);

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Notification not inserted in the database',
      },
      {
        status: 500,
      }
    );
  }

  //also add notf_id and emp_id to the empNotifications table
  const { error: error2 } = await serverSupabase
    .from('members-notifications')
    .insert([{ notf_id: notificationData.notf_id, member_id: member_id }]);

  if (error2) {
    return NextResponse.json(
      {
        success: false,
        error: error2.message,
        message: 'Data not inserted in the employeeNotifications table',
      },
      {
        status: 500,
      }
    );
  }

  //only show real time notification to the user who matched the member_id
  if (member_id == user_id) {
    pusherServer.trigger('bell-dot', 'pink-dot', {});
    pusherServer.trigger(
      'notification',
      'new-notification',
      notificationData as notificationSchemaType
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
