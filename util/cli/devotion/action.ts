import { readFileSync, existsSync } from 'fs';
import { WriteOptions, action as WriteAction } from '../write/action';

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

    const sourceContent = encodeURIComponent(readFileSync(options.sourceFile).toString('UTF-8'));

    const writeOptions : WriteOptions = {
        file: options.targetFile,
        query: `$.content[?(@.id=='${options.devotionId}')].value`,
        value: sourceContent
    }

    WriteAction(writeOptions);
}

export {
    DevotionOptions,
    action
}