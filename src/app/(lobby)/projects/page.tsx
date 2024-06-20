import React from 'react';

import PageDescriptionHeader from '@/components/layout/page-description-header';
import PaginatedProjects from '@/components/paginated-projects';

const ProjectsPage = () => {
  return (
    <section className='container mt-6 p-6'>
      <PageDescriptionHeader
        title='Projects'
        description='Explore all the projects that are currently in progress.'
      />
      <PaginatedProjects />
    </section>
  );
};

export default ProjectsPage;
