'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { teamFormSchema, teamFormSchemaType } from '@/lib/schemas';
import { getAllAvailableMembers } from '@/lib/utils';

import { Icons } from '@/components/icons';
import SelectMembers from '@/components/select-members';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { membersAvailibilityCheckType, SessionUser } from '@/types';

interface CreateTeamFormProps {
  user: Pick<SessionUser, 'name' | 'id'>;
}

export default function CreateTeamForm({ user }: CreateTeamFormProps) {
  const { name } = user;
  const [isLoading] = useState(false);
  const [membersList, setMembersList] = useState<
    { label: string; email: string; value: string }[]
  >([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set()
  );

  const form = useForm<teamFormSchemaType>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: '',
      description: '',
      team_head: name as string,
      members: [],
    },
  });

  const { data: membersOpenToWork } = useQuery({
    queryKey: ['members'],
    queryFn: getAllAvailableMembers,
  });

  useEffect(() => {
    if (membersOpenToWork === undefined) return;
    const members = membersOpenToWork?.map(
      (member: membersAvailibilityCheckType) => {
        return {
          label: member.username,
          email: member.email,
          value: member.id,
        };
      }
    );
    setMembersList(members);
  }, [membersOpenToWork]);

  const updateSelectedMembers = (memberIdOrSet?: string | Set<string>) => {
    if (memberIdOrSet === undefined) {
      setSelectedMembers(new Set());
      return;
    }

    if (memberIdOrSet instanceof Set) {
      setSelectedMembers(memberIdOrSet);
      return;
    }
    const newSelectedEmployees = new Set(selectedMembers);
    const memberId = memberIdOrSet;
    if (selectedMembers.has(memberId)) {
      newSelectedEmployees.delete(memberId);
    } else {
      newSelectedEmployees.add(memberId);
    }
    setSelectedMembers(newSelectedEmployees);
  };

  return (
    <Form {...form}>
      <form className='mx-auto grid w-full max-w-md gap-6 '>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  id='add-dept-name'
                  type='text'
                  placeholder='Enter Department Name'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  id='add-dept-description'
                  type='text'
                  placeholder='Enter Department Description'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='team_head'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dept Head</FormLabel>
              <FormControl>
                <Input
                  id='add-dept-head'
                  type='text'
                  placeholder='Enter Department Head'
                  disabled
                  {...field}
                />
              </FormControl>
              <FormDescription>This field can not be changed</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='members'
          render={() => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              <FormControl>
                <SelectMembers
                  options={membersList}
                  selectedMembers={selectedMembers}
                  updateSelectedMembers={updateSelectedMembers}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className='mr-2 size-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Create Team
          <span className='sr-only'>Create Team</span>
        </Button>
      </form>
    </Form>
  );
}
