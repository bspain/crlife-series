import { readFileSync, existsSync } from 'fs';
import { writeJson, JsonWriteOptions } from '../lib/json-writer';

interface DevotionOptions {
    sourceFile: string,
    file: string,
    devotionId: string
}

async function action(options: DevotionOptions) {
    if (!existsSync(options.sourceFile))
    {
        throw new Error(`Source file not found: ${options.sourceFile}`);
    }

    if (!existsSync(options.file))
    {
        throw new Error(`Target file not found: ${options.file}`);        
    }

    const sourceContent = encodeURIComponent(readFileSync(options.sourceFile).toString('UTF-8'));

    const writeOptions : JsonWriteOptions = {
        file: options.file,
        entries: [{
            query: `$.content[?(@.id=='${options.devotionId}')].value`,
            value: sourceContent    
        }]
    }

    writeJson(writeOptions);
}

export {
    DevotionOptions,
    action
}