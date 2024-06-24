import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/icons';

export default function Footer() {
  return (
    <footer className='border py-4 '>
      <div className='container flex justify-between'>
        <div className='flex justify-between gap-2'>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          <Icons.gitHub className='size-6' />
          <Link
            href='https://github.com/NoorFatima01/team-management'
            target='_blank'
          >
            <p className='text-md text-blue-600 hover:underline'>
              Visit the Github repo
            </p>
          </Link>
        </div>
        <div className='mb-2 flex gap-2'>
          <span>Made by</span>
          <Link href='https://github.com/NoorFatima01' target='_blank'>
            <p className='text-md text-blue-600 hover:underline'>Noor Fatima</p>
          </Link>

          <span>and</span>
          <Link href='https://github.com/Amama-Fatima' target='_blank'>
            <p className='text-md text-blue-600 hover:underline'>
              Amama Fatima
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
