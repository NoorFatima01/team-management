import React from 'react';

import { getUser } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import DashboardTaskCard from '@/components/dashboard-task-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { TaskDataWithProjectName } from '@/types';

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    return <div>Not Logged In</div>;
  }
  const serverSupabase = createSupabaseServerClient();
  const user_id = user?.id as string;
  const { data: teamData } = await serverSupabase
    .from('teams-members')
    .select('team_id')
    .eq('member_id', user_id);

  const { data: projectData } = await serverSupabase
    .from('projects')
    .select('project_id')
    .in('team_id', teamData?.map((team) => team.team_id) || []);
  const { data: tasksData } = await serverSupabase
    .from('tasks')
    .select('title, details, projects(name)')
    .in('project_id', projectData?.map((project) => project.project_id) || [])
    .eq('status', 'IN_PROGRESS')
    .not('projects', 'is', null);
  const tasksDataWithProjectName =
    tasksData as unknown as TaskDataWithProjectName[];

  return (
    <div>
      <Card className='w-[350px]'>
        <CardHeader className='flex flex-col gap-3'>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Following are you ongoing tasks.</CardDescription>
          <CardContent className='flex flex-col gap-4'>
            {tasksDataWithProjectName?.map((taskWithProjectName, index) => (
              <DashboardTaskCard
                taskWithProjectName={taskWithProjectName}
                key={index}
              />
            ))}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
