import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ProjectCardProps = {
  title: string;
  description: string;
  team: string;
  status: 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  start_date: string;
  end_date: string;
};

const ProjectCard = ({
  title,
  description,
  team,
  status,
  start_date,
  end_date,
}: ProjectCardProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Team: {team}</p>
          <p>Status: {status}</p>
          <p>Start Date: {start_date}</p>
          <p>End Date: {end_date}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
