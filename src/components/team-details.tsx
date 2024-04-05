import React from 'react';

import { teamSchemaType } from '@/lib/schemas';

import { Button } from '@/components/ui/button';

interface TeamDeatilsProps {
  team: teamSchemaType;
  isUserHead: boolean;
  children?: React.ReactNode;
}
export default function TeamDetails({
  team,
  isUserHead,
  children,
}: TeamDeatilsProps) {
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
      {isUserHead && (
        <Button size='sm' variant='destructive' className='self-end'>
          Delete Team
        </Button>
      )}
    </div>
  );
}
