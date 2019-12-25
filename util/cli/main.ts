import { Command } from 'commander';
import { PassageOptions, action as PassageAction } from './passage/action';
import { ContentOptions, action as ContentAction } from './content/action';
import { ActionOptions as ReadAzureOptions, action as ReadAzureAction } from './read-azure/action';

const program = new Command();

program
    .command('passage')
    .description('Fetch a passage from NLT.TO.  Options allow to format and insert into a JSON series item.  Requires NLT_KEY environment variable to be set.')
    .requiredOption('-r, --reference <nlt reference>', 'NLT.TO passages reference (e.g. "John.1" or "Ezekiel.45:13-46:24" ')
    .option('-f, --file <file>', 'path to file (e.g. "../../data/series/daily/1123.json")')
    .option('-p, --passage-id <passage identifier>', 'id of the content passage (e.g. "ot-passage")')
    .option('-t, --title <title>', 'Updated content title (e.g. "Ezekiel 45:13 - 46:24')
    .action(function passageAction(options: PassageOptions) {
        // Ensure NLT_API key is set
        if (process.env.NLT_KEY == undefined || process.env.NLT_KEY == '')
        {
            console.error("Did not find nlt key at process.env.NLT_KEY.  Did you 'export NLT_KEY=<key>'")
            program.help();
            process.exit();
        }

        // If file or passageId, then ensure the others as well
        if (options.file !== undefined || options.passageId !== undefined)
        {
            if (options.file == undefined && options.passageId == undefined)
            {
                console.error("Both file and passageId are required if using either option.");
                program.help();
                process.exit();
            }
        }

        PassageAction(options, process.env.NLT_KEY);
    });

program.command('content')
    .description('Read a devotion input HTML fragment and encode it into a series content item')
    .requiredOption('-s, --source-file <source file>', 'Path to fragement input file (e.g. "./devo-temp.html")')
    .requiredOption('-f, --file <file>', 'Path to series content file (e.g. "../../data/series/daily/1123.json")')
    .option('-c, --content-id <content-id>', 'id of the content devotion item (Default. "devotion")')
    .action(function devotionAction(options: ContentOptions) {
        if (options.contentId == undefined || options.contentId == '')
        {
            options.contentId = 'devotion'
        }
        ContentAction(options);
    })

program.command('read-azure')
    .description('Read a series blob object from Azure storage.  Requires: AZURE_STORAGE_ACCOUNT_NAME and AZURE_STORAGE_ACCOUNT_ACCESS_KEY')
    .requiredOption('-b, --blob-path <blob path>', 'Path of azure blob item (e.g. daily/1123.json)')
    .action(function readAzureAction(options: ReadAzureOptions) {
        // Ensure AZURE_STORAGE_ACCOUNT_NAME key is set
        if (process.env.AZURE_STORAGE_ACCOUNT_NAME == undefined || process.env.AZURE_STORAGE_ACCOUNT_NAME == '')
        {
            console.error("Did not find nlt key at process.env.AZURE_STORAGE_ACCOUNT_NAME.  Did you 'export AZURE_STORAGE_ACCOUNT_NAME=<name>'")
            program.help();
            process.exit();
        }

        // Ensure AZURE_STORAGE_ACCOUNT_NAME key is set
        if (process.env.AZURE_STORAGE_ACCOUNT_KEY == undefined || process.env.AZURE_STORAGE_ACCOUNT_KEY == '')
        {
            console.error("Did not find nlt key at process.env.AZURE_STORAGE_ACCOUNT_KEY.  Did you 'export AZURE_STORAGE_ACCOUNT_KEY=<key>'")
            program.help();
            process.exit();
        }

        options.accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        options.accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

        ReadAzureAction(options);
    })


program.parse(process.argv);

if (process.argv.length <= 2)
{
    program.help();
}
