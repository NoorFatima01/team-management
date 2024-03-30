'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { memberFormSchema, memberFormSchemaType } from '@/lib/schemas';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { SessionUser } from '@/types';

interface RegisterEmployeeFormProps {
  user: Pick<SessionUser, 'name' | 'image' | 'email'>;
}

export default function RegisterMemberForm({
  user,
}: RegisterEmployeeFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<memberFormSchemaType>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: user.name as string,
      email: user.email as string,
    },
  });

  async function registerMember(formData: memberFormSchemaType) {
    const response = await fetch('/api/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to add department');
    }

    return response.json();
  }

  const { mutate } = useMutation({
    mutationFn: registerMember,
    onSuccess: () => {
      toast.success('Registeration Successful');
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      toast.error('Failed to register');
    },
  });

  async function onSubmit(formData: memberFormSchemaType) {
    setIsLoading(true);
    mutate(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto grid w-full max-w-md gap-6'
      >
        <div className='flex justify-between gap-1'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id='add-name'
                      type='text'
                      placeholder='Your Name'
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This field cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='add-email'
                      type='text'
                      placeholder='Your Email'
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This filed cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading} size='sm'>
            {isLoading && (
              <Icons.spinner
                className='mr-2 size-4 animate-spin'
                aria-hidden='true'
              />
            )}
            Register Me
            <span className='sr-only'>Register Me</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
