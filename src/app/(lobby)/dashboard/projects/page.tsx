import React from 'react';

import { projectSchemaType } from '@/lib/schemas';
import { getRole } from '@/lib/server-user';
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
    const role = await getRole(user_id);
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
        {role === 'TEAM_HEAD' && <CreateProjectForm />}
        <AllProjects projects={projectsTableData} />
      </div>
    );
  }
  return (
    <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
      <p className='text-muted-foreground text-sm text-center'>
        No user. Login to view projects
      </p>
    </div>
  );
}
