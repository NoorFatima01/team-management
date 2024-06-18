'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { teamSchemaType } from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';
import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

export default function InboxSideBar() {
  const pathname = usePathname();
  const [teams, setTeams] = useState<teamSchemaType[]>([]);
  const session = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchTeams = async () => {
      const response = await fetch(`/api/teams/${userId}`);
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
  }, [userId]);

  if (!userId) return null;

  return (
    <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
      {teams.length > 0 ? (
        teams.map((team) => (
          <Link
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
          </Link>
        ))
      ) : (
        <p>No teams found</p>
      )}
    </nav>
  );
}
