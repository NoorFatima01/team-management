'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useDownload } from '@/lib/hooks';
import { fileSchema, fileSchemaType, taskSchemaType } from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import AddTaskForm from '@/components/forms/add-task-form';
import { Icons } from '@/components/icons';
import RecentActivity from '@/components/recent-activity';
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

type FileData = {
  id: string;
  path: string;
  fullPath: string;
};

export default function Tasks({ projectName }: TasksProps) {
  const [taskSelected, setTaskSelected] =
    React.useState<taskSchemaType | null>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleZip } = useDownload(taskSelected?.filePath || '');

  const getProjectTasks = async () => {
    //fetch tasks from db
    const clientSupabase = createSupabaseBrowserClient();
    const { data, error } = await clientSupabase
      .from('tasks')
      .select('title, details, status, filePath, projects(project_id)')
      .eq('projects.name', projectName)
      .not('projects', 'is', null);

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

  const recordFile = async (file: {
    id: string;
    path: string;
    fullPath: string;
  }) => {
    const response = await fetch('/api/file', {
      method: 'POST',
      body: JSON.stringify({ file_id: file.id, path: file.path }),
    });
    if (!response.ok) {
      throw new Error('Error recording file');
    }
  };

  const mutate = useMutation({
    mutationFn: recordFile,
    onSuccess: () => {
      toast.success('File recorded Successfully');
      setIsLoading(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to record file');
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<fileSchemaType> = async (
    data: fileSchemaType
  ) => {
    setIsLoading(true);
    const clientSupabase = createSupabaseBrowserClient();
    const filePath: string =
      '/' + projectName + '/' + taskSelected?.title + '/' + data.file.name;
    const { data: fileData, error } = await clientSupabase.storage
      .from('taskFiles')
      .upload(filePath, data.file as File);

    if (error) {
      toast.error('Error uploading file');
      setIsLoading(false);
      return;
    }
    mutate.mutate({
      id: (fileData as FileData).id,
      path: (fileData as FileData).path,
      fullPath: (fileData as FileData).fullPath,
    });
    setIsLoading(false);
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
                    <div className='flex gap-3'>
                      <Button
                        size='sm'
                        variant='secondary'
                        onClick={async () => {
                          await handleZip();
                        }}
                      >
                        Download Reference Material
                      </Button>
                      <Button size='sm' variant='secondary'>
                        Mark as Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <span className='text-center font-semibold'>
                    Select a task
                  </span>
                )}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              {taskSelected ? (
                <div className='flex h-full p-6 justify-between'>
                  <RecentActivity
                    project={projectName}
                    task={taskSelected}
                    className='flex-1'
                  />

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
              ) : (
                <p className='text-center font-semibold mt-8'>Select a Task</p>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
