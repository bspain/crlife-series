import { readFileSync, existsSync } from 'fs';
import { writeJson, JsonWriteOptions } from '../lib/json-writer';

interface ContentOptions {
    sourceFile: string,
    file: string,
    contentId: string
}

async function action(options: ContentOptions) {
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
            query: `$.content[?(@.id=='${options.contentId}')].value`,
            value: sourceContent    
        }]
    }

    writeJson(writeOptions);
}

export {
    ContentOptions,
    action
}