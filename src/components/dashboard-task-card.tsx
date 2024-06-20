import React from 'react';

import { Icons } from '@/components/icons';
import { ProgressBar, ProgressBarLink } from '@/components/progress-bar';

import { TaskDataWithProjectName } from '@/types';

interface DashboardTaskCardProps {
  taskWithProjectName: TaskDataWithProjectName;
}

export default function DashboardTaskCard({
  taskWithProjectName,
}: DashboardTaskCardProps) {
  return (
    <ProgressBar className='fixed top-0 left-0 h-1 bg-primary'>
      <ProgressBarLink
        href={`/dashboard/projects/${taskWithProjectName.projects.name}`}
      >
        <div className='flex items-center space-x-3 hover:cursor-pointer hover:bg-muted p-3 rounded-lg'>
          <Icons.task className='size-5' />
          <div className='flex flex-col'>
            <h3 className='text-xl font-bold tracking-tighter'>
              {taskWithProjectName.title}
            </h3>
            <p className='text-md'>{taskWithProjectName.projects.name}</p>
          </div>
        </div>
      </ProgressBarLink>
    </ProgressBar>
  );
}
