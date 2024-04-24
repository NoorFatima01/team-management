import { v4 } from 'uuid';
import { z } from 'zod';

import { projectSchema } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const reqData = await req.json();
    const projectData = {
      project_id: v4(),
      ...reqData,
    };

    const projectDataParsed = projectSchema.parse(projectData);

    const { error: projectError } = await serverSupabase
      .from('projects')
      .insert([{ ...projectDataParsed }]);
    if (projectError) {
      throw new Error(projectError.message);
    }
    return new Response(JSON.stringify(projectDataParsed), { status: 201 });
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
