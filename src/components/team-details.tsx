import React from 'react';

import { teamSchemaType } from '@/lib/schemas';

interface TeamDeatilsProps {
  team: teamSchemaType;
  children?: React.ReactNode;
}
export default function TeamDetails({ team, children }: TeamDeatilsProps) {
  return (
    <div className='rounded-lg shadow-lg p-6 flex flex-col'>
      <h1 className='text-2xl font-bold mb-4'>{team.name}</h1>
      <p className='mb-4'>{team.description}</p>
      <div className='flex flex-col mb-4'>
        <p className='font-bold'>
          <span className='font-bold'>Projects done:</span> {team.projects_done}
        </p>
        <p className='font-bold'>
          <span className='font-bold'>Projects in process:</span>{' '}
          {team.projects_in_progress}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
