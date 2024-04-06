import { v4 } from 'uuid';
import { z } from 'zod';

import { messageSchema } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const { text } = await req.json();
    const messageData = {
      msg_id: v4(),
      created_at: new Date().toISOString(),
      text,
    };
    const messageParsedata = messageSchema.parse(messageData);
    const { error: msgError } = await serverSupabase
      .from('messages')
      .insert([messageParsedata]);
    if (msgError) {
      throw new Error(msgError.message);
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
