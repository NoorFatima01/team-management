import React from 'react';

import { teamSchemaType } from '@/lib/schemas';

import { Separator } from '@/components/ui/separator';

interface TeamDeatilsProps {
  team: teamSchemaType;
  teamHeadUserName: string;
  children?: React.ReactNode;
}
export default function TeamDetails({
  team,
  children,
  teamHeadUserName,
}: TeamDeatilsProps) {
  return (
    <div className='rounded-lg shadow-lg p-6 flex flex-col'>
      <h1 className='text-2xl font-bold mb-4'>{team.name}</h1>
      <p className='mb-4 font-bold text-muted-foreground text-md'>
        {team.description}
      </p>
      <Separator
        orientation='horizontal'
        className='mb-4 hidden lg:inline-block'
      />
      <div className='flex flex-col mb-4'>
        <p className='font-bold'>
          <span className='font-bold'>Team Head:</span> {teamHeadUserName}
        </p>
        <p className='font-bold'>
          <span className='font-bold'>Projects:</span>{' '}
          {team.projects_in_progress}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
