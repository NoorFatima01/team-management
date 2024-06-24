'use client';

import { useMutation, UseQueryResult } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useCanJoinTeamStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Team } from '@/components/paginated-teams';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TeamCardProps = {
  userId: string | undefined;
  role: string;
  team_id: string;
  title: string;
  description: string;
  projects: number;
  createdAt: string;
  userTeamQuery: UseQueryResult<Team[], Error>;
};

export default function TeamCard({
  userId,
  role,
  team_id,
  title,
  description,
  projects,
  createdAt,
  userTeamQuery,
}: TeamCardProps) {
  const [isUserAlreadyInTeam, setIsUserAlreadyInTeam] = useState(false);
  const {
    fetchTeamsJoined,
    canJoinMoreTeams,
    increaseTeamsJoined,
    teamsJoined,
  } = useCanJoinTeamStore();

  useEffect(() => {
    fetchTeamsJoined(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  const isUserLoggedIn = userId ? true : false;
  const joinTeam = async () => {
    if (role === 'TEAM_HEAD') {
      throw new Error('Team head cannot join team as a member');
    }
    const response = await fetch(`/api/teams/team/${team_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teams_joined: teamsJoined + 1 }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const mutate = useMutation({
    mutationFn: joinTeam,
    onSuccess: () => {
      toast.success('Successfully joined team');
      setIsUserAlreadyInTeam(true);
      increaseTeamsJoined();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!userTeamQuery.data) return;
    setIsUserAlreadyInTeam(
      userTeamQuery?.data.some((team: Team) => team.team_id === team_id)
    );
  }, [
    userTeamQuery,
    userTeamQuery.data,
    team_id,
    userTeamQuery.isLoading,
    userTeamQuery.isFetching,
  ]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Since: {formatDate(createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {' '}
            <span className='underline'>About:</span> {description}
          </p>
          <p>
            {' '}
            <span className='underline'>Projects:</span> {projects}
          </p>
        </CardContent>
        <CardFooter>
          {!isUserLoggedIn && (
            //move badge to the right
            <Badge className='ml-auto'>Log In to join team</Badge>
          )}
          {canJoinMoreTeams() && !isUserAlreadyInTeam && isUserLoggedIn && (
            <Button
              size='sm'
              onClick={() => mutate.mutate()}
              disabled={mutate.isPending}
            >
              {mutate.isPending && (
                <Icons.spinner className='size-4 animate-spin mr-2' />
              )}
              Join Team
            </Button>
          )}
          {!canJoinMoreTeams() && isUserLoggedIn && !isUserAlreadyInTeam && (
            <Badge className='ml-auto' variant='destructive'>
              You can only join 3 teams
            </Badge>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
