import React from 'react';

import DashboardTaskCard from '@/components/dashboard-task-card';
import { CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { TaskDataWithProjectName } from '@/types';

interface TaskListProps {
  tasksDataWithProjectName: TaskDataWithProjectName[];
}

export default function TaskList({ tasksDataWithProjectName }: TaskListProps) {
  return (
    <CardContent className='flex flex-col gap-4'>
      <ScrollArea>
        {tasksDataWithProjectName?.map((taskWithProjectName, index) => (
          <DashboardTaskCard
            taskWithProjectName={taskWithProjectName}
            key={index}
          />
        ))}
      </ScrollArea>
    </CardContent>
  );
}
