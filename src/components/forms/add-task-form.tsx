'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { taskSchema, taskSchemaType } from '@/lib/schemas';

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

export default function AddTaskForm() {
  const [isLoading] = useState(false);
  const form = useForm<taskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      details: '',
      file: '',
    },
  });
  // const onSubmit = (data: taskSchemaType) => {
  //   console.log('form data is', data);
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Add Task</Button>
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
                // onSubmit={form.handleSubmit(onSubmit)}
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
