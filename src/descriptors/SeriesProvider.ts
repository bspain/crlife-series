export interface SeriesProvider {
    seriesExists(seriesName: string) : boolean;
    getSeriesData(seriesName: string, reference: string | null) : Promise<string>;
}