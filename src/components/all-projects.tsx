'use client';

import React from 'react';

import { projectSchemaType } from '@/lib/schemas';

import ProjectsTable from '@/components/table/projects-table';

interface AllProjectsProps {
  projects: projectSchemaType[];
}

export default function AllProjects({ projects }: AllProjectsProps) {
  return <ProjectsTable projects={projects} />;
}
//need to create a client component to put projects table and members table in otherwise it gives error. need to see this in the future
