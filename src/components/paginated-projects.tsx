'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import Pagination from '@/components/pagination';
import ProjectCard from '@/components/project-card';

type Project = {
  project_id: number;
  name: string;
  description: string;
  teams: {
    name: string;
  };
  project_status: 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  start_date: string;
  end_date: string;
};

const PaginatedProjects = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  function handlePageChange(newPage: number) {
    router.push(`/projects?page=${newPage}`);
    setPage(newPage);
  }

  const {
    data: projectsData,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['projects', page],
    queryFn: async () => {
      const response = await fetch(`/api/project/?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const projects = projectsData.projects;
  const totalPages = projectsData.totalPages;
  const currentPage = projectsData.currentPage;

  return (
    <section className='mx-auto my-8'>
      <div className='container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-4'>
        {projects.map((project: Project) => (
          <div key={project.project_id}>
            <ProjectCard
              title={project.name}
              description={project.description}
              team={project.teams.name}
              status={project.project_status}
              start_date={project.start_date}
              end_date={project.end_date}
            />
          </div>
        ))}
      </div>

      <Pagination
        page={currentPage}
        pages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default PaginatedProjects;