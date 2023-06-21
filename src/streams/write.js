import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream, constants  } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');

  const stream = createWriteStream(filePath, {
    encoding: 'utf8',
    flags: constants.O_APPEND | constants.O_CREAT,
    mode: 0o666
  });

  console.log('Please enter any text.\nTo terminate the program, press Ctrl + C:\n');

  return new Promise((resolve, reject) => {
    process.stdin.pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

await write();