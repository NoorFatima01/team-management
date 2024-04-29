'use client';

import { FileObject } from '@supabase/storage-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { useDownload } from '@/lib/hooks';
import { taskSchemaType } from '@/lib/schemas';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';
import useSession from '@/lib/supabase/use-session';
import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecentActivityProps extends React.HTMLProps<HTMLDivElement> {
  project: string;
  task: taskSchemaType;
}

type FileDataAndUploader = {
  file_id: string;
  name: string;
  path: string;
  uploader_id: string;
  uploader_name: string;
};

export default function RecentActivity({
  project,
  task,
  className,
}: RecentActivityProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<
    Set<FileDataAndUploader>
  >(new Set());
  const session = useSession();
  const userId = session?.user?.id;
  const { handleZip } = useDownload(
    selectedFiles.size > 0
      ? Array.from(selectedFiles).map((file) => file.path)
      : ['']
  );
  const clientSupabase = createSupabaseBrowserClient();
  const listAllFiles = async () => {
    const folderName1 = task.filePath.split('/')[1];
    const folderName2 = task.filePath.split('/')[2];
    const folderName = folderName1 + '/' + folderName2;
    const { data: fileData } = await clientSupabase.storage
      .from('taskFiles')
      .list(folderName);

    if (fileData) {
      const fileDataWithoutReferenceMaterial = fileData.filter(
        (file) => !task.filePath.includes(file.name)
      );
      const files: FileDataAndUploader[] | null = (
        await Promise.all(
          fileDataWithoutReferenceMaterial.map(async (file: FileObject) => {
            const { data: fileUploaderId } = await clientSupabase
              .from('files-uploaders')
              .select('uploader_id')
              .eq('file_id', file.id)
              .single();
            //get name from profiles table
            const { data: fileUploader } = await clientSupabase
              .from('profiles')
              .select('username')
              .eq('id', fileUploaderId?.uploader_id)
              .single();
            if (fileUploader) {
              return {
                file_id: file.id,
                name: file.name as string,
                path: folderName + '/' + file.name,
                uploader_id: fileUploaderId?.uploader_id as string,
                uploader_name: fileUploader.username as string,
              };
            }
          })
        )
      ).filter(Boolean) as FileDataAndUploader[];
      return files;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['taskFiles', project, task.title],
    queryFn: listAllFiles,
    retry: 10,
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className='flex justify-between'>
        <h3 className='text-xl font-extrabold'>Recent Activity</h3>
        {selectedFiles.size > 0 && (
          <Button
            size='sm'
            variant='outline'
            className='mr-4'
            onClick={async () => {
              await handleZip();
            }}
          >
            Download Selected Files
          </Button>
        )}
      </div>
      {isLoading && <div>Loading...</div>}
      {data && data.length > 0 ? (
        <ScrollArea viewPortClassName='h-full'>
          <div className='flex flex-col'>
            {data.map((file, index) => {
              const isSelected = selectedFiles.has(file);
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 m-4 space-y-0.5 ${
                    file.uploader_id === userId ? 'self-end' : 'self-start'
                  } `}
                >
                  <div className='m-4 space-y-0.5 flex-col bg-sky-900 rounded-md p-3  max-w-1/2 inline-block'>
                    <p className='text-muted-foreground text-sm font-semibold'>
                      {file.uploader_name}{' '}
                      <span className='text-xs'>submitted</span>
                    </p>{' '}
                    <p className='text-primary-foreground'>
                      <span>
                        <Icons.fileText className='size-4 text-gray-400 dark:text-gray-300' />
                      </span>
                      {file.name}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      if (isSelected) {
                        selectedFiles.delete(file);
                        setSelectedFiles(new Set(selectedFiles));
                      } else {
                        selectedFiles.add(file);
                        setSelectedFiles(new Set(selectedFiles));
                      }
                    }}
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary hover:cursor-pointer',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50 [&_svg]:invisible'
                    )}
                  >
                    <Icons.check className={cn('size-4')} />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <div className='self-center  mt-6 rounded-md border border-muted-foreground p-2'>
          <p className='text-muted-foreground text-sm'>No files uploaded yet</p>
        </div>
      )}
    </div>
  );
}
