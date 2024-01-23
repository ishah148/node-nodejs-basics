import { promises as fsPromises, constants as fsConstants } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const directoryPath = join(__dirname, "files");
  const filePath = join(directoryPath, "fresh.txt");
  const fileContent = 'I am fresh and young';

  try {
    await fsPromises.access(filePath, fsConstants.F_OK);
    throw new Error('FS operation failed: File already exists');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsPromises.writeFile(filePath, fileContent);
      console.log('File created successfully');
    } else {
        console.log(err.message);
    }
  }
};

await create();