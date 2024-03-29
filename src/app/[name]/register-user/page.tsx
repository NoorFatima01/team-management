import React from 'react';

import { getUser } from '@/lib/server-user';

import RegisterUserForm from '@/components/forms/register-user-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

export default async function RegisterUserPage() {
  const user = await getUser();
  const EmployeeFormUser = {
    name: user?.user_metadata.full_name,
    email: user?.email,
  };
  return (
    <div className='flex flex-col gap-6 mt-8'>
      <PageDescriptionHeader
        title='Register User'
        description='Form for employee registration'
      />
      <RegisterUserForm user={EmployeeFormUser} />
    </div>
  );
}
