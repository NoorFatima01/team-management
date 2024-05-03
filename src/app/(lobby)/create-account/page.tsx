import React from 'react';

import UserSignupForm from '@/components/forms/user-signup-form';
import PageDescriptionHeader from '@/components/layout/page-description-header';

const CreateAccountPage = () => {
  return (
    <div className='flex flex-col gap-6 mt-8 mb-6'>
      <div className='ml-6'>
        <PageDescriptionHeader
          title='Sign Up Form'
          description='Create a new account to get started with your journey.'
        />
      </div>
      <UserSignupForm />
    </div>
  );
};

export default CreateAccountPage;
