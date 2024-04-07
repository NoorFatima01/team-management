'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Icons } from '@/components/icons';

import { Button } from '../components/ui/button';
import { invitationSchemaType } from '../lib/schemas';
import useSession from '../lib/supabase/use-session';

const Invitations = () => {
  const session = useSession();
  const user = session?.user;
  const userId = user?.id;

  const [isLoading, setIsLoading] = useState(false);

  //fetch the invitations that are pending
  const { data: pendingInvitationsData, isLoading: pendingInvitationsLoading } =
    useQuery({
      queryKey: ['invitations', userId],
      queryFn: async () => {
        if (!userId) {
          return <h1>Not Logged in</h1>;
        }
        const response = await fetch(`/api/invitations/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return await response.json();
      },
      retry: 10,
    });

  async function updateInvitation({
    status,
    inv_id,
  }: {
    status: string;
    inv_id: string;
  }) {
    //change the status of the invitation to accepted
    const response = await fetch(`/api/invitations/invitation/${inv_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update invitation');
    }
  }

  const { mutate: invitationUpdate } = useMutation({
    mutationFn: updateInvitation,
    onSuccess: () => {
      toast.success('Invitation updated');
      setIsLoading(false);
    },
    onError: () => {
      toast.error('Failed to update invitation');
      setIsLoading(false);
    },
  });

  async function updateTeam({
    team_id,
    member_id,
  }: {
    team_id: string;
    member_id: string;
  }) {
    //also update the team to include this member
    const response = await fetch(`/api/teams/team/${team_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ member_id: member_id }),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update team');
    }
  }

  const { mutate: teamUpdate } = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      toast.success('Team Updated');
    },
    onError: () => {
      toast.error('Failed to update team');
    },
  });

  async function handleAcceptance(
    inv_id: string,
    team_id: string,
    member_id: string
  ) {
    setIsLoading(true);
    //change the status of the invitation to accepted
    invitationUpdate({ status: 'ACCEPTED', inv_id: inv_id });

    //also update the department to include this member
    teamUpdate({ team_id: team_id, member_id: member_id });
  }

  async function handleRejection(inv_id: string) {
    setIsLoading(true);
    //change the status of the invitation to rejected
    invitationUpdate({ status: 'REJECTED', inv_id: inv_id });
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Pending Invitations</h1>
      <div className='mt-2'>
        {pendingInvitationsLoading ? (
          <h1>Loading...</h1>
        ) : pendingInvitationsData.data?.length === 0 ? (
          <h1>No pending invitations</h1>
        ) : (
          <div className='px-2 py-4 '>
            <div className='flex flex-col border-2 border-white rounded-md'>
              {pendingInvitationsData.data?.map(
                (invitation: invitationSchemaType) => (
                  <div
                    key={invitation.inv_id}
                    className='flex items-center justify-between p-3'
                  >
                    <h3>{invitation.text}</h3>
                    <div>
                      {isLoading ? (
                        <Icons.spinner
                          className='mr-2 size-8 animate-spin text-primary-foreground rounded-md p-1'
                          aria-hidden='true'
                        />
                      ) : (
                        <div className='flex gap-3'>
                          <Button
                            onClick={() => {
                              handleAcceptance(
                                invitation.inv_id,
                                invitation.team_id,
                                invitation.member_id
                              );
                            }}
                            disabled={isLoading}
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => {
                              handleRejection(invitation.inv_id);
                            }}
                            disabled={isLoading}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invitations;
