'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { fileSchema, fileSchemaType, taskSchemaType } from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import AddTaskForm from '@/components/forms/add-task-form';
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import UploadFile from '@/components/upload-file';

interface TasksProps {
  projectName: string;
}

export default function Tasks({ projectName }: TasksProps) {
  const [taskSelected, setTaskSelected] =
    React.useState<taskSchemaType | null>();
  const [isLoading] = React.useState(false);
  //there wont be that many tasks so tasks ids will be incremented starting from 1

  const getProjectTasks = async () => {
    //fetch tasks from db
    const clientSupabase = createSupabaseBrowserClient();
    const { data, error } = await clientSupabase
      .from('tasks')
      .select('title, details, status, projects(project_id)')
      .eq('projects.name', projectName);
    if (error) {
      toast.error('Error fetching tasks');
      return;
    }
    return data as unknown as taskSchemaType[];
  };

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ['tasks', projectName],
    queryFn: getProjectTasks,
    retry: 10,
  });

  const form = useForm<fileSchemaType>({
    resolver: zodResolver(fileSchema),

    defaultValues: {
      file: '',
    },
  });

  const onSubmit = (data: fileSchemaType) => {
    // eslint-disable-next-line no-console
    console.log('form data is', data);
  };
  return (
    <div className='h-96 flex flex-col gap-3'>
      <AddTaskForm projectName={projectName} />

      <ResizablePanelGroup
        direction='horizontal'
        className='w-full h-full rounded-lg border'
      >
        <ResizablePanel defaultSize={20}>
          <ScrollArea className='p-6'>
            <h2 className='text-2xl font-extrabold tracking-tighter mb-4'>
              {projectName}
            </h2>

            <Separator orientation='horizontal' className='mb-4' />
            <div className='flex flex-col items-center justify-center gap-3'>
              {tasksLoading ? (
                <Icons.spinner
                  className='size-7 animate-spin'
                  aria-hidden='true'
                />
              ) : tasksData ? (
                tasksData?.map((task, index) => (
                  <Button
                    key={index}
                    onClick={() => setTaskSelected(task)}
                    variant='ghost'
                    className='w-full'
                  >
                    {task.title}
                  </Button>
                ))
              ) : (
                <div>no tasks. Add</div>
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={25}>
              <div className='flex flex-col h-full p-6'>
                {taskSelected ? (
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-3'>
                      <span className='font-extrabold text-xl'>
                        {taskSelected.title}
                      </span>
                      <span className='text-lg'>{taskSelected.details}</span>
                    </div>
                    <Button size='sm' variant='secondary'>
                      Mark as Done
                    </Button>
                  </div>
                ) : (
                  <span className='font-semibold'>Select a task</span>
                )}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className='flex h-full p-6 justify-between '>
                <h3 className='text-xl font-extrabold'>Recent Activity</h3>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size='sm'>
                      <Icons.attach className='mr-2 size-4' />
                      Attach File
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className='mb-4'>
                      <DialogTitle className='text-xl font-bold'>
                        Attach File
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                      >
                        <FormField
                          control={form.control}
                          name='file'
                          render={() => (
                            <FormItem className='flex flex-col gap-2'>
                              <FormLabel>File</FormLabel>
                              <FormControl>
                                <UploadFile
                                  setValue={form.setValue}
                                  name='file'
                                />
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
                          Upload File
                          <span className='sr-only'>Upload File</span>
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
