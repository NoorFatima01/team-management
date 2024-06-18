'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  projectFormSchema,
  projectFormSchemaType,
  teamSchemaType,
} from '@/lib/schemas';
import useSession from '@/lib/supabase/use-session';
import { cn, getTeamsUserIsIn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { SelectTeam } from '@/components/select-team';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calender';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type TeamOptions = {
  label: string;
  value: string;
};

export default function CreateProjectForm() {
  const session = useSession();
  const user_id = session?.user.id;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedteam, setSelectedTeam] = useState<string>('');

  const form = useForm<projectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: new Date(),
      end_date: new Date(),
      team_id: '',
    },
  });

  const { data: teamsOfUser } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeamsUserIsIn(user_id),
    enabled: !!user_id,
  });

  const teamOptions: TeamOptions[] =
    (teamsOfUser as teamSchemaType[])?.map((team: teamSchemaType) => ({
      label: team.name,
      value: team.team_id,
    })) || [];

  const createProject = async (data: projectFormSchemaType) => {
    const response = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return response.json();
  };

  const mutate = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success('Project Created Successfully');
      setIsLoading(false);
      form.reset();
      setSelectedTeam('');
    },
    onError: () => {
      toast.error('Failed to create team');
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<projectFormSchemaType> = async (formData) => {
    formData.team_id = selectedteam;

    setIsLoading(true);
    mutate.mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='self-end'>
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-bold'>
            New Project Form
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              className='mx-auto grid w-full max-w-lg gap-6'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id='add-project-name'
                          type='text'
                          placeholder='Enter Project Name'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='team_id'
                  render={() => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Team</FormLabel>
                      <SelectTeam
                        options={teamOptions}
                        value={selectedteam}
                        setValue={setSelectedTeam}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        id='add-project-description'
                        type='text'
                        placeholder='Enter Project Description'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='start_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : 'Select a date'}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='end_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : 'Select a date'}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner
                    className='mr-2 size-4 animate-spin'
                    aria-hidden='true'
                  />
                )}
                Create Project
                <span className='sr-only'>Create Project</span>
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
