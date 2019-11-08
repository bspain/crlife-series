import { load } from 'cheerio';
import { join } from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import Logger from "../../logger";

const readLocalFile: (pathname: string) => Promise<Buffer> = promisify(readFile);
const clientHtml = join(__dirname, './../../../public/index.html');

export class ClientContentService {
    constructor(private logger: Logger) {}

    async getClient(seriesPayload: string) : Promise<string> {
        this.logger.debug("SERIVCE_CLIENT", 'Fetching client');

        return readLocalFile(clientHtml).then(data => {
            const content = load(data);

            const script = content('#__CRL_SSR_DATA');
            script.empty();
            script.append(seriesPayload);

            return content.html();
        })
    }
}