import * as express from 'express';
import { ConfigProvider } from './ConfigProvider';
import { HealthModule } from '../modules/health/HealthModule';
import Logger from '../logger';

const app = express();

export function config(logger: Logger): { app: express.Application; config: ConfigProvider } {
  const config = new ConfigProvider();

  const healthModule = new HealthModule(logger);

  // App routes
  app.get('/health', healthModule.requestHandler.bind(healthModule));

  return { app, config };
}
