import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', (data) => hash.update(data));
    stream.on('error', (error) => reject(error));
    stream.on('end', () => {
      const hashHex = hash.digest('hex');
      console.log(hashHex);
      resolve();
    });
  });
};

await calculateHash();