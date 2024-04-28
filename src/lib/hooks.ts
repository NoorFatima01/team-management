import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser-clients';

const useDownload = (filePath: string) => {
  //get the 2nd folder anme from filePath
  const folderName1 = filePath.split('/')[1];
  const folderName2 = filePath.split('/')[2];
  const folderName = folderName1 + '-' + folderName2;

  async function handleZip() {
    const clientSupabase = createSupabaseBrowserClient();
    const { data, error } = await clientSupabase.storage
      .from('taskFiles')
      .download(filePath);
    if (error) {
      throw new Error('Error downloading file');
    }
    // Create a new zip file
    const zipFileWriter = new BlobWriter('application/zip');
    const zipWriter = new ZipWriter(zipFileWriter, { bufferedWrite: true });
    if (data) {
      await zipWriter.add(filePath, new BlobReader(data));
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
