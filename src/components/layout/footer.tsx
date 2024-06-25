import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/icons';

export default function Footer() {
  return (
    <footer className='border py-4 '>
      <div className='container flex flex-col lg:flex-row justify-between items-center gap-2'>
        <div className='flex justify-between items-center gap-2 flex-col lg:flex-row'>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          <div className='flex gap-3'>
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
