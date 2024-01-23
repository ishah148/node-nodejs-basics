import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  try {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const fileContent = await fsPromises.readFile(filePath, 'utf-8');
    console.log(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
        throw new Error('FS operation failed. There is no "fileToRead.txt" file');
    }
    throw new Error('FS operation failed');
  }
};

await read();