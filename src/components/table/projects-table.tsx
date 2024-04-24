import React from 'react';

import { projectSchemaType } from '@/lib/schemas';

import ProjectsTableShell from '@/components/shells/projects-table-shell';
import { Shell } from '@/components/shells/shell';

interface ProjectsTableProps {
  projects: projectSchemaType[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <Shell>
      <ProjectsTableShell data={projects} />
    </Shell>
  );
}
