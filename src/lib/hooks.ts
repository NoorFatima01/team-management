import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

const useDownload = (filePaths: string[]) => {
  const folderName1 = filePaths[0].split('/')[0];
  const folderName2 = filePaths[0].split('/')[1];
  const folderName = folderName1 + '-' + folderName2;
  async function handleZip() {
    const clientSupabase = createSupabaseBrowserClient();
    // Create a new zip file
    const zipFileWriter = new BlobWriter('application/zip');
    const zipWriter = new ZipWriter(zipFileWriter, { bufferedWrite: true });

    for (const filePath of filePaths) {
      const { data, error } = await clientSupabase.storage
        .from('taskFiles')
        .download(filePath);

      if (error) {
        throw new Error('Error downloading file');
      }

      if (data) {
        await zipWriter.add(filePath, new BlobReader(data));
      }
    }

    // Download the zip file
    const url = URL.createObjectURL(await zipWriter.close());
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', folderName);

    document.body.appendChild(link);

    link.click();
  }
  return { handleZip };
};

export { useDownload };
