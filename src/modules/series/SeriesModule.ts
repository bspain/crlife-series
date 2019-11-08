import { ModuleRequestHandler } from '../../descriptors/ModuleRequestHandler';
import Logger from '../../logger';
import { SeriesProvider } from '../../descriptors/SeriesProvider';

export class SeriesModule implements ModuleRequestHandler {
    constructor(private seriesProvider: SeriesProvider, private logger: Logger) {}

    async requestHandler(
        request: import('express-serve-static-core').Request,
        response: import('express-serve-static-core').Response
      ): Promise<void> {

        // Is there a series at this param?
        const seriesName = request.params[0].replace('/', '');

        this.logger.debug("MODULE_SERIES", `handling series request for ${seriesName}`);
        const seriesExists = await this.seriesProvider.seriesExists(seriesName);

        if (!seriesExists)
        {
            this.logger.debug("MODULE_SERIES", `series ${seriesName} not found.`);
            response.status(404);
            response.send();
            return Promise.resolve();
        }

        const data = await this.seriesProvider.getSeriesData(seriesName, request.query.ref);
        response.status(200);
        response.send(data);
    }
}
