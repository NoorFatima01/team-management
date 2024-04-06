import { v4 } from 'uuid';
import { z } from 'zod';

import { pusherServer } from '@/lib/pusher';
import { messageSchema } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await serverSupabase.auth.getUser();
    if (!user) {
      throw new Error('User not found');
    }
    const user_id = user.id;
    const { text, teamId } = await req.json();
    const messageData = {
      msg_id: v4(),
      created_at: new Date().toISOString(),
      text,
    };
    const teamChatRoomData = {
      team_id: teamId,
      msg_id: messageData.msg_id,
      sender_id: user_id,
    };

    const messageParsedata = messageSchema.parse(messageData);
    const { error: msgError } = await serverSupabase
      .from('messages')
      .insert([messageParsedata]);
    if (msgError) {
      throw new Error(msgError.message);
    }
    //Now add to teamChatRoom
    const { error: teamChatRoomError } = await serverSupabase
      .from('teamChatRoom')
      .insert([teamChatRoomData]);
    if (teamChatRoomError) {
      throw new Error(teamChatRoomError.message);
    }

    //get username from profiles table
    const { data: profileData, error: profileError } = await serverSupabase
      .from('profiles')
      .select('username')
      .eq('id', user_id);
    if (profileError) {
      throw new Error(profileError.message);
    }
    const sender_name = profileData && profileData[0].username;
    if (sender_name && sender_name.length > 0) {
      pusherServer.trigger(teamId, 'incoming-chat', {
        message: messageData.text,
        sender_name,
        sender_id: user_id,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
