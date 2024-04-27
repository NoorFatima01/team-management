import { z } from 'zod';

import { taskSchema } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const taskData = taskSchema.parse(body);
    const clientSupabase = createSupabaseServerClient();
    const { data: task, error } = await clientSupabase
      .from('tasks')
      .insert(taskData);
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify(task), { status: 201 });
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
