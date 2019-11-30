import { EntryLinks } from '@models/Models';

export interface SeriesProvider {
  seriesList: string[];
  seriesExists(seriesName: string): boolean;
  getSeriesData(seriesName: string, reference: string | null): Promise<EntryLinks>;
}
