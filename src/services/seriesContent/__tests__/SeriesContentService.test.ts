import 'jest';
import { join } from 'path';
import { SeriesContentService } from '../SeriesContentService';
import Logger from '../../../logger';
import { SeriesMetadataProvider } from '../../../providers/SeriesMetadataProvider';
import { LocalSeriesDataProvider } from '../../../providers/LocalSeriesDataProvider';

const seriesDataPath = join(__dirname, './../../../../data/series/');

describe('Local series storage', () => {
  let seriesStorage: SeriesContentService;

  beforeAll(() => {
    const logger = new Logger();
    const metadataProvider = new SeriesMetadataProvider(logger, join(seriesDataPath, 'meta.json'));
    seriesStorage = new SeriesContentService(
      metadataProvider.getSeriesMetadata(),
      new LocalSeriesDataProvider(logger, seriesDataPath),
      logger
    );
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
