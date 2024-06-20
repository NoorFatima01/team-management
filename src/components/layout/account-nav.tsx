'use client';
import { useParams } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import Box from '@/components/Box';
import { Icons } from '@/components/icons';
import ProfilePageBreadcrumb from '@/components/layout/profile-page-breadcrumb';
import NextImage from '@/components/NextImage';
import { ProgressBar, ProgressBarLink } from '@/components/progress-bar';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ProfileNotFound from '@/app/my-profile/[name]/not-found';

import { SessionUser } from '@/types/index';

interface AccountNavProps {
  children?: React.ReactNode;
  user: SessionUser;
}

const accountNavRoutes = [
  {
    shouldRender: true,
    title: 'New Team',
    href: '/create-team',
    icon: <Icons.add className='size-4' />,
  },
  {
    shouldRender: true,
    title: 'Invitations',
    href: '/invitations',
    icon: <Icons.invite className='size-4' />,
  },
];

const AccountNav = ({ user, children }: AccountNavProps) => {
  const params = useParams();
  const paramName = decodeURIComponent(params.name as string);

  //code for when the url is /any-random-word, show 404 page
  if (paramName !== user.name)
    return (
      <div>
        <ProfileNotFound />
      </div>
    );

  return (
    <div className='h-screen p-2'>
      <div className='flex flex-col lg:flex-row h-full'>
        <div className='flex flex-col'>
          {/*div for sidebar boxes*/}
          <Box className='flex flex-col items-center gap-y-4 px-5 py-4'>
            <NextImage
              src={user.image ? (user.image as string) : '/images/prof-pic.jpg'}
              alt={user?.name as string}
              width={100}
              height={100}
              classNames={{ image: 'rounded-full', blur: 'rounded-full' }}
            />
            <h1 className='text-2xl font-bold'>{user?.name}</h1>
          </Box>
          <Separator className='bg-gray-100' />
          <Box className='h-full flex flex-col items-center gap-y-4 px-5 py-4 mt-2'>
            <ProgressBar className='fixed top-0 left-0 h-1 bg-primary'>
              <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
                {accountNavRoutes.map((route, index) => {
                  if (route.shouldRender) {
                    return (
                      <ProgressBarLink
                        key={index}
                        href={`/my-profile/${params.name}/${route.href}`}
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'flex gap-4'
                        )}
                      >
                        {route.icon && route.icon}
                        {route.title}
                      </ProgressBarLink>
                    );
                  } else {
                    return null;
                  }
                })}
              </nav>
            </ProgressBar>
          </Box>
        </div>
        <Separator
          orientation='vertical'
          className='hidden lg:block bg-gray-100'
        />
        <Separator
          orientation='horizontal'
          className='block lg:hidden bg-gray-100'
        />

        {/*div for the main elements of the page*/}
        <main className='h-full flex-1 overflow-y-auto p-2 rounded-lg ml-4'>
          <ProfilePageBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AccountNav;
