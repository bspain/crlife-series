import * as express from 'express';
import { ConfigProvider } from './ConfigProvider';
import { HealthModule } from '../modules/health/HealthModule';
import Logger from '../logger';

const app = express();
const adminApp = express();

export function config(logger: Logger) {

   const config = new ConfigProvider();

   const healthModule = new HealthModule(logger);

   // App routes
   app.get('/health', healthModule.requestHandler.bind(healthModule))

   return { app, config };
}