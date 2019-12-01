import { readFileSync } from 'fs';
import { join } from 'path';
import Logger from '../logger';
import { SeriesMetadata } from '../../packages/crlife/Models';

const defaultMetadataPath = join(__dirname, './../../../data/series/meta.json');

export class SeriesMetadataProvider {
  constructor(private logger: Logger, private metadataPath?: string) {}

  getSeriesMetadata(): SeriesMetadata {
    const data = readFileSync(this.metadataPath || defaultMetadataPath, 'UTF-8');
    this.logger.debug('PROVIDER_LOCAL_SERIES', `Series metadata loaded successfully`);
    return JSON.parse(data.toString()) as SeriesMetadata;
  }
}
