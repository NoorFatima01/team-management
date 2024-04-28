'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
const ProfilePageBreadcrumb = () => {
  const pathname = usePathname();
  const isCreateTeamPage = pathname.includes('/create-team');
  const isRegisterMemberPage = pathname.includes('/register-member');
  const pathArray = pathname.split('/');
  const profilePageLink = pathArray.slice(0, 3).join('/');

  return (
    <div className='px-4 py-2'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/' className='text-lg font-bold'>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator></BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink
              href={profilePageLink}
              className={
                pathArray.length === 3
                  ? 'text-foreground font-bold text-xl'
                  : 'text-muted-foreground text-lg font-bold'
              }
            >
              My Profile
            </BreadcrumbLink>
          </BreadcrumbItem>

          {isCreateTeamPage && (
            <>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={pathname}
                  className='text-foreground font-bold text-xl'
                >
                  Create a New Team
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {isRegisterMemberPage && (
            <>
              <BreadcrumbSeparator></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={pathname}
                  className='text-foreground font-bold text-xl'
                >
                  User Registration
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ProfilePageBreadcrumb;
