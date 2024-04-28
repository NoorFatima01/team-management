'use client';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { siteConfig } from '@/constant/config';

interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

interface MainNavProps {
  items: NavItem[];
  username: string | undefined | null;
}

export default function MainNav({ items, username }: MainNavProps) {
  return (
    <div className='flex gap-6 lg:gap-10'>
      <Link href='/' className='hidden items-center space-x-2 lg:flex'>
        <Icons.logo className='size-6' />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className='hidden lg:flex gap-6'>
          {items?.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={cn(
                'flex items-center text-lg font-semibold text-muted-foreground hover:text-foreground/80 sm:text-sm',
                item.disabled && 'cursor-not-allowed opacity-80',
                (item.title === 'Dashboard' || item.title === 'Inbox') &&
                  !username &&
                  'hidden'
              )}
            >
              {item.icon ? <item.icon className='size-6' /> : null}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='-ml-4 text-base hover:bg-transparent focus:ring-0 lg:hidden'
          >
            <span>Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          sideOffset={24}
          className='max-h-[calc(100vh-10rem)] w-60 overflow-y-auto'
        >
          <DropdownMenuLabel className='flex items-center'>
            <Icons.logo className='mr-2 size-4' />
            {siteConfig.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.length
            ? items?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                  className='flex items-center gap-2.5'
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon className='size-4' aria-hidden />}
                    <span className='line-clamp-1'>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))
            : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
