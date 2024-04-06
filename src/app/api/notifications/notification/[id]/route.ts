import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //get id from api url
    const notf_id = params.id;
    //body will contain true
    const body = await req.json();
    const serverSupabase = createSupabaseServerClient();

    //update the read status of the notification
    const { error } = await serverSupabase
      .from('notifications')
      .update({ read: body.read })
      .eq('notf_id', notf_id);

    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
