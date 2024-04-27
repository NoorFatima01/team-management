import React from 'react';

import PaginatedProjects from '@/components/paginated-projects';

const ProjectsPage = () => {
  return (
    <section className='mx-auto my-8'>
      <h2 className='text-3xl font-bold text-center'>Projects</h2>
      <PaginatedProjects />
    </section>
  );
};

export default ProjectsPage;
