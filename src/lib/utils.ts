import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { membersAvailibilityCheckType } from '@/types';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAllAvailableMembers() {
  const res = await fetch('/api/member');
  const members = await res.json();
  //filter out those whose members is null
  const availableMembers = members.filter(
    (member: membersAvailibilityCheckType) => member.members !== null
  );
  return availableMembers as membersAvailibilityCheckType[];
}
