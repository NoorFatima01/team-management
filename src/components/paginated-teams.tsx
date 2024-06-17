'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useSession from '@/lib/supabase/use-session';

import TeamCard from '@/components/team-card';

type Team = {
  team_id: string;
  name: string;
  description: string;
  projects_in_progress: number;
  created_at: string;
};

export default function PaginatedTeams() {
  const session = useSession();
  const userId = session?.user?.id;

  const getTeams = async () => {
    const response = await fetch('/api/teams/?page=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };
  const { data: teamsData } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  });

  const getTeamsUserIsIn = async () => {
    const response = await fetch(`/api/teams/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const { data: userTeamsData } = useQuery({
    queryKey: ['userTeams'],
    queryFn: getTeamsUserIsIn,
  });

  const teams = teamsData?.teams as Team[];
  // const totalPages = teamsData?.totalPages as number;
  // const currentPage = teamsData?.currentPage as number;
  return (
    <section className='mx-auto my-8'>
      <div className='container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-4'>
        {teams?.map((team: Team) => {
          const isUserAlreadyInTeam = userTeamsData?.some(
            (userTeam: Team) => userTeam.team_id === team.team_id
          );
          return (
            <div key={team.team_id}>
              <TeamCard
                isUserAlreadyInTeam={isUserAlreadyInTeam} // Add the prop here
                team_id={team.team_id}
                title={team.name}
                description={team.description}
                projects={team.projects_in_progress}
                createdAt={team.created_at}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
