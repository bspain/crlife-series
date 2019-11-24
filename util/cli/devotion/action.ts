import { readFileSync, existsSync, writeFileSync } from 'fs';


interface DevotionOptions {
    sourceFile: string,
    targetFile: string,
    devotionId: string
}

async function action(options: DevotionOptions) {
    if (!existsSync(options.sourceFile))
    {
        throw new Error(`Source file not found: ${options.sourceFile}`);
    }

    if (!existsSync(options.targetFile))
    {
        throw new Error(`Target file not found: ${options.targetFile}`);        
    }

    const sourceContent = readFileSync(options.sourceFile).toString('UTF-8');

    const writeOptions = 
}