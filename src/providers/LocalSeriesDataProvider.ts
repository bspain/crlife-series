import { readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { EntryData } from '../../packages/crlife/Models';
import Logger from '../logger';
import { SeriesEntryProvider } from '../descriptors/SeriesProvider';

const readLocalFile: (pathname: string) => Promise<Buffer> = promisify(readFile);
const defaultSeriesRoot = join(__dirname, './../../../data/series');

class LocalSeriesDataProvider implements SeriesEntryProvider {
  constructor(private logger: Logger, private seriesRoot?: string) {}

  getSeriesEntry(seriesPath: string, entryPath: string): Promise<EntryData> {
    const fullDataPath = join(this.seriesRoot || defaultSeriesRoot, seriesPath, entryPath);

    return readLocalFile(fullDataPath).then(data => {
      this.logger.debug(
        'PROVIDER_LOCAL_SERIES',
        `Series entry data at ${seriesPath} ${entryPath} loaded successfully`
      );
      return JSON.parse(data.toString()) as EntryData;
    });
  }
}

export { LocalSeriesDataProvider };
