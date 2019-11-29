import 'jest';
import { LocalSeriesStorage } from '../LocalSeriesStorage';
import Logger from '../../../logger';

describe('Local series storage', () => {
  let seriesStorage: LocalSeriesStorage;

  beforeAll(async () => {
    seriesStorage = new LocalSeriesStorage(new Logger());
    await seriesStorage.initializeSeriesMetadata();
  });

  it('Will return a list of all series', () => {
    expect(seriesStorage.seriesList).toEqual(['daily', 'devo']);
  });
});
