import { Command } from 'commander';

interface PassageOptions {
    reference: string
}

const program = new Command();

program
    .command('passage')
    .description('Fetch a passage from NLT.TO.  Options allow to format and insert into a JSON series item.  Requires NLT_KEY environment variable to be set.')
    .requiredOption('-r, --reference <nlt reference>', 'NLT.TO passages reference (e.g. "John.1" or "Ezekiel.45:13-46:24" ')
    .action(function passageAction(options: PassageOptions) {
        if (options.reference === '')
        {
            program.help();
            process.exit();
        }

        // Ensure NLT_API key is set
        if (process.env.NLT_KEY === '')
        {
            console.error("Did not find nlt key at process.env.NLT_KEY.  Did you set it?")
            program.help();
            process.exit();
        }

        console.info(program.opts());
        console.log("passageAction in progress...")
    });


program.parse(process.argv);

if (program.opts() == {})
{
    program.help();
}
