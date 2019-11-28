import * as fs from 'fs';
import * as path from 'path';
import { Provider } from 'nconf';
import appfig = require('appfig');
import { stringEnum } from '../util/stringEnum';

const appConfigFile = path.join(__dirname, './../../app.config.json'); // Secrets that should not be committed to source control

const AppConfig = stringEnum([
  'meta',
  'port',
  'azure_storage',
  'app_config_name',
  'app_config_loaded',
  'AZURE_STORAGE_CONTAINER_NAME',
  'AZURE_STORAGE_ACCOUNT_ACCESS_KEY',
  'AZURE_STORAGE_CONTAINER_NAME'
]);

type AppConfigKey = keyof typeof AppConfig;

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
      this.set('app_config_loaded', true);
      this.set('app_config_name', appConfigFile);

      for (const propName in appJsonConfig) {
        this.config.set(propName, appJsonConfig[propName]);
      }
    }
  }

  set(key: AppConfigKey, value: string | number | boolean): void {
    this.config.set(key, value);
  }

  get(key: AppConfigKey): string | boolean {
    return this.config.get(key);
  }

  get env(): string {
    return this._env;
  }

  dumpConfig() {
    return Object.keys(AppConfig).map(key => {
      return { key, value: this.get(key as AppConfigKey) };
    });
  }
}

export { ConfigProvider, AppConfig, AppConfigKey };
