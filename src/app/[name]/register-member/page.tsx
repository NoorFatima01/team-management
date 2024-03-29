import React from 'react';

import { getUser } from '@/lib/server-user';

import RegisterMemberForm from '@/components/forms/register-member-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

export default async function RegisterMemberPage() {
  const user = await getUser();
  const EmployeeFormUser = {
    name: user?.user_metadata.full_name,
    email: user?.email,
  };
  return (
    <div className='flex flex-col gap-6 mt-8'>
      <PageDescriptionHeader
        title='Register Member'
        description='Form for member registration'
      />
      <RegisterMemberForm user={EmployeeFormUser} />
    </div>
  );
}
