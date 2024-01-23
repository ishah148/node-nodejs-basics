import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFile = join(__dirname, 'files', 'archive.gz');
  const outputFile = join(__dirname, 'files', 'unzippedFile.txt');

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();

  const decompressedStream = readStream.pipe(gunzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    decompressedStream.on('finish', () => {
      console.log('File decompressed successfully.');
      resolve();
    });

    decompressedStream.on('error', (error) => {
      console.error('An error occurred while decompressing the file:', error);
      reject(error);
    });
  });
};

(async () => {
  try {
    await decompress();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();