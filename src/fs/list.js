import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  try {
    const folderPath = join(__dirname, 'files');
    const fileNames = await fsPromises.readdir(folderPath);
    fileNames.forEach((fileName) => {
      console.log(fileName);
    });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await list();