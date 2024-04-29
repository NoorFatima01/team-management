import React from 'react';

import { taskSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import Tasks from '@/components/tasks';

interface ProjectDetailsPageProps {
  params: { project: string };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { project } = params;
  const serverSupabase = createSupabaseServerClient();
  const { data } = await serverSupabase
    .from('tasks')
    .select('title, details, status, filePath, projects(project_id)')
    .eq('projects.name', project)
    .not('projects', 'is', null);

  const tasks = data as unknown as taskSchemaType[];

  return (
    <div>
      <Tasks projectName={project} tasks={tasks} />
    </div>
  );
}
