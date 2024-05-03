import { v4 } from 'uuid';
import { z } from 'zod';

import { projectSchema } from '@/lib/schemas';
import { createSupabaseServerClient } from '@/lib/supabase/server-clients';

export async function POST(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const reqData = await req.json();
    const projectData = {
      project_id: v4(),
      project_status: 'IN_PROGRESS',
      ...reqData,
    };

    const projectDataParsed = projectSchema.parse(projectData);

    const { error: projectError } = await serverSupabase
      .from('projects')
      .insert([{ ...projectDataParsed }]);
    if (projectError) {
      throw new Error(projectError.message);
    }

    const { error: incrementError } = await serverSupabase.rpc(
      'update_team_projects',
      { x: 1, row_id: projectDataParsed.team_id }
    );

    if (incrementError) {
      throw new Error(incrementError.message);
    }

    return new Response(JSON.stringify(projectDataParsed), { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

export async function GET(req: Request) {
  try {
    const pageSize = 3;
    const pageNumber = parseInt(req.url.split('?')[1].split('page=')[1] || '1');

    const serverSupabase = createSupabaseServerClient();

    //first get total number of projects
    const { data: projectsCount, error: countError } = await serverSupabase
      .from('projects')
      .select('project_id');
    const totalProjects = projectsCount?.length || 0;

    if (totalProjects === 0) {
      return new Response(null, { status: 200 });
    }

    if (countError) {
      throw new Error(countError.message);
    }

    const skip = (pageNumber - 1) * pageSize;

    //get only those projects that are in the current page
    const { data: projects, error } = await serverSupabase
      .from('projects')
      .select(
        'project_id, name, description, project_status,start_date, end_date, teams (name) '
      )
      .range(skip, skip + pageSize - 1);

    if (error) {
      throw new Error(error.message);
    }

    const projectResponse = {
      projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects / pageSize),
      currentPage: pageNumber,
    };

    return new Response(JSON.stringify(projectResponse), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const serverSupabase = createSupabaseServerClient();
    const reqData = await req.json();

    //find the project with name project name
    const { data: project } = await serverSupabase
      .from('projects')
      .select('*')
      .eq('name', reqData.projectName);
    const oldProject = project && project[0] ? project[0] : null;
    const updatedProject = {
      ...oldProject,
      project_status: reqData.status,
    };

    const { error } = await serverSupabase
      .from('projects')
      .update(updatedProject)
      .eq('name', reqData.projectName);

    if (error) {
      throw new Error(error.message);
    }
    return new Response(JSON.stringify('Updation success'), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    } else if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response(null, { status: 500 });
    }
  }
}
