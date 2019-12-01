import * as fs from 'fs';
import * as path from 'path';
import { Provider } from 'nconf';
import appfig = require('appfig');
import { stringEnum } from '../util/stringEnum';

const appConfigFile = path.join(__dirname, './../../app.config.json'); // Secrets that should not be committed to source control
const packageFile = path.join(__dirname, './../../package.json'); // Version information

const AppConfig = stringEnum([
  'meta',
  'port',
  'azure_storage',
  'app_config_name',
  'app_config_loaded',
  'package_json_loaded',
  'package_version',
  'AZURE_STORAGE_ACCOUNT_NAME',
  'AZURE_STORAGE_ACCOUNT_KEY',
  'AZURE_STORAGE_CONTAINER_NAME'
]);

const AppConfigWhitelist: string[] = [
  AppConfig.meta,
  AppConfig.port,
  AppConfig.azure_storage,
  AppConfig.app_config_name,
  AppConfig.app_config_loaded,
  AppConfig.package_json_loaded,
  AppConfig.package_version
];

const AppConfigMaskedlist: string[] = [
  AppConfig.AZURE_STORAGE_ACCOUNT_NAME,
  AppConfig.AZURE_STORAGE_ACCOUNT_KEY,
  AppConfig.AZURE_STORAGE_CONTAINER_NAME
];

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

    // Consume version from package.json
    if (fs.existsSync(packageFile)) {
      const packageJson = JSON.parse(fs.readFileSync(packageFile).toString());
      this.set('package_json_loaded', true);
      this.set('package_version', packageJson['version']);
    }
  }

  set(key: AppConfigKey, value: string | number | boolean): void {
    this.config.set(key, value);
  }

  get(key: AppConfigKey): string | number | boolean {
    return this.config.get(key);
  }

  get env(): string {
    return this._env;
  }

  logConfig(): { [key: string]: string | boolean | number } {
    const loggedConfig: { [key: string]: string | boolean | number } = {};

    // Only allow whitelisted values
    Object.keys(AppConfig).forEach(key => {
      const value = this.get(key as AppConfigKey) || '';

      if (AppConfigWhitelist.includes(key)) {
        loggedConfig[key] = value;
      } else if (AppConfigMaskedlist.includes(key)) {
        loggedConfig[key] = value.toString().replace(/./g, '#');
      } else {
        loggedConfig[key] = '';
      }
    });

    return loggedConfig;
  }
}

export { ConfigProvider, AppConfig, AppConfigKey };
