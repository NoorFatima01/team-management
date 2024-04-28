import { fileRecordSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const body: { file_id: string; path: string } = await req.json();
    const serverSupabase = createSupabaseServerClient();
    const {
      data: { user: serverUser },
    } = await serverSupabase.auth.getUser();
    const user_id = serverUser?.id;
    if (!user_id) {
      throw new Error('User not found');
    }
    const fileData: fileRecordSchemaType = {
      ...body,
      created_at: new Date().toISOString(),
      uploader_id: user_id,
    };
    const { error } = await serverSupabase
      .from('files-uploaders')
      .insert(fileData);
    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
