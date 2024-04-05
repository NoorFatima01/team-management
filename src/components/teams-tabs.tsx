'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { teamSchemaType } from '@/lib/schemas';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeamsTabsProps {
  teams: teamSchemaType[];
}

export default function TeamsTabs({ teams }: TeamsTabsProps) {
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
                return (
                  <div key={teamToShow.team_id}>
                    <h1>{teamToShow.name}</h1>
                    <p>{teamToShow.description}</p>
                  </div>
                );
              }
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
