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

export default function InviteMembers() {
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
      </DialogContent>
    </Dialog>
  );
}
