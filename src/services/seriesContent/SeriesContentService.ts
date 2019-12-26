import Logger from '../../logger';
import { SeriesEntryProvider } from '../../descriptors/SeriesProvider';
import { SeriesMetadata, Series, SeriesEntry } from '../../../packages/crlife/Models';
import { dateToSeriesPath } from '../../util/dateToSeriesPath';

export class SeriesContentService {
  constructor(
    private seriesMetadata: SeriesMetadata,
    private entryProvider: SeriesEntryProvider,
    private logger: Logger
  ) {}

  get seriesList(): string[] {
    this.logger.debug('SERVICE_SERIES', 'Enumerating series list');
    return this.seriesMetadata.series.map(entry => entry.name);
  }

  seriesExists(seriesName: string): boolean {
    this.logger.debug('SERVICE_SERIES', `Looking locally for ${seriesName}`);
    return this.seriesMetadata.series.some(entry => entry.name == seriesName);
  }

  getSeries(seriesName: string): Series {
    this.logger.debug('SERVICE_SERIES', `Getting metadata for ${seriesName}`);
    return this.seriesMetadata.series.filter(entry => entry.name == seriesName)[0];
  }

  async getSeriesData(seriesName: string, reference: string | null): Promise<SeriesEntry> {
    this.logger.debug(
      'SERVICE_SERIES',
      `Looking locally for data for ${seriesName} : ${reference}`
    );

    const series = this.getSeries(seriesName);
    const data = this.getDataPathOrDefault(series, reference);
    const seriesData = await this.entryProvider.getSeriesEntry(series.path, data.path);

    // Populate next,prev
    const { prev, next } = this.getNextPrevForReference(series, data.ref);
    const seriesLinkedData: SeriesEntry = { prev, next, ...seriesData };

    return seriesLinkedData;
  }

  getDataPathOrDefault(series: Series, reference: string | null): { ref: string; path: string } {
    // If no reference, determine which data to get
    if (!reference) {
      if (series.default == 'first') {
        return series.data[0];
      } else {
        // default == 'date'
        reference = dateToSeriesPath(new Date(Date.now()));
      }
    }

    // Handle leap year
    if ('0229' == reference) {
      reference = '0228';
    }

    // Is the reference valid?
    if (series.data.some(d => d.ref == reference)) {
      return series.data.filter(d => d.ref == reference)[0];
    } else {
      return series.data[0];
    }
  }

  getNextPrevForReference(series: Series, reference: string): { prev: string; next: string } {
    const index = series.data.findIndex(d => d.ref == reference);

    // Boundaries
    if (index == 0) {
      return {
        prev: series.data[series.data.length - 1].ref,
        next: series.data[index + 1].ref
      };
    }

    if (index == series.data.length - 1) {
      return { prev: series.data[index - 1].ref, next: series.data[0].ref };
    }

    return { prev: series.data[index - 1].ref, next: series.data[index + 1].ref };
  }
}
