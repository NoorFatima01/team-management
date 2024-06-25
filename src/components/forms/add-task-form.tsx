'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  taskFormSchema,
  taskFormSchemaType,
  taskSchemaType,
} from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import UploadFile from '@/components/upload-file';

interface AddTaskFormProps {
  projectName: string;
  isDisabled?: boolean;
}

export default function AddTaskForm({
  projectName,
  isDisabled = false,
}: AddTaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<taskFormSchemaType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      details: '',
      file: '',
    },
  });
  const addTask = async (data: taskSchemaType) => {
    const respone = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!respone.ok) {
      throw new Error('Error adding task');
    }
  };
  const mutate = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast.success('Task added Successfully');
      setIsLoading(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to add task');
      setIsLoading(false);
    },
  });
  const onSubmit: SubmitHandler<taskFormSchemaType> = async (
    data: taskFormSchemaType
  ) => {
    setIsLoading(true);
    const clientSupabase = createSupabaseBrowserClient();
    const filePath: string =
      '/' + projectName + '/' + data.title + '/' + data.file.name;
    const { error } = await clientSupabase.storage
      .from('taskFiles')
      .upload(filePath, data.file as File);
    //get project id
    const { data: projectData, error: projectError } = await clientSupabase
      .from('projects')
      .select('project_id')
      .eq('name', projectName);
    if (projectError) {
      toast.error('Error uploading file');
      setIsLoading(false);
      return;
    }
    const projectId = projectData[0].project_id;
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    mutate.mutate({
      title: data.title as string,
      details: data.details as string,
      filePath: filePath as string,

      project_id: projectId as string,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' disabled={isDisabled}>
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-bold'>New Task Form</DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div>
            <Form {...form}>
              <form
                className='mx-auto grid w-full max-w-lg gap-6'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Title</FormLabel>
                      <Input
                        id='add-task-name'
                        type='text'
                        placeholder='Enter Task Name'
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='details'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col gap-2'>
                      <FormLabel>Details</FormLabel>
                      <Textarea
                        id='add-task-name'
                        placeholder='Enter Task Name'
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='file'
                  render={() => (
                    <FormItem className='flex flex-col gap-2'>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <UploadFile setValue={form.setValue} name='file' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner
                      className='mr-2 size-4 animate-spin'
                      aria-hidden='true'
                    />
                  )}
                  Add Task
                  <span className='sr-only'>Add Task</span>
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
