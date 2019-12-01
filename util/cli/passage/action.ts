import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { writeJson, JsonWriteOptions } from '../lib/json-writer';

interface PassageOptions {
    reference: string,
    file: string, 
    passageId: string,
    title: string
}

async function action(options: PassageOptions, apiKey: string) {
    const request = `http://api.nlt.to/api/passages?version=NLT&ref=${options.reference}&key=${apiKey}`;

    const response = await fetch(request, {});
    if (response.status !== 200)
    {
        throw new Error(`Non 200 response from api.nlt.to`);
    }

    const payload = await response.text();

    if (payload == '')
    {
        throw new Error(`api.nlt.to returned no data, check your reference?  ${options.reference}`)
    }

    const biblePayload = cheerio.load(payload)('div[id="bibletext"]');
    biblePayload.removeAttr('id');

    if (options.file == undefined || options.file == '')
    {
        // Write out what we got and exit
        console.log(biblePayload.toString());
        return;
    }

    const writeOptions : JsonWriteOptions = {
        file: options.file,
        entries: []
    }

    // Encode bible passage content and inject into file
    const encodedPayload = encodeURIComponent(biblePayload.toString());
    writeOptions.entries.push({
        query: `$.content[?(@.id=='${options.passageId}')].value`,
        value: encodedPayload
    });

    // Write the API.NLT.TO reference as well.
    writeOptions.entries.push({
        query: `$.content[?(@.id=='${options.passageId}')].api_nlt_to_ref`,
        value: options.reference
    })
    
    // Update the title if provided
    if (options.title !== undefined && options.title !== '')
    {
        writeOptions.entries.push({
            query: `$.content[?(@.id=='${options.passageId}')].title`,
            value: options.title
        });
    }

    writeJson(writeOptions);
}

export {
    PassageOptions,
    action
}