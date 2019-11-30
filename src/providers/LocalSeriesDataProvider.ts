import { readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { SeriesMetadata, EntryData } from '@models/Models';
import Logger from '../logger';

const readLocalFile: (pathname: string) => Promise<Buffer> = promisify(readFile);

interface SeriesDataProvider {
  getSeriesMetadata(): Promise<SeriesMetadata>;
  getSeriesEntry(seriesPath: string, entryPath: string): Promise<EntryData>;
}

class LocalSeriesDataProvider implements SeriesDataProvider {
  constructor(private logger: Logger) {}

  getSeriesMetadata(): Promise<SeriesMetadata> {
    return readLocalFile(join(__dirname, './../../data/series/meta.json')).then(data => {
      this.logger.debug('PROVIDER_LOCAL_SERIES', `Series metadata loaded successfully`);
      return JSON.parse(data.toString()) as SeriesMetadata;
    });
  }

  getSeriesEntry(seriesPath: string, entryPath: string): Promise<EntryData> {
    const fullDataPath = join(__dirname, './../../data/series', seriesPath, entryPath);

    return readLocalFile(fullDataPath).then(data => {
      this.logger.debug(
        'PROVIDER_LOCAL_SERIES',
        `Series entry data at ${seriesPath} ${entryPath} loaded successfully`
      );
      return JSON.parse(data.toString()) as EntryData;
    });
  }
}

export { SeriesDataProvider, LocalSeriesDataProvider };
