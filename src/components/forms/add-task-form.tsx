'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { fileSchema, fileSchemaType } from '@/lib/schemas';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import UploadFile from '@/components/upload-file';

export default function AddTaskForm() {
  const [isLoading] = useState(false);

  const form = useForm<fileSchemaType>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: '',
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl font-bold'>New Task Form</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form className='mx-auto grid w-full max-w-lg gap-6'>
              <FormField
                control={form.control}
                name='file'
                render={() => (
                  <FormItem className='flex flex-col gap-2'>
                    <FormLabel>File</FormLabel>
                    <UploadFile />
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
      </DialogContent>
    </Dialog>
  );
}
