'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { memberTableSchemaType, teamSchemaType } from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';
import { getAllAvailableMembers } from '@/lib/utils';

import { Icons } from '@/components/icons';
import InviteMembers from '@/components/invite-members';
import MembersTable from '@/components/table/members-table';
import TeamDetails from '@/components/team-details';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { availableMember } from '@/types';

interface TeamsTabsProps {
  teams: teamSchemaType[];
  membersWithTeamIds: {
    team_id: string;
    members: memberTableSchemaType[];
  }[];
}

export default function TeamsTabs({
  teams,
  membersWithTeamIds,
}: TeamsTabsProps) {
  const session = useSession();
  const userId = session?.user?.id;
  const isHead = (team: teamSchemaType) => team.team_head === userId;
  const router = useRouter();
  useEffect(() => {
    if (teams.length > 0) {
      // If there's no team ID in the URL and we have teams, set the first team ID as default
      router.replace(`/dashboard/teams?team_id=${teams[0].team_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (team_id: string) => {
    router.replace(`/dashboard/teams?${team_id}`);
  };

  const { data: membersOpenToWork } = useQuery({
    queryKey: ['availableMembers'],
    queryFn: getAllAvailableMembers,
    retry: 10,
  });

  async function leaveTeam(team_id: string) {
    const response = await fetch(`/api/teams/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ team_id }),
    });

    if (response.status !== 204) {
      throw new Error('Failed to leave team ,,,,');
    }
    return true;
  }

  async function deleteTeam(team_id: string) {
    const response = await fetch(`/api/teams/team/${team_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete team');
    }
    return true;
  }

  const leaveMutate = useMutation({
    mutationFn: leaveTeam,
    onSuccess: () => {
      toast.success('Successfully left team');
      router.replace('/dashboard/teams');
    },
    onError: () => {
      toast.error('Failed to leave team');
    },
  });

  const deleteMutate = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      toast.success('Successfully deleted team');
      router.replace('/dashboard/teams');
    },
    onError: () => {
      toast.error('Failed to delete team');
    },
  });

  if (teams.length === 0) {
    return (
      <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
        <p className='text-muted-foreground text-sm text-center'>
          You are not part of any team. Create a team or join an existing one.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Tabs className='w-full flex flex-col' defaultValue={teams[0].team_id}>
        <TabsList className='flex justify-evenly'>
          {teams.map((team) => (
            <TabsTrigger
              className='flex flex-1'
              key={team.team_id}
              value={team.team_id}
              onClick={() => handleClick(team.team_id)}
              // onSelect={() => handleClick(team.team_id)}
            >
              {team.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {teams.map((team) => (
          <TabsContent key={team.team_id} value={team.team_id}>
            {teams.map((teamToShow) => {
              if (teamToShow.team_id === team.team_id) {
                // Find the members of the team
                let tableMembers: memberTableSchemaType[] = [];
                if (membersWithTeamIds) {
                  tableMembers =
                    membersWithTeamIds.find(
                      (membersWithTeamId) =>
                        membersWithTeamId.team_id === teamToShow.team_id
                    )?.members ?? [];
                }
                //now get team head from the table members
                const teamHead = tableMembers.find(
                  (member) => member.member_id === teamToShow.team_head
                );
                return (
                  <TeamDetails
                    key={teamToShow.team_id}
                    team={teamToShow}
                    teamHeadUserName={teamHead?.username ?? ''}
                  >
                    <div className='flex flex-col'>
                      {isHead(teamToShow) && (
                        <InviteMembers
                          members={membersOpenToWork as availableMember[]}
                          teamName={teamToShow.name}
                          team_id={teamToShow.team_id}
                        />
                      )}
                      <MembersTable members={tableMembers} />
                      <div className='self-end flex gap-2'>
                        {isHead(teamToShow) && (
                          <Button
                            size='sm'
                            variant='destructive'
                            disabled={deleteMutate.isPending}
                            onClick={() =>
                              deleteMutate.mutate(teamToShow.team_id)
                            }
                          >
                            {deleteMutate.isPending && (
                              <Icons.spinner className='size-4 animate-spin mr-2' />
                            )}
                            Delete
                          </Button>
                        )}
                        <Button
                          size='sm'
                          variant='ghost'
                          disabled={leaveMutate.isPending}
                          onClick={() => leaveMutate.mutate(teamToShow.team_id)}
                        >
                          {leaveMutate.isPending && (
                            <Icons.spinner className='size-4 animate-spin mr-2' />
                          )}
                          Leave
                        </Button>
                      </div>
                    </div>
                  </TeamDetails>
                );
              }
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
