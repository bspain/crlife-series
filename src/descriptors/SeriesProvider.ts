import { LinkedSeries } from '../models/SeriesMedata';

export interface SeriesProvider {
  seriesList: string[];
  seriesExists(seriesName: string): boolean;
  getSeriesData(seriesName: string, reference: string | null): Promise<LinkedSeries>;
}
