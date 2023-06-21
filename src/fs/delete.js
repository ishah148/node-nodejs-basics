import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  try {
    const filePath = join(__dirname, 'files', 'fileToRemove.txt');
    await fs.unlink(filePath);
    console.log('File deleted successfully.');
  } catch (error) {
    if (error.code === 'ENOENT') {
        console.log('FS operation failed. There is no "fileToRemove.txt" file.');
    } else {
        console.log(error.code);
    }
  }
};

await remove();