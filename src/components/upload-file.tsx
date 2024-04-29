import React, { useState } from 'react';
import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
interface UploadFileProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  maxSize?: number;
  maxFiles?: number;
  isUploading?: boolean;
  isDisabled?: boolean;
}

export default function UploadFile<TFieldValues extends FieldValues>({
  name,

  setValue,
  maxSize = 1024 * 1024 * 8,
  maxFiles = 1,
}: UploadFileProps<TFieldValues>) {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setFile(acceptedFiles[0]);

      acceptedFiles.forEach((file) => {
        if (!file) return;
        //store the previous files as well
        setValue(name, file as PathValue<TFieldValues, Path<TFieldValues>>, {
          shouldValidate: true,
        });
      });

      rejectedFiles.forEach((file) => {
        setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
          shouldValidate: true,
        });

        switch (file.errors[0]?.code) {
          case 'file-invalid-type':
            toast.error('Invalid file type');
            break;
          case 'file-too-large':
            // eslint-disable-next-line no-case-declarations
            const size = (file.file.size / 1024 / 1024).toFixed(2);
            toast.error(
              `File is too large (${size}MB). Max size is ${
                maxSize / 1024 / 1024
              }MB`
            );
            break;
          case 'too-many-files':
            toast.error(`Too many files. Max files is ${maxFiles}`);
            break;
          default:
            toast.error(file.errors[0]?.message ?? 'Error uploading file');
            break;
        }
      });
    },
    [maxSize, maxFiles, name, setFile, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept,    Note: putting accept as one of the options here causes the file picker to never open upon clicking the dropzone. Github issue thread did not provide a solution. will have to validate type using zod after all
    maxSize,
    maxFiles,
  });

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
              Click to upload a file &#40;file should be under 700KB &#41;
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
      {file ? (
        <div>
          <p className='font-medium my-2 mt-6 text-muted-foreground text-sm'>
            Uploaded File
          </p>

          <div className='space-y-2 pr-3'>
            {file && (
              <div className='flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group'>
                <div className='flex items-center flex-1 p-2'>
                  <div className='w-full ml-2 space-y-1'>
                    <Icons.fileText className='w-6 h-6 text-gray-400 dark:text-gray-300' />

                    <p className='text-muted-foreground '>{file.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className='font-medium my-2 mt-6 text-muted-foreground text-sm'>
          No file uploaded
        </p>
      )}
    </div>
  );
}
