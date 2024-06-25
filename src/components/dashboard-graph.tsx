'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Project, ProjectsByTeam } from '@/types';

interface DashboardGraphProps {
  projectsByTeam: ProjectsByTeam;
}

type ProjectStatusCounts = {
  COMPLETED: number;
  IN_PROGRESS: number;
  CANCELLED: number;
};

type TeamsWithStatusCounts = {
  [teamName: string]: { status: string; total: number }[];
};

export function DashboardGraph({ projectsByTeam }: DashboardGraphProps) {
  // Define a function to count project status occurrences
  function countProjectStatuses(projects: Project[]): ProjectStatusCounts {
    const statusCounts: ProjectStatusCounts = {
      COMPLETED: 0,
      IN_PROGRESS: 0,
      CANCELLED: 0,
    };

    projects.forEach((project) => {
      switch (project.project_status) {
        case 'COMPLETED':
          statusCounts.COMPLETED++;
          break;
        case 'IN_PROGRESS':
          statusCounts.IN_PROGRESS++;
          break;
        case 'CANCELLED':
          statusCounts.CANCELLED++;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  }
  const teamsWithStatusCounts: TeamsWithStatusCounts = {};

  // Iterate over each team in projectsByTeam
  for (const teamName in projectsByTeam) {
    if (Object.prototype.hasOwnProperty.call(projectsByTeam, teamName)) {
      const projects = projectsByTeam[teamName];
      const statusCounts = countProjectStatuses(projects);
      // Map statusCounts to the format expected by TeamsWithStatusCounts
      teamsWithStatusCounts[teamName] = Object.entries(statusCounts).map(
        ([status, total]) => ({
          status,
          total,
        })
      );
    }
  }
  if (Object.keys(projectsByTeam).length === 0) {
    return <p className='text-center text-muted-foreground'>No Data</p>;
  }
  return (
    <>
      {Object.keys(teamsWithStatusCounts).map((teamName, index) => (
        <div key={index} className='flex items-center'>
          <h2 className='-rotate-90 text-md font-semibold'>{teamName}</h2>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={teamsWithStatusCounts[teamName]}>
              <XAxis
                dataKey='status'
                stroke='#888888'
                fontSize={8}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={9}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey='total'
                fill='currentColor'
                radius={[4, 4, 0, 0]}
                className='fill-primary'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </>
  );
}
