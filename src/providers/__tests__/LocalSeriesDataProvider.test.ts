import 'jest';
import { LocalSeriesDataProvider } from '../LocalSeriesDataProvider';
import Logger from '../../logger';

describe('Local series data provider', () => {
  let provider: LocalSeriesDataProvider;
  beforeAll(() => {
    provider = new LocalSeriesDataProvider(new Logger());
  });

  it('Will return series metadata from local storage', async () => {
    const metadata = await provider.getSeriesMetadata();
    expect(metadata.series.length).toBe(2);
  });

  it('Will return series entry data from local storage', async () => {
    const series = await provider.getSeriesEntry('/daily', '/1123.json');
    expect(series.title).toBe('Daily Devotional');
  });
});
