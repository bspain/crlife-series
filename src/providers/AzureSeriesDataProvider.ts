import { SeriesEntryProvider } from '../descriptors/SeriesProvider';
import { EntryData } from '../../packages/crlife/Models';
import Logger from '../logger';
import { AzureBlobAccessFactory } from '../factories/AzureBlobAccessFactory';

class AzureSeriesDataProvider implements SeriesEntryProvider {
  private blobAccess: { readBlob(blobPath: string): Promise<string> };

  constructor(accessFactory: AzureBlobAccessFactory, private logger: Logger) {
    this.blobAccess = accessFactory.createAzureBlobAccess();
  }

  async getSeriesEntry(seriesPath: string, entryPath: string): Promise<EntryData> {
    const blobPath = (seriesPath.startsWith('/') ? seriesPath.substr(1) : seriesPath) + entryPath;
    this.logger.debug('PROVIDER_AZURE_ENTRY', `Fetching data for ${blobPath} from azure`);
    const blobData = await this.blobAccess.readBlob(blobPath);
    return JSON.parse(blobData) as EntryData;
  }
}

export { AzureSeriesDataProvider };
