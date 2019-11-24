import { readFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import Logger from '../../logger';
import { SeriesProvider } from '../../descriptors/SeriesProvider';
import { SeriesMetadata, SeriesEntry } from '../../models/SeriesMedata';

const readLocalFile: (pathname: string) => Promise<Buffer> = promisify(readFile);

export class LocalSeriesStorage implements SeriesProvider {
  private seriesMetadata: SeriesMetadata;

  constructor(private logger: Logger) {}

  async initializeSeriesMetadata(): Promise<void> {
    return readLocalFile(join(__dirname, './../../../data/series/meta.json')).then(data => {
      this.seriesMetadata = JSON.parse(data.toString()) as SeriesMetadata;
      this.logger.debug('SERVICE_LOCAL_SERIES', `Series metadata loaded successfully`);
    });
  }

  seriesExists(seriesName: string): boolean {
    this.logger.debug('SERVICE_LOCAL_SERIES', `Looking locally for ${seriesName}`);
    return this.seriesMetadata.series.some(entry => entry.name == seriesName);
  }

  async getSeriesData(seriesName: string, reference: string | null): Promise<string> {
    this.logger.debug(
      'SERVICE_LOCAL_SERIES',
      `Looking locally for data for ${seriesName} : ${reference}`
    );
    const seriesEntry = this.seriesMetadata.series.filter(entry => entry.name == seriesName)[0];

    const data = this.getDataPathOrDefault(seriesEntry, reference);
    const fullDataPath = join(__dirname, './../../../data/series', seriesEntry.path, data.path);

    const fullDataJson = await readLocalFile(fullDataPath).then(data => JSON.parse(data.toString()))

    // Populate next,prev
    const { prev, next } = this.getNextPrevForReference(seriesEntry, data.ref);
    fullDataJson.prev = prev;
    fullDataJson.next = next;

    return JSON.stringify(fullDataJson);
  }

  getDataPathOrDefault(seriesEntry: SeriesEntry, reference: string | null): { ref: string, path: string } {
    // No reference, return default
    if (!reference) {
      return seriesEntry.data[0];
    }

    // Is the reference valid?
    if (seriesEntry.data.some(d => d.ref == reference)) {
      return seriesEntry.data.filter(d => d.ref == reference)[0];
    } else {
      return seriesEntry.data[0];
    }
  }

  getNextPrevForReference(seriesEntry: SeriesEntry, reference: string) : { prev: string, next: string }
  {
    const index = seriesEntry.data.findIndex(d => d.ref == reference);

    // Boundaries
    if (index == 0)
    {
      return { prev: seriesEntry.data[seriesEntry.data.length - 1].ref, next: seriesEntry.data[index + 1].ref }
    }

    if (index == seriesEntry.data.length - 1)
    {
      return { prev: seriesEntry.data[index - 1].ref, next: seriesEntry.data[0].ref }
    }

    return { prev: seriesEntry.data[index - 1].ref, next: seriesEntry.data[index + 1].ref }
  }
}
