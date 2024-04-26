import React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function UploadFile() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // eslint-disable-next-line no-console
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className='relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div className=' text-center'>
            <div className=' border p-2 rounded-md max-w-min mx-auto'>
              <Icons.upload className='w-6 h-6 text-gray-400 dark:text-gray-300' />
            </div>

            <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Drag files</span>
            </p>
            <p className='text-xs text-gray-400 dark:text-gray-400'>
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id='dropzone-file'
          accept='image/png, image/jpeg'
          type='file'
          className='hidden'
        />
      </div>
      <div>
        <p className='font-medium my-2 mt-6 text-muted-foreground text-sm'>
          Uploaded Files
        </p>
        <ScrollArea className='h-40'>
          <div className='space-y-2 pr-3'>
            <div className='flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group'>
              <div className='flex items-center flex-1 p-2'>
                <div className='w-full ml-2 space-y-1'>
                  <Icons.FileImage className='w-6 h-6 text-gray-400 dark:text-gray-300' />
                  <div className='text-sm flex justify-between'>
                    <p className='text-muted-foreground '>ImageName.png</p>
                    <span className='text-xs'>56%</span>
                  </div>
                  <Progress value={56} />
                </div>
              </div>
              <div className='bg-destructive text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex'>
                <Icons.close size={20} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
