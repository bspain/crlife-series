import * as express from 'express';
import { ConfigProvider } from './ConfigProvider';
import { HealthModule } from '../modules/health/HealthModule';
import Logger from '../logger';
import { SeriesModule } from '../modules/series/SeriesModule';
import { SeriesContentService } from '../services/seriesContent/SeriesContentService';
import { ClientContentService } from '../services/clientContent/ClientContentService';
import { LocalSeriesDataProvider } from './LocalSeriesDataProvider';
import { AzureSeriesDataProvider } from './AzureSeriesDataProvider';
import { AzureBlobAccessFactory } from './../factories/AzureBlobAccessFactory';
import { SeriesMetadataProvider } from './SeriesMetadataProvider';

export class AppProvider {
  constructor(private logger: Logger, private config: ConfigProvider) {}

  initializeExpressApp(): express.Application {
    const app = express();

    const isAzureStorage = this.config.get('azure_storage') as boolean;
    this.logger.debug('APP', `isAzureStorage: ${isAzureStorage}`);
    const metadataProvider = new SeriesMetadataProvider(this.logger);
    const entryProvider = isAzureStorage
      ? new AzureSeriesDataProvider(new AzureBlobAccessFactory(this.config), this.logger)
      : new LocalSeriesDataProvider(this.logger);

    const seriesContentService = new SeriesContentService(
      metadataProvider.getSeriesMetadata(),
      entryProvider,
      this.logger
    );

    const healthModule = new HealthModule(this.logger, this.config);
    const clientService = new ClientContentService(this.logger);
    const seriesModule = new SeriesModule(seriesContentService, clientService, this.logger);

    // App routes
    app.get('/health', healthModule.requestHandler.bind(healthModule));
    app.use('/public', express.static('public'));
    app.use('*', seriesModule.requestHandler.bind(seriesModule));

    return app;
  }
}
