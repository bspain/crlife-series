import { readFileSync, existsSync, writeFileSync } from 'fs';
import { nodes, stringify, value } from 'jsonpath';

export interface JsonWriteOptions {
    file: string,
    entries: JsonWriteEntry[]
}

export interface JsonWriteEntry {
    query: string,
    value: string
}

export async function writeJson(options: JsonWriteOptions) {
    if (!existsSync(options.file))
    {
        throw new Error(`File not found: ${options.file}`);
    }

    const json = JSON.parse(readFileSync(options.file).toString('UTF-8'));

    options.entries.forEach(entry => {
        /* examples: https://github.com/dchester/jsonpath
        *   "title"
        *   "$.content[?(@.id=='devotion')]"
        */
        const content = nodes(json, entry.query);

        if (!entry.value)
        {
            // Just log what we found and return
            console.info(content);
            return;
        }

        // Ensure result nodes is only 1
        if(content.length !== 1)
        {
            throw new Error(`Cannot update value, JSON query '${entry.query}' returned ${content.length} nodes.`)
        }

        const path = stringify(content[0].path);
        value(json, path, entry.value);
    })

    // Write back to file
    writeFileSync(options.file, JSON.stringify(json, null, 4));
    console.log(`Update written to ${options.file}`);
}