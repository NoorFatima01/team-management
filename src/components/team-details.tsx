import React from 'react';

import { teamSchemaType } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
      <p className='mb-4 font-bold text-muted-foreground text-md'>
        {team.description}
      </p>
      <Separator
        orientation='horizontal'
        className='mb-4 hidden lg:inline-block'
      />
      <div className='flex flex-col mb-4'>
        <p className='font-bold'>
          <span className='font-bold'>On going Projects:</span>{' '}
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
