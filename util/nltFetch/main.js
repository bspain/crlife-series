const fetch = require('node-fetch');
const cheerio = require('cheerio');

const request = `http://api.nlt.to/api/passages?ref=${process.argv[2]}&key=${process.env.NLT_KEY}`;
fetch(request)
    .then(response => response.text())
    .then(text => {
        let bibletext = cheerio.load(text)('div[id="bibletext"]');
        bibletext.removeAttr('id');

        if (process.argv[3])
        {
            console.log(encodeURIComponent(bibletext.toString()));
        }
        else
        {
            console.log(bibletext.toString());
        }
    });

