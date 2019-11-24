import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { WriteOptions, action as WriteAction } from '../write/action';

interface PassageOptions {
    reference: string,
    file: string, 
    passageId: string
}

async function action(options: PassageOptions, apiKey: string) {
    const request = `http://api.nlt.to/api/passages?ref=${options.reference}&key=${apiKey}`;

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

    // Encode bible passage content and inject into file
    const encodedPayload = encodeURIComponent(biblePayload.toString())
    const writeOptions : WriteOptions = {
        file: options.file,
        query: `$.content[?(@.id=='${options.passageId}')].value`,
        value: encodedPayload
    }

    WriteAction(writeOptions);
}

export {
    PassageOptions,
    action
}