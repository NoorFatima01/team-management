import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/icons';

import { TaskDataWithProjectName } from '@/types';

interface DashboardTaskCardProps {
  taskWithProjectName: TaskDataWithProjectName;
}

export default function DashboardTaskCard({
  taskWithProjectName,
}: DashboardTaskCardProps) {
  return (
    <Link href={`/dashboard/projects/${taskWithProjectName.projects.name}`}>
      <div className='flex items-center space-x-3 hover:cursor-pointer hover:bg-muted p-3 rounded-lg'>
        <Icons.task className='size-5' />
        <div className='flex flex-col'>
          <h3 className='text-xl font-bold tracking-tighter'>
            {taskWithProjectName.title}
          </h3>
          <p className='text-md'>{taskWithProjectName.projects.name}</p>
        </div>
      </div>
    </Link>
  );
}
