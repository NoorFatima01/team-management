'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { availableMember } from '@/types/index';

interface InviteMembersProps {
  members: availableMember[];
}

export default function InviteMembers({ members }: InviteMembersProps) {
  // async function handleClick(member_id: string) {
  //   console.log('Invitation sent to member_id:', member_id);
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='self-end'>
          Invite Members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>
            <p>
              Invite members to your team by entering their email addresses.
              They will receive an email with an invitation to join your team.
            </p>
          </DialogDescription>
        </DialogHeader>
        {members?.length > 0 ? (
          <div className='flex flex-col gap-4'>
            {members.map((member) => (
              <div
                key={member.id}
                className=' flex flex-col justify-center rounded-full p-4'
              >
                <div className='flex justify-between mb-2'>
                  <p className='font-bold'>{member.username}</p>
                  <Button
                    size='sm'
                    variant='secondary'
                    // onClick={() => handleClick(member.id)}
                  >
                    Send Invite
                  </Button>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        ) : (
          <div>No available Members</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
