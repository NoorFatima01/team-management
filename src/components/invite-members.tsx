'use client';

import { useMutation } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

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
  teamName: string;
  team_id: string;
}

interface invitationProps {
  member_id: string;
  text: string;
  team_id: string;
}

export default function InviteMembers({
  members,
  teamName,
  team_id,
}: InviteMembersProps) {
  async function addInvitation(data: invitationProps) {
    const response = await fetch('/api/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok && response.status !== 201) {
      throw new Error('Failed to send notification');
    }
  }

  async function addNotification({
    text,
    member_id,
  }: {
    text: string;
    member_id: string;
  }) {
    const response = await fetch('/api/notifications/memberNotifications', {
      method: 'POST',
      body: JSON.stringify({ text, member_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok && response.status !== 201) {
      throw new Error('Failed to send notification');
    }
  }

  const { mutate: notificationMutate } = useMutation({
    mutationFn: addNotification,
  });

  const { mutate: invitationMutate } = useMutation({
    mutationFn: addInvitation,
    onSuccess: (_, invitationData) => {
      // Add notifications in the database
      const notificationData = {
        text: invitationData.text,
        member_id: invitationData.member_id,
      };
      notificationMutate(notificationData);
      toast.success('Invitation sent');
    },
    onError: () => {
      toast.error('Failed to send invitation');
    },
  });

  async function handleClick(id: string) {
    const text = `You have been invited to join the ${teamName} team`;
    const invitationData: invitationProps = {
      member_id: id,
      text,
      team_id,
    };
    //add invitation to the database
    invitationMutate(invitationData);
  }

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
              They will receive an invitation to join your team.
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
                    onClick={() => handleClick(member.id)}
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
