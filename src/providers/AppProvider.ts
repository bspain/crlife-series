import * as express from 'express';
import { ConfigProvider } from './ConfigProvider';
import { HealthModule } from '../modules/health/HealthModule';
import Logger from '../logger';
import { SeriesModule } from '../modules/series/SeriesModule';
import { LocalSeriesStorage } from '../services/localSeriesStorage/LocalSeriesStorage';
import { ClientContentService } from '../services/clientContent/ClientContentService';

export class AppProvider {
  constructor(private logger: Logger, private config: ConfigProvider) {}

  async initializeExpressApp(): Promise<express.Application> {
    const app = express();
    const localSeriesStorage = new LocalSeriesStorage(this.logger);

    await localSeriesStorage.initializeSeriesMetadata();

    const healthModule = new HealthModule(this.logger, this.config);
    const clientService = new ClientContentService(this.logger);
    const seriesModule = new SeriesModule(localSeriesStorage, clientService, this.logger);

    // App routes
    app.get('/health', healthModule.requestHandler.bind(healthModule));
    app.use('/public', express.static('public'));
    app.use('*', seriesModule.requestHandler.bind(seriesModule));

    return app;
  }
}
