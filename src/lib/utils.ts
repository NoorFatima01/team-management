import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { availableMember } from '@/types';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAllAvailableMembers() {
  const res = await fetch('/api/member');
  const members = await res.json();
  //filter out those whose members is null
  const availableMembers = members.filter(
    (member: availableMember) => member.members !== null
  );
  return availableMembers as availableMember[];
}

export function formatNotificationDateTime(created_at: string) {
  const date = new Date(created_at);
  const now = new Date().getTime();

  // Convert date to number
  const dateNumber = date.getTime();

  // Calculate the difference in milliseconds
  const timeDifference: number = now - dateNumber;

  // Calculate the difference in days
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  if (daysDifference >= 1) {
    // If it has been more than a day, return the date part
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  } else {
    // If it has been less than a day, return the time part
    const formattedTime = `${date.getHours()}:${
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }`;
    return formattedTime;
  }
}
