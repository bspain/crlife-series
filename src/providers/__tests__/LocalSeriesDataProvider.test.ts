import 'jest';
import { join } from 'path';
import { LocalSeriesDataProvider } from '../LocalSeriesDataProvider';
import Logger from '../../logger';

describe('Local series data provider', () => {
  let provider: LocalSeriesDataProvider;
  beforeAll(() => {
    provider = new LocalSeriesDataProvider(new Logger(), join(__dirname, './../../../data/series'));
  });

  it('Will return series entry data from local storage', async () => {
    const series = await provider.getSeriesEntry('/daily', '/0101.json');
    expect(series.title).toBe('Daily Devotional');
  });
});
