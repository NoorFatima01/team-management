'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { projectFormSchema, projectFormSchemaType } from '@/lib/schemas';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function CreateProjectForm() {
  const [isLoading] = useState(false);
  const form = useForm<projectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      team: '',
    },
  });

  return (
    <div>
      <Form {...form}>
        <form className='mx-auto grid w-full max-w-lg gap-6'>
          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex flex-1 flex-col'>
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
              render={({ field }) => (
                <FormItem className='flex flex-1 flex-col'>
                  <FormLabel>Team</FormLabel>
                  <Input
                    id='add-project-name'
                    type='text'
                    placeholder='Select Team'
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
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
                <FormItem className='flex flex-1 flex-col'>
                  <FormLabel>Start Date</FormLabel>
                  <Input id='add-project-start-date' type='date' {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='end_date'
              render={({ field }) => (
                <FormItem className='flex flex-1 flex-col'>
                  <FormLabel>End Date</FormLabel>
                  <Input id='add-project-end-date' type='date' {...field} />
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
  );
}
