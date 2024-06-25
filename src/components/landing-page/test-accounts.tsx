import React from 'react';

import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

const ACCOUNTS = [
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '12345678',
    details: 'John is a part of 3 teams as a team member',
  },
  {
    name: 'Sarah Brown',
    email: 'sarah@gmail.com',
    password: '12345678',
    details: 'Sarah is part of 2 teams as team head',
  },
  {
    name: 'Ryan Clark',
    email: 'ryan@gmail.com',
    password: '12345678',
    details:
      'Ryan is part of one team as team member and has an invitation from Sarah to join the Security team.',
  },
];

export default function TestAccounts() {
  return (
    <div className='flex flex-col items-center justify-center mb-6 p-4'>
      <h2 className='text-2xl font-bold mb-4'>Test Accounts</h2>
      <p className='text-sm font-bold text-muted-foreground'>
        Login through these accounts to explore the website or make your own
      </p>
      <div className='flex flex-col max-w-4xl'>
        {ACCOUNTS.map((account, index) => (
          <React.Fragment key={index}>
            <div className='flex gap-2 p-4 rounded-lg shadow-sm'>
              <Icons.testUser className='size-8' />
              <div className='flex flex-col justify-between w-1/2'>
                <h3 className='font-semibold'>{account.name}</h3>
                <p>
                  <span className='text-muted-foreground'>Email:</span>{' '}
                  {account.email}
                </p>
                <p>
                  <span className='text-muted-foreground'>Password:</span>{' '}
                  {account.password}
                </p>
              </div>
              <Separator orientation='vertical' className='mx-2 h-20' />
              <div className='flex flex-col justify-center w-1/2'>
                <p className='text-sm'>{account.details}</p>
              </div>
            </div>
            <Separator orientation='horizontal' className='my-4' />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
