import * as fs from 'fs';
import * as path from 'path';
import { Provider } from 'nconf';
import appfig = require('appfig');

const appConfigFile = path.join(__dirname, './../../app.config.json'); // Secrets that should not be committed to source control

interface AppConfig {
  meta: 'local' | 'prod';
  port: number;
  azure_storage: boolean;
  AZURE_STORAGE_ACCOUNT_NAME: string;
  AZURE_STORAGE_ACCOUNT_ACCESS_KEY: string;
  AZURE_STORAGE_CONTAINER_NAME: string;
}

type AppConfigKey = keyof AppConfig;

class ConfigProvider {
  private config: Provider;
  private _env: string;

  constructor(appEnv: string | null = null) {
    this._env = appEnv || process.env.APP_ENV || 'development';

    // Environment variable options for appfig
    const options = {
      env: [
        'AZURE_STORAGE_ACCOUNT_NAME',
        'AZURE_STORAGE_ACCOUNT_ACCESS_KEY',
        'AZURE_STORAGE_CONTAINER_NAME'
      ]
    };

    // Load in values from config/ files
    this.config = appfig(
      path.join(__dirname, `./../../config/${this._env}.json`),
      options
    ) as Provider;

    // Consume values from app.config.json if it exists
    if (fs.existsSync(appConfigFile)) {
      const appJsonConfig = JSON.parse(fs.readFileSync(appConfigFile).toString());

      for (const propName in appJsonConfig) {
        this.config.set(propName, appJsonConfig[propName]);
      }
    }
  }

  get(key: AppConfigKey): string | number {
    return this.config.get(key);
  }

  get env(): string {
    return this._env;
  }
}

export { ConfigProvider };
