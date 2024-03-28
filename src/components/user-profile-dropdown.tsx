'use client';
import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SessionUser } from '@/types';

interface UserProfileDropdownProps {
  user: Pick<SessionUser, 'name' | 'image' | 'email'>;
}

const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  return (
    <div>
      {' '}
      {user?.name && user?.email && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='h-auto rounded-full p-0'
              variant='ghost'
              size='sm'
              aria-label='Use menu trigger'
            >
              <Avatar className='size-8'>
                <AvatarImage src={user.image} />

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
              <div className='flex flex-col space-y-1 leading-none'>
                {user.name && <p className='font-medium'>{user.name}</p>}
                {user.email && (
                  <p className='w-[200px] truncate text-sm text-muted-foreground'>
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/'>
                <Icons.settings className='mr-2 size-4' /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${user.name}`}>
                <Icons.user className='mr-2 size-4' /> My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserProfileDropdown;
