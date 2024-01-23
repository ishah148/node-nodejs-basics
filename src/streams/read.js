import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    const stream = createReadStream(filePath, { encoding: 'utf8' });

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
        stream.on('end', resolve);
        stream.on('error', reject);
    });
};

await read();