import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import PageDescriptionHeader from '@/components/layout/page-description-header';

interface TeamsLayoutProps {
  children: React.ReactNode;
}

export default async function TeamsLayout({ children }: TeamsLayoutProps) {
  const serverSupabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();
  const user_id = user?.id;
  if (!user_id) {
    return <div>no user</div>;
  }
  return (
    <div className='container flex flex-col m-3 justify-between space-y-6'>
      <PageDescriptionHeader title='Teams' description='Manage your teams' />
      <main>{children}</main>
    </div>
  );
}
