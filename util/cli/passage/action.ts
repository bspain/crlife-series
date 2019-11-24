import fetch from 'node-fetch';
import * as cheerio from 'cheerio';


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

    console.log(biblePayload.toString());
}

export {
    PassageOptions,
    action
}