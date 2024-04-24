import React from 'react';

import { projectSchemaType } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

import AllProjects from '@/components/all-projects';
import CreateProjectForm from '@/components/forms/create-project-form';

export default async function ProjectPage() {
  const serverSupabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await serverSupabase.auth.getUser();
  if (user) {
    const user_id = user?.id;
    //get teams
    const { data: teamsIds } = await serverSupabase
      .from('teams-members')
      .select('team_id')
      .eq('member_id', user_id);
    if (!teamsIds) {
      return <div>no teams</div>;
    }
    const { data: projects } = await serverSupabase
      .from('projects')
      .select('*')
      .in(
        'team_id',
        teamsIds.map(({ team_id }) => team_id)
      );
    const projectsTableData = projects as projectSchemaType[];
    return (
      <div className='flex flex-col gap-3'>
        <CreateProjectForm />
        <AllProjects projects={projectsTableData} />
      </div>
    );
  }
  return <div>no user</div>;
}
