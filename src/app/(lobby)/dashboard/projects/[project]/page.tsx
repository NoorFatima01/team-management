import React from 'react';

import { taskSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import Tasks from '@/components/tasks';

interface ProjectDetailsPageProps {
  params: { project: string };
}

type TaskWithProjects = taskSchemaType & {
  projects: {
    name: string;
    project_status: string;
  };
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { project } = params;
  const projectName = decodeURIComponent(project);
  const serverSupabase = createSupabaseServerClient();

  const { data: data } = await serverSupabase
    .from('tasks')
    .select('title, details, filePath, projects(name, project_status)')
    .eq('projects.name', projectName)
    .not('projects', 'is', null);

  const tasks = data as unknown as TaskWithProjects[];

  return (
    <div>
      <Tasks projectName={projectName} tasks={tasks} />
    </div>
  );
}
