'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import { fileSchema, fileSchemaType } from '@/lib/schemas';
import { cn } from '@/lib/utils';

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

const tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description 3',
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Description 4',
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'Task 5',
    description: 'Description 5',
    status: 'In Progress',
  },
  {
    id: 6,
    title: 'Task 6',
    description: 'Description 6',
    status: 'In Progress',
  },
  {
    id: 7,
    title: 'Task 7',
    description: 'Description 7',
    status: 'In Progress',
  },
  {
    id: 8,
    title: 'Task 8',
    description: 'Description 8',
    status: 'In Progress',
  },
  {
    id: 9,
    title: 'Task 9',
    description: 'Description 9',
    status: 'In Progress',
  },
  {
    id: 10,
    title: 'Task 10',
    description: 'Description 10',
    status: 'In Progress',
  },
  {
    id: 11,
    title: 'Task 11',
    description: 'Description 11',
    status: 'In Progress',
  },
  {
    id: 12,
    title: 'Task 12',
    description: 'Description 12',
    status: 'In Progress',
  },
  {
    id: 13,
    title: 'Task 13',
    description: 'Description 13',
    status: 'In Progress',
  },
  {
    id: 14,
    title: 'Task 14',
    description: 'Description 14',
    status: 'In Progress',
  },
  {
    id: 15,
    title: 'Task 15',
    description: 'Description 15',
    status: 'In Progress',
  },
  {
    id: 16,
    title: 'Task 16',
    description: 'Description 16',
    status: 'In Progress',
  },
  {
    id: 17,
    title: 'Task 17',
    description: 'Description 17',
    status: 'In Progress',
  },
  {
    id: 18,
    title: 'Task 18',
    description: 'Description 18',
    status: 'In Progress',
  },
  {
    id: 19,
    title: 'Task 19',
    description: 'Description 19',
    status: 'In Progress',
  },
  {
    id: 20,
    title: 'Task 20',
    description: 'Description 20',
    status: 'In Progress',
  },
];

interface TasksProps {
  projectName: string;
}

export default function Tasks({ projectName }: TasksProps) {
  const [taskSelected, setTaskSelected] = React.useState<number | null>(1);
  const [isLoading] = React.useState(false);
  //there wont be that many tasks so tasks ids will be incremented starting from 1

  const form = useForm<fileSchemaType>({
    resolver: zodResolver(fileSchema),

    defaultValues: {
      file: '',
    },
  });

  // const onSubmit = (data: fileSchemaType) => {
  //   console.log('form data is', data);
  // };
  return (
    <div className='h-full'>
      <ResizablePanelGroup
        direction='horizontal'
        className='w-full h-full rounded-lg border'
      >
        <ResizablePanel defaultSize={20}>
          <ScrollArea className='p-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-extrabold tracking-tighter mb-4'>
                {projectName}
              </h2>
              <AddTaskForm projectName={projectName} />
            </div>
            <Separator orientation='horizontal' className='mb-4' />
            {tasks.map((task) => (
              <div key={task.id}>
                <span
                  className={cn(
                    'font-semibold hover:cursor-pointer hover:text-primary-foreground transition-all duration-400',
                    taskSelected === task.id && 'text-xl font-bold'
                  )}
                  onClick={() => setTaskSelected(task.id)}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction='vertical'>
            <ResizablePanel defaultSize={25}>
              <div className='flex flex-col h-full p-6'>
                {taskSelected ? (
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-xl'>
                        {tasks[taskSelected - 1].title}
                      </span>
                      <span>{tasks[taskSelected - 1].description}</span>
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
                        // onSubmit={form.handleSubmit(onSubmit)}
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
