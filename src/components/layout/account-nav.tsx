'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import Box from '@/components/Box';
import { Icons } from '@/components/icons';
import NextImage from '@/components/NextImage';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { SessionUser } from '@/types/index';

interface AccountNavProps {
  children?: React.ReactNode;
  user: SessionUser;
}

//TODO: add role based display of these routes using shouldRender boolean
const accountNavRoutes = [
  {
    title: 'User Registration',
    href: '/register-user',
    icon: <Icons.employee className='size-4' />,
  },
  {
    shouldRender: true,
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Icons.dashboard className='size-4' />,
  },
  {
    title: 'Create a New Team',
    href: '/create-team',
    icon: <Icons.add className='size-4' />,
  },
  {
    shouldRender: true,
    title: 'Settings',
    href: '/settings',
    icon: <Icons.settings className='size-4' />,
  },
];

const AccountNav = ({ user, children }: AccountNavProps) => {
  const params = useParams();

  return (
    <div className='h-screen p-2'>
      <div className='flex flex-col lg:flex-row h-full'>
        <div className='flex flex-col'>
          {/*div for sidebar boxes*/}
          <Box className='flex flex-col items-center gap-y-4 px-5 py-4'>
            <NextImage
              src={user?.image as string}
              alt={user?.name as string}
              width={100}
              height={100}
              classNames={{ image: 'rounded-full', blur: 'rounded-full' }}
            />
            <h1 className='text-2xl font-bold'>{user?.name}</h1>
          </Box>
          <Separator />
          <Box className='h-full flex flex-col items-center gap-y-4 px-5 py-4 mt-2'>
            <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
              {accountNavRoutes.map((route, index) => {
                return (
                  <Link
                    key={index}
                    href={`/${params.name}/${route.href}`}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex gap-4'
                    )}
                  >
                    {route.icon && route.icon}
                    {route.title}
                  </Link>
                );
              })}
            </nav>
          </Box>
        </div>
        <Separator orientation='vertical' className='hidden lg:block' />
        <Separator orientation='horizontal' className='block lg:hidden' />

        {/*div for the main elements of the page*/}
        <main className='h-full flex-1 overflow-y-auto p-2 rounded-lg ml-4'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AccountNav;
