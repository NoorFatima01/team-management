'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TeamCardProps = {
  team_id: string;
  title: string;
  description: string;
  projects: number;
  createdAt: string;
  isUserAlreadyInTeam: boolean;
};

export default function TeamCard({
  team_id,
  title,
  description,
  projects,
  createdAt,
  isUserAlreadyInTeam,
}: TeamCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const joinTeam = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/teams/team/${team_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  const mutate = useMutation({
    mutationFn: joinTeam,
    onSuccess: () => {
      toast.success('Successfully joined team');
      setIsLoading(false);
      isUserAlreadyInTeam = true;
    },
    onError: () => {
      toast.error('Failed to join team');
      setIsLoading(false);
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{createdAt}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          <CardDescription>{projects}</CardDescription>
        </CardContent>
        <CardFooter>
          {!isUserAlreadyInTeam && (
            <Button
              size='sm'
              onClick={() => mutate.mutate()}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className='size-4 animate-spin mr-2' />
              )}
              Join Team
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
