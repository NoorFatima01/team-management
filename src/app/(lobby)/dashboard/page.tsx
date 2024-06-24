import React from 'react';

import { getUser } from '@/lib/server-user';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import { DashboardGraph } from '@/components/dashboard-graph';
import TaskList from '@/components/task-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ProjectDataWithTeamName,
  ProjectsByTeam,
  TaskDataWithProjectName,
} from '@/types';

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
    .select('project_id, name, project_status, teams(name)')
    .in('team_id', teamData?.map((team) => team.team_id) || [])
    .not('teams', 'is', null);
  const { data: tasksData } = await serverSupabase
    .from('tasks')
    .select('title, details, projects(name)')
    .in('project_id', projectData?.map((project) => project.project_id) || [])
    .not('projects', 'is', null);
  const tasksDataWithProjectName =
    tasksData as unknown as TaskDataWithProjectName[];
  const projectDataWithTeamName =
    projectData as unknown as ProjectDataWithTeamName[];

  const projectsByTeam: ProjectsByTeam = {};

  projectDataWithTeamName.forEach((project) => {
    const teamName = project.teams.name;
    if (!projectsByTeam[teamName]) {
      projectsByTeam[teamName] = [];
    }
    projectsByTeam[teamName].push(project);
  });

  return (
    <div className='grid lg:grid-flow-col gap-2'>
      <Card className='col-span-4'>
        <CardHeader>
          <CardTitle>Project Statuses Per Team</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-flow-col'>
          <DashboardGraph projectsByTeam={projectsByTeam} />
        </CardContent>
      </Card>

      <Card className='lg:w-[350px] col-span-4'>
        <CardHeader className='flex flex-col gap-3'>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Following are your ongoing tasks.</CardDescription>
          <CardContent className='flex flex-col gap-4'>
            {tasksDataWithProjectName?.length === 0 && (
              <p className='text-muted-foreground text-center'>
                No tasks found
              </p>
            )}
            {/* {tasksDataWithProjectName?.map((taskWithProjectName, index) => (
              <DashboardTaskCard
                taskWithProjectName={taskWithProjectName}
                key={index}
              />
            ))} */}
            <TaskList tasksDataWithProjectName={tasksDataWithProjectName} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
