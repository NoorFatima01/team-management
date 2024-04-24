'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const [isLoading] = useState(false);
  const [selectedteam, setSelectedTeam] = useState<string>('');

  const form = useForm<projectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: new Date(),
      end_date: new Date(),
      team: '',
    },
  });

  const { data: teamsOfUser } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeamsUserIsIn(user_id),
    enabled: !!user_id,
  });

  const teamOptions: TeamOptions[] =
    teamsOfUser?.map((team: teamSchemaType) => ({
      label: team.name,
      value: team.team_id,
    })) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-bold'>
            New Project Form
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className='mx-auto grid w-full max-w-lg gap-6'>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Name</FormLabel>
                      <Input
                        id='add-project-name'
                        type='text'
                        placeholder='Enter Project Name'
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='team'
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
                    <Input
                      id='add-project-description'
                      type='text'
                      placeholder='Enter Project Description'
                      {...field}
                    />
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
                Create Team
                <span className='sr-only'>Create Team</span>
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
