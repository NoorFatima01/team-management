import React from 'react';

import Tasks from '@/components/tasks';

interface ProjectDetailsPageProps {
  params: { project: string };
}

export default function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { project } = params;

  return (
    <div>
      <Tasks projectName={project} />
    </div>
  );
}
