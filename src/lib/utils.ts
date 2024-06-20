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
  const availableMembers = members.map((member: availableMember) => member);
  return availableMembers as availableMember[];
}

export async function getTeamsUserIsIn(user_id: string | undefined) {
  if (!user_id) return [];
  const res = await fetch(`/api/teams/${user_id}`);
  const teams = await res.json();
  return teams;
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
    // If it has been less than a day, return the time parts
    const formattedTime = `${date.getHours()}:${
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }`;
    return formattedTime;
  }
}

export function formatDate(timestamp: string) {
  const date = new Date(timestamp);

  // Step 2: Define the formatting options for only the date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Step 3: Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}
