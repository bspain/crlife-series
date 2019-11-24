import { readFileSync, existsSync } from 'fs';
import { nodes, stringify, value } from 'jsonpath';

interface WriteOptions {
    file: string,
    query: string,
    value: string
}

async function action(options: WriteOptions) {
    if (!existsSync(options.file))
    {
        throw new Error(`File not found: ${options.file}`);
    }


    const json = JSON.parse(readFileSync(options.file).toString('UTF-8'));

    /* examples: https://github.com/dchester/jsonpath
    *   "title"
    *   "$.content[?(@.id=='devotion')]"
    */
    const content = nodes(json, options.query);

    if (options.value)
    {
        // Ensure result nodes is only 1
        if(content.length !== 1)
        {
            throw new Error(`Cannot update value, JSON query returned ${content.length} nodes.`)
        }

        // What's the stringified path
        const path = stringify(content[0].path);
        console.info(path);

        value(json, path, options.value);

        console.info(json);
    }
    else
    {
        // Just log what we got
        console.log(content);
    }
}

export {
    WriteOptions,
    action
}