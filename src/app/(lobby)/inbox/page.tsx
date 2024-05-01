import Image from 'next/image';
import React from 'react';

export default function InboxPage() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-semibold mt-8 tracking-tighter'>
        Chat with your team
      </h1>
      <Image src='/images/inbox.png' alt='Inbox' width={400} height={400} />
    </div>
  );
}
