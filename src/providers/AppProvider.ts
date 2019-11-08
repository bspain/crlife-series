import * as express from 'express';
import { ConfigProvider } from './ConfigProvider';
import { HealthModule } from '../modules/health/HealthModule';
import Logger from '../logger';
import { SeriesModule } from '../modules/series/SeriesModule';
import { LocalSeriesStorage } from '../services/localSeriesStorage/LocalSeriesStorage';

export class AppProvider {

  constructor(private logger: Logger, private config: ConfigProvider) {}

  async initializeExpressApp() : Promise<express.Application> {

    const app = express();
    const localSeriesStorage = new LocalSeriesStorage(this.logger);

    await localSeriesStorage.initializeSeriesMetadata();
  
    const healthModule = new HealthModule(this.logger);
    const seriesModule = new SeriesModule(localSeriesStorage, this.logger);
  
    // App routes
    app.get('/health', healthModule.requestHandler.bind(healthModule));
    app.use('*', seriesModule.requestHandler.bind(seriesModule));
  
    return app;
  }
}
