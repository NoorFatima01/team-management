import React from 'react';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
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
  const badgeVariant =
    status === 'COMPLETED'
      ? 'default'
      : status === 'CANCELLED'
      ? 'destructive'
      : 'secondary';
  // Convert start_date and end_date strings to Date objects
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  // Calculate the difference in milliseconds between the two dates
  const differenceInMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days and round down to the nearest whole number
  let daysLeft = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) {
    daysLeft = 0;
  }

  return (
    <div>
      <Card>
        <CardHeader className='flex gap-3'>
          <CardTitle className='flex flex-col gap-2'>
            <Icons.project className='size-8' />
            {title}
          </CardTitle>
          <CardDescription>
            <Badge
              variant={
                `${badgeVariant}` as
                  | 'default'
                  | 'destructive'
                  | 'outline'
                  | 'secondary'
              }
            >
              {status}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-lg'>
            Details: <span className='text-neutral-50'>{description}</span>
          </p>
          <p className='text-muted-foreground text-lg'>
            Team: <span className='text-neutral-50'>{team}</span>
          </p>
        </CardContent>
        <CardFooter className='flex-row-reverse'>
          <Badge variant='outline' className='flex gap-2 border-4'>
            <Icons.timer className='size-3' />
            Days Left: {daysLeft}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
