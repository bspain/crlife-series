import 'jest';
import { dateToSeriesPath } from '../dateToSeriesPath';

describe('DateToSeriesPath', () => {
  it('Will convert a date to a proper path reference', () => {
    expect(dateToSeriesPath(new Date('2019-01-01T12:00:00-05:00'))).toEqual('0101');
    expect(dateToSeriesPath(new Date('2019-01-15T12:00:00-05:00'))).toEqual('0115');
    expect(dateToSeriesPath(new Date('2019-10-08T12:00:00-05:00'))).toEqual('1008');
    expect(dateToSeriesPath(new Date('2019-12-16T12:00:00-05:00'))).toEqual('1216');
  });
});
