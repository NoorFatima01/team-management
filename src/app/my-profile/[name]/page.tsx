import React from 'react';

import { getUser } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import { ProfileForm } from '@/components/forms/profile-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

const AccountPage = async () => {
  const user = await getUser();
  const user_id = user?.id;

  if (!user_id) return <div>Not logged In</div>;
  const serverSupabase = createSupabaseServerClient();

  const { data: userData } = await serverSupabase
    .from('profiles')
    .select('username, email, role')
    .eq('id', user_id)
    .single();
  const defaultValues = {
    username: userData?.username as string,
    email: userData?.email as string,
  };
  return (
    <div>
      <PageDescriptionHeader
        title='Account'
        description='Edit your account details'
      />
      <ProfileForm defaultValues={defaultValues} role={userData?.role} />
    </div>
  );
};

export default AccountPage;
