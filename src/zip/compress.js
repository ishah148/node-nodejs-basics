import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream, createWriteStream } from 'node:fs';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFile = join(__dirname, 'files', 'fileToCompress.txt');
  const outputFile = join(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  const compressedStream = readStream.pipe(gzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    compressedStream.on('finish', () => {
      console.log('File compressed successfully.');
      resolve();
    });

    compressedStream.on('error', (error) => {
      console.error('An error occurred while compressing the file:', error);
      reject(error);
    });
  });
};

(async () => {
  try {
    await compress();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();