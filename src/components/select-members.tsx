'use client';

import { CheckIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface SelectMembersProps {
  options: {
    label: string;
    email: string;
    value: string;
  }[];
  selectedMembers: Set<string>;
  updateSelectedMembers: (memberIdOrSet?: string | Set<string>) => void;
}

const SelectMembers = ({
  options,
  selectedMembers,
  updateSelectedMembers,
}: SelectMembersProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild className='m-8'>
        <Button variant='outline' className='h-8 border-solid'>
          Select Members
          {selectedMembers && selectedMembers.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal'
              >
                {selectedMembers.size}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350px] p-0' align='start'>
        <Command>
          <CommandInput placeholder='Search members' />
          <CommandList>
            <CommandEmpty>No members found</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedMembers.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      updateSelectedMembers(option.value);
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    <span>{option.label}</span>
                    <span className='ml-20 flex h-4 w-4 items-center justify-center font-mono text-xs'>
                      {option.email}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup></CommandGroup>
            {selectedMembers && selectedMembers?.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      updateSelectedMembers();
                    }}
                    className='justify-center text-center'
                  >
                    Clear
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectMembers;
