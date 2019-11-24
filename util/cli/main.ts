import { Command } from 'commander';
import { PassageOptions, action as PassageAction } from './passage/action';

const program = new Command();

program
    .command('passage')
    .description('Fetch a passage from NLT.TO.  Options allow to format and insert into a JSON series item.  Requires NLT_KEY environment variable to be set.')
    .requiredOption('-r, --reference <nlt reference>', 'NLT.TO passages reference (e.g. "John.1" or "Ezekiel.45:13-46:24" ')
    .action(function passageAction(options: PassageOptions) {
        // Ensure NLT_API key is set
        if (process.env.NLT_KEY == undefined || process.env.NLT_KEY == '')
        {
            console.error("Did not find nlt key at process.env.NLT_KEY.  Did you 'export NLT_KEY=<key>'")
            program.help();
            process.exit();
        }

        PassageAction(options, process.env.NLT_KEY);
    });


program.parse(process.argv);

if (process.argv.length <= 2)
{
    program.help();
}
