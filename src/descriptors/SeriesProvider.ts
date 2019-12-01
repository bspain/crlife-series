import { EntryData } from '../../packages/crlife/Models';

export interface SeriesEntryProvider {
  getSeriesEntry(seriesPath: string, entryPath: string): Promise<EntryData>;
}
