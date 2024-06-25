'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react';

import { teamSchemaType } from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { ProgressBar, ProgressBarLink } from '@/components/progress-bar';
import { buttonVariants } from '@/components/ui/button';

export default function InboxSideBar() {
  const pathname = usePathname();

  const session = useSession();
  const userId = session?.user?.id;

  const fetchTeams = async () => {
    if (!userId) return;
    const response = await fetch(`/api/teams/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['teams', userId],
    queryFn: fetchTeams,
  });
  const teams = data ? (data as teamSchemaType[]) : [];

  if (!userId) return null;
  if (isLoading) {
    return (
      <div className='flex justify-center items-center lg:mt-32'>
        <Icons.spinner
          className='lg:size-20 size-8 animate-spin text-primary-foreground rounded-md p-1'
          aria-hidden='true'
        />
      </div>
    );
  }

  return (
    <ProgressBar className='fixed top-0 left-0 h-1 bg-primary'>
      <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
        {teams.length > 0 ? (
          teams.map((team) => (
            <ProgressBarLink
              href={`/inbox/${team.name}`}
              key={team.team_id}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === `/inbox/${team.name}`
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'text-center'
              )}
            >
              {team.name}
            </ProgressBarLink>
          ))
        ) : (
          <p className='text-sm'>
            Seems like you are not part of any team right now
          </p>
        )}
      </nav>
    </ProgressBar>
  );
}
