'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useDownload } from '@/lib/hooks';
import { fileSchema, fileSchemaType, taskSchemaType } from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';
import { cn } from '@/lib/utils';

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

type TaskWithProjects = taskSchemaType & {
  projects: {
    name: string;
    project_status: string;
  };
};

interface TasksProps {
  tasks: TaskWithProjects[];
  projectName: string;
}
type FileData = {
  id: string;
  path: string;
  fullPath: string;
};

export default function Tasks({ projectName, tasks }: TasksProps) {
  const status =
    tasks && tasks.length > 0
      ? tasks[0].projects.project_status
      : 'IN_PROGRESS';
  const [isProjectInProgress] = React.useState(status === 'IN_PROGRESS');
  const [taskSelected, setTaskSelected] =
    React.useState<TaskWithProjects | null>(tasks ? tasks[0] : null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleZip } = useDownload(
    taskSelected ? ([taskSelected?.filePath] as string[]) : ['']
  );

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

  const updateProjectStatus = async (status: string) => {
    const response = await fetch('/api/project', {
      method: 'PUT',
      body: JSON.stringify({ projectName, status }),
    });
    if (response.ok) {
      toast.success('Project status updated');
    } else {
      toast.error('Failed to update project status');
    }
  };

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
      {tasks && tasks.length > 0 ? (
        <div className='flex justify-between'>
          <h2 className='text-sm text-muted-foreground'>
            Project Status:{' '}
            <span
              className={cn(
                status === 'COMPLETED'
                  ? 'text-primary'
                  : status === 'CANCELLED'
                  ? 'text-destructive'
                  : ''
              )}
            >
              {status}
            </span>
          </h2>

          <div className='flex gap-2'>
            <Button
              size='sm'
              disabled={!isProjectInProgress}
              onClick={() => {
                updateProjectStatus('COMPLETED');
              }}
            >
              Mark Project as Done
            </Button>
            <Button
              size='sm'
              variant='destructive'
              disabled={!isProjectInProgress}
              onClick={() => {
                updateProjectStatus('CANCELLED');
              }}
            >
              Mark Project as Cancelled
            </Button>
            <AddTaskForm projectName={projectName} />
          </div>
        </div>
      ) : (
        <div className='flex justify-between'>
          <h2 className='text-sm text-muted-foreground'>
            Project Status:{' '}
            <span
              className={cn(
                status === 'COMPLETED'
                  ? 'text-primary'
                  : status === 'CANCELLED'
                  ? 'text-destructive'
                  : ''
              )}
            >
              {status}
            </span>
          </h2>

          <AddTaskForm projectName={projectName} />
        </div>
      )}

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
              {tasks && tasks.length > 0 ? (
                tasks?.map((task, index) => (
                  <Button
                    key={index}
                    onClick={() => setTaskSelected(task)}
                    variant='ghost'
                    className={cn(
                      ' w-full font-semibold hover:cursor-pointer hover:text-primary-foreground transition-all duration-400',
                      taskSelected === task && 'text-xl font-bold'
                    )}
                  >
                    {task.title}
                  </Button>
                ))
              ) : (
                <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
                  <p className='text-muted-foreground text-sm'>
                    Add a task to get started
                  </p>
                </div>
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
                    </div>
                  </div>
                ) : (
                  <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
                    <p className='text-muted-foreground text-sm'>
                      Add a task to get started
                    </p>
                  </div>
                )}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className='flex h-full p-6 justify-between'>
                {taskSelected ? (
                  <>
                    <RecentActivity
                      project={projectName}
                      task={taskSelected}
                      className='flex-1'
                    />

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size='sm' disabled={!isProjectInProgress}>
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
                  </>
                ) : (
                  <div className=' place-self-start ml-[16rem]  lg:ml-[26rem] rounded-md border border-muted-foreground p-2'>
                    <p className='text-muted-foreground text-sm '>
                      Add a task to get started
                    </p>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
