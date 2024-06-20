'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import useSession from '@/lib/supabase/use-session';

import Pagination from '@/components/pagination';
import TeamCard from '@/components/team-card';
import { Skeleton } from '@/components/ui/skeleton';

export type Team = {
  team_id: string;
  name: string;
  description: string;
  projects_in_progress: number;
  created_at: string;
};

const divs = Array.from({ length: 3 }, (_, i) => i);

export default function PaginatedTeams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const session = useSession();
  const userId = session?.user?.id;
  function handlePageChange(newPage: number) {
    router.push(`/teams?page=${newPage}`);

    setPage(newPage);
  }
  const getTeams = async () => {
    const response = await fetch(`/api/teams/?page=${page}`, {
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
  const {
    data: teamsData,
    isLoading: isTeamDataLoading,
    isFetching: isTeamDataFetching,
  } = useQuery({
    queryKey: ['teams', page],
    queryFn: getTeams,
  });

  const getTeamsUserIsIn = async () => {
    if (!userId) return [];
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

  const userTeamQuery = useQuery({
    queryKey: ['userTeams'],
    queryFn: getTeamsUserIsIn,
    //make it refetch again after the first fetch cuz for some reason the team on the first fetch is not showing

    refetchInterval: 1000,
  });

  const teams = teamsData?.teams as Team[];
  const totalPages = teamsData?.totalPages as number;
  const currentPage = teamsData?.currentPage as number;
  if (isTeamDataFetching || isTeamDataLoading) {
    return (
      <div className='container grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 my-4'>
        {divs.map((div) => (
          <div key={div}>
            <Skeleton className=' h-64 w-[420px] rounded-lg' />
          </div>
        ))}
      </div>
    );
  }
  return (
    <section className='mx-auto my-8'>
      <div className='container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-4'>
        {teams?.map((team: Team) => {
          return (
            <div key={team.team_id}>
              <TeamCard
                isUserLoggedIn={!!session?.user}
                userTeamQuery={userTeamQuery}
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
      <Pagination
        page={currentPage}
        pages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
