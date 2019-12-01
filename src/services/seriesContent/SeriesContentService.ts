import Logger from '../../logger';
import { SeriesEntryProvider } from '../../descriptors/SeriesProvider';
import { SeriesMetadata, Series, SeriesEntry } from '../../../packages/crlife/Models';

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

  async getSeriesData(seriesName: string, reference: string | null): Promise<SeriesEntry> {
    this.logger.debug(
      'SERVICE_SERIES',
      `Looking locally for data for ${seriesName} : ${reference}`
    );
    const seriesEntry = this.seriesMetadata.series.filter(entry => entry.name == seriesName)[0];

    const data = this.getDataPathOrDefault(seriesEntry, reference);
    const seriesData = await this.entryProvider.getSeriesEntry(seriesEntry.path, data.path);

    // Populate next,prev
    const { prev, next } = this.getNextPrevForReference(seriesEntry, data.ref);
    const seriesLinkedData: SeriesEntry = { prev, next, ...seriesData };

    return seriesLinkedData;
  }

  getDataPathOrDefault(
    seriesEntry: Series,
    reference: string | null
  ): { ref: string; path: string } {
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

  getNextPrevForReference(seriesEntry: Series, reference: string): { prev: string; next: string } {
    const index = seriesEntry.data.findIndex(d => d.ref == reference);

    // Boundaries
    if (index == 0) {
      return {
        prev: seriesEntry.data[seriesEntry.data.length - 1].ref,
        next: seriesEntry.data[index + 1].ref
      };
    }

    if (index == seriesEntry.data.length - 1) {
      return { prev: seriesEntry.data[index - 1].ref, next: seriesEntry.data[0].ref };
    }

    return { prev: seriesEntry.data[index - 1].ref, next: seriesEntry.data[index + 1].ref };
  }
}
