import 'jest';
import { SeriesContentService } from '../SeriesContentService';
import Logger from '../../../logger';
import { LocalSeriesDataProvider } from '../../../providers/LocalSeriesDataProvider';

describe('Local series storage', () => {
  let seriesStorage: SeriesContentService;

  beforeAll(async () => {
    const logger = new Logger();
    seriesStorage = new SeriesContentService(new LocalSeriesDataProvider(logger), logger);
    await seriesStorage.initializeSeriesMetadata();
  });

  it('Will return a list of all series', () => {
    expect(seriesStorage.seriesList).toEqual(['daily', 'devo']);
  });

  it('Will return a linked series data', async () => {
    const linkedSeries = await seriesStorage.getSeriesData('daily', '1123');
    expect(linkedSeries.title).toEqual('Daily Devotional');
    expect(linkedSeries.prev).toEqual('1125');
    expect(linkedSeries.next).toEqual('1124');
  });
});
