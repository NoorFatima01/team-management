import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

import { pusherServer } from '@/lib/pusher';
import { notificationSchema, notificationSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

// those notifications that will only be shown to the team heads
export async function POST(req: Request) {
  const serverSupabase = createSupabaseServerClient();

  const body = await req.json(); //request will contain the text

  const dataForParsing = {
    text: body.text,
    created_at: new Date().toISOString(),
    notf_id: v4(),
  };

  //Parse the body
  let notificationData: notificationSchemaType | undefined = undefined;
  const validationData = notificationSchema.safeParse(dataForParsing);

  if (validationData.success) {
    notificationData = validationData.data;
  } else {
    return NextResponse.json({ error: validationData.error }, { status: 400 });
  }

  //Check if the notificationData exists
  if (!notificationData || notificationData === undefined) {
    // console.log('Notification data does not exist')
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      {
        status: 400,
      }
    );
  }

  //Insert the notification
  const { error } = await serverSupabase
    .from('notifications')
    .insert([notificationData]);

  if (error) {
    // console.log(error.message)
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

  // console.log('inserted')

  //get the list of team_heads from team-members table
  const { data: teamHeads, error: teamHeadsError } = await serverSupabase
    .from('teams-members')
    .select('member_id')
    .eq('isTeamHead', true);

  if (teamHeadsError) {
    // console.log(teamHeadsError.message)

    return NextResponse.json(
      {
        success: false,
        error: teamHeadsError.message,
        message: 'Team heads not fetched from the database',
      },
      {
        status: 500,
      }
    );
  }

  // console.log('teamheads',teamHeads)

  //insert the notification for all team heads in members-notifications table
  teamHeads?.map(async (teamHead) => {
    const memberNotificationData = {
      notf_id: notificationData?.notf_id,
      member_id: teamHead.member_id,
    };

    const { error: memberNotificationError } = await serverSupabase
      .from('members-notifications')
      .insert([memberNotificationData]);

    if (memberNotificationError) {
      // console.log('memerror',memberNotificationError)

      return NextResponse.json(
        {
          success: false,
          error: memberNotificationError.message,
          message:
            'Notification not inserted in the members-notifications table',
        },
        {
          status: 500,
        }
      );
    }
  });

  pusherServer.trigger('bell-dot', 'pink-dot', {});
  pusherServer.trigger(
    'notification',
    'new-notification',
    notificationData as notificationSchemaType
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
