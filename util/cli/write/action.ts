import { readFileSync, existsSync, writeFileSync } from 'fs';
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

    if (!options.value)
    {
        // Just log what we found and return
        console.info(content);
        return;
    }

    // Ensure result nodes is only 1
    if(content.length !== 1)
    {
        throw new Error(`Cannot update value, JSON query returned ${content.length} nodes.`)
    }

    const path = stringify(content[0].path);
    value(json, path, options.value);

    // Write back to file
    writeFileSync(options.file, JSON.stringify(json));
    console.log(`Update written to ${options.file}`);
}

export {
    WriteOptions,
    action
}