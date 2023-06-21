import { promises as fsPromises, constants as fsConstants } from 'fs';
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const sourceDir = join(__dirname, "files");
    const destinationDir = join(__dirname, "files_copy");

    try {
        await fsPromises.access(sourceDir, fsConstants.F_OK);

        try {
            await fsPromises.access(destinationDir, fsConstants.F_OK);
            throw new Error('FS operation failed: Destination directory already exists.');
        } catch (error) {
            if (error.code === 'ENOENT') {

                await fsPromises.mkdir(destinationDir);

                const files = await fsPromises.readdir(sourceDir);

                for (const file of files) {
                    const sourceFile = `${sourceDir}/${file}`;
                    const destinationFile = `${destinationDir}/${file}`;

                    await fsPromises.copyFile(sourceFile, destinationFile);
                }

                console.log('Files copied successfully!');
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('FS operation failed: "files" directory don\'t exist.');
        } else {
            console.log(`${error.message}`);
        }
    }
};

await copy();
