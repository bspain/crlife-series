import { ModuleRequestHandler } from '../../descriptors/ModuleRequestHandler';
import Logger from '../../logger';
import { ClientContentService } from '../../services/clientContent/ClientContentService';
import { SeriesContentService } from '../../services/seriesContent/SeriesContentService';
import { Request, Response } from 'express-serve-static-core';

export class SeriesModule implements ModuleRequestHandler {
  constructor(
    private seriesContentService: SeriesContentService,
    private clientContentService: ClientContentService,
    private logger: Logger
  ) {}

  async requestHandler(request: Request, response: Response): Promise<void> {
    // Is there a series at this param?
    const seriesName = request.params[0].replace('/', '');

    this.logger.debug('MODULE_SERIES', `handling series request for ${seriesName}`);
    const seriesExists = await this.seriesContentService.seriesExists(seriesName);

    if (!seriesExists) {
      this.logger.debug('MODULE_SERIES', `series ${seriesName} not found.`);
      response.status(404);
      response.send();
      return Promise.resolve();
    }

    const ref = request.query['ref'] as string;
    const data = await this.seriesContentService.getSeriesData(seriesName, ref);
    const client = await this.clientContentService.getClient(JSON.stringify(data));

    response.status(200);
    response.send(client);
  }
}
