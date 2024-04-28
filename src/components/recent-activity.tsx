'use client';

import React from 'react';

import { taskSchemaType } from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Button } from '@/components/ui/button';

interface RecentActivityProps {
  project: string;
  task: taskSchemaType;
}

export default function RecentActivity({ project, task }: RecentActivityProps) {
  const clientSupabase = createSupabaseBrowserClient();
  const listAllFiles = async () => {
    const folderName1 = task.filePath.split('/')[1];
    const folderName2 = task.filePath.split('/')[2];
    const folderName = folderName1 + '/' + folderName2;
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { data } = await clientSupabase.storage
      .from('taskFiles')
      .list(folderName);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-xl font-extrabold'>
        Recent Activity of {project} with task {task.title}
      </h3>
      <Button onClick={listAllFiles}>List all files</Button>
    </div>
  );
}
