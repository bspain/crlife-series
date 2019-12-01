/* eslint @typescript-eslint/class-name-casing: 0 */
import * as Debug from 'debug';

interface LOG_MODULES {
  APP: string;
  SERVER: string;
  HELPERS: string;
  MODULE_HEALTH: string;
  MODULE_SERIES: string;
  SERVICE_SERIES: string;
  SERIVCE_CLIENT: string;
  PROVIDER_LOCAL_SERIES: string;
  PROVIDER_AZURE_ENTRY: string;
}

interface LOG_MODULE_INDEXER {
  [key: string]: string;
}

export const LOG_MODULE: LOG_MODULES & LOG_MODULE_INDEXER = {
  APP: 'app',
  SERVER: 'app:server',
  HELPERS: 'app:helpers',
  MODULE_HEALTH: 'app:module:health',
  MODULE_SERIES: 'app:module:series',
  SERVICE_SERIES: 'app:service:series',
  SERIVCE_CLIENT: 'app:service:client',
  PROVIDER_LOCAL_SERIES: 'app:provider:local-series',
  PROVIDER_AZURE_ENTRY: 'app:provider:azure-entry'
};

export default class Logger {
  private _debuggers: { [key: string]: Debug.Debugger } = {};

  constructor() {
    for (const key in LOG_MODULE) {
      const value = LOG_MODULE[key];
      this._debuggers[key] = Debug(value);
    }
  }

  debug(module: keyof LOG_MODULES, message: string): void {
    const _debug = this._debuggers[module];
    _debug(message);
  }
}
