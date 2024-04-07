'use client';
import { useQuery } from '@tanstack/react-query';

import useSession from '@/lib/supabase/use-session';

import Invitations from '@/components/pending-invitations';

import { memberProfile } from '@/types';

const UserProfile = () => {
  const session = useSession();
  const user = session?.user;
  const userId = user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['memberProfile', userId],
    queryFn: async () => {
      if (!userId) {
        return <h1>Not Logged in</h1>;
      }
      const response = await fetch(`/api/member/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    },
    retry: 10,
  });
  //TODO: improve this logic to not show the glitch
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to fetch user profile</h1>;
  const memberData: memberProfile = data?.memberData;
  if (data && !memberData) return <h1>Not Registered as a Member</h1>;

  return (
    <>
      <div className='space-y-2'>
        <div className='flex flex-col'>
          {/* Name */}
          <div className='text-2xl font-bold'>{memberData?.username}</div>
          <div className='text-sm font-light'>{memberData?.email}</div>
        </div>

        {/* Open to work or not */}
        <div>
          <span className='font-semibold'>Availability: </span>
          {memberData?.open_to_work ? (
            <span className='text-green-800 py-1 px-2'>Open to work</span>
          ) : (
            <span className='text-red-500 rounded-lg py-1 px-2'>
              Not open to work
            </span>
          )}
        </div>

        {/* Team */}
        <div>
          <span className='font-semibold'>Team: </span>
          {memberData?.team ? (
            <span>{memberData?.team}</span>
          ) : (
            <span>No team joined yet</span>
          )}
        </div>
        {/* Role */}
        <div>
          <span className='font-semibold'>Role: </span>
          <span>{memberData?.role}</span>
        </div>

        {/* Pending Invitations */}
        <Invitations />
      </div>
    </>
  );
};

export default UserProfile;
