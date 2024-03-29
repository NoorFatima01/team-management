'use client';
import Link from 'next/link';

import { memberSchemaType } from '@/lib/schemas';
import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

const UserProfile = () => {
  const memberData: memberSchemaType | null = null;

  //TODO: get user data from the database using useQuery

  if (!memberData) return <h1>Not Registered as an employee</h1>;
  return (
    <>
      <div className='flex flex-col gap-4 '>
        <div className='flex items-center gap-x-2'>
          {/* Name */}
          <div></div>
        </div>

        {/* Open to work or not */}
        <span className='bg-green-800 border-2 border-white rounded-lg py-1 px-2 font-bold w-[8rem]'></span>

        {/* Team */}

        {/* Role */}

        {/* Chat */}
        <Link
          href='/inbox/' //TODO: add /team name in here later on
          className={cn(buttonVariants({ variant: 'ghost' }), 'justify-center')}
        >
          Chat
        </Link>

        {/* Pending Invitations */}
      </div>
    </>
  );
};

export default UserProfile;
