/* eslint @typescript-eslint/class-name-casing: 0 */
import * as Debug from 'debug';

interface LOG_MODULES {
  SERVER: string;
  HELPERS: string;
  MODULE_HEALTH: string;
}

interface LOG_MODULE_INDEXER {
  [key: string]: string;
}

export const LOG_MODULE: LOG_MODULES & LOG_MODULE_INDEXER = {
  SERVER: 'app:server',
  HELPERS: 'app:helpers',
  MODULE_HEALTH: 'app:module:health'
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
