'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { userSignupFormSchema, userSignupFormSchemaType } from '@/lib/schemas';
import { useLogInStatusStore } from '@/lib/store';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UploadFile from '@/components/upload-file';

const UserSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const { setLogInStatus } = useLogInStatusStore();

  const form = useForm<userSignupFormSchemaType>({
    resolver: zodResolver(userSignupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      file: '',
    },
  });

  async function onSubmit(formData: userSignupFormSchemaType) {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        },
      },
    });

    if (error) {
      toast.error('Failed to log in');
    } else if (data) {
      toast.success('Logged in successfully');
      setLogInStatus(true);
    }

    router.push('/');
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto grid w-full max-w-md gap-6'
      >
        <div className='flex flex-col justify-between gap-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    id='add-name'
                    type='text'
                    placeholder='Your Name'
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='file'
            render={() => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <UploadFile setValue={form.setValue} name='file' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id='add-password'
                    type='password'
                    placeholder='Enter Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading} size='sm'>
            {isLoading && (
              <Icons.spinner
                className='mr-2 size-4 animate-spin'
                aria-hidden='true'
              />
            )}
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserSignupForm;
