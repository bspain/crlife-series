import { Command } from 'commander';
import { PassageOptions, action as PassageAction } from './passage/action';
import { DevotionOptions, action as DevotionAction } from './devotion/action';
import { WriteOptions, action as WriteAction } from './write/action';

const program = new Command();
const fileOption = { switch: '-f, --file <file>', description: 'path to file (e.g. "../../data/series/daily/1123.json")' };

program
    .command('passage')
    .description('Fetch a passage from NLT.TO.  Options allow to format and insert into a JSON series item.  Requires NLT_KEY environment variable to be set.')
    .requiredOption('-r, --reference <nlt reference>', 'NLT.TO passages reference (e.g. "John.1" or "Ezekiel.45:13-46:24" ')
    .option(fileOption.switch, fileOption.description)
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

program.command('devotion')
    .description('Read a devotion input HTML fragment and encode it into a series content item')
    .requiredOption('-s, --source-file <source file>', 'Path to fragement input file (e.g. "./devo-temp.html")')
    .requiredOption('-t, --target-file <target file>', 'Path to series content file (e.g. "../../data/series/daily/1123.json")')
    .option('-d, --devotion-id', 'id of the content devotion item (Default. "devotion")')
    .action(function devotionAction(options: DevotionOptions) {
        if (options.devotionId == undefined || options.devotionId == '')
        {
            options.devotionId = 'devotion'
        }
        DevotionAction(options);
    })

program.command('write')
    .description('Write a set of content into a Series data JSON file')
    .requiredOption(fileOption.switch, fileOption.description)
    .requiredOption('-q, --query <query>', 'JSON query to target property (e.g. "$.content[?(@.id==\"devotion\")]" -- See https://github.com/dchester/jsonpath')
    .option('-v, --value <value>', 'New value to write.')
    .action(function writeAction(options: WriteOptions) {
        WriteAction(options);
    })

program.parse(process.argv);

if (process.argv.length <= 2)
{
    program.help();
}
