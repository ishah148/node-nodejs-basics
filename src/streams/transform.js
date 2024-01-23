import { Transform } from 'node:stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, _, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('');
            callback(null, `reversed result: ${reversedChunk}` + '\n\nEntered text: ');
        }
    });

    console.log('Please enter any text.');
    console.log('To reverse entered text, press Enter.');
    console.log('To terminate the program, press Ctrl + C:\n');
    process.stdout.write('Entered text: ');

    return new Promise((resolve, reject) => {
        process.stdin.pipe(reverseTransform).pipe(process.stdout);
        process.stdin.on('end', resolve);
        process.stdin.on('error', reject);
    });
};

await transform();