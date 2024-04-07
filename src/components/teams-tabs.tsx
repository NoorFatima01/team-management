'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { memberTableSchemaType, teamSchemaType } from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';
import { getAllAvailableMembers } from '@/lib/utils';

import InviteMembers from '@/components/invite-members';
import MembersTable from '@/components/table/members-table';
import TeamDetails from '@/components/team-details';
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
      router.replace(`/teams?team_id=${teams[0].team_id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (team_id: string) => {
    router.replace(`/teams?${team_id}`);
  };

  const { data: membersOpenToWork } = useQuery({
    queryKey: ['availableMembers'],
    queryFn: getAllAvailableMembers,
    retry: 10,
  });

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
                return (
                  <TeamDetails
                    key={teamToShow.team_id}
                    team={teamToShow}
                    isUserHead={isHead(teamToShow)}
                  >
                    <div className='flex flex-col'>
                      {isHead(teamToShow) && (
                        <InviteMembers
                          members={membersOpenToWork as availableMember[]}
                        />
                      )}
                      <MembersTable members={tableMembers} />
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
