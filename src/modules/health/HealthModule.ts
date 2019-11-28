import { ModuleRequestHandler } from '../../descriptors/ModuleRequestHandler';
import Logger from '../../logger';
import { ConfigProvider } from '../../providers/ConfigProvider';

export class HealthModule implements ModuleRequestHandler {
  constructor(private logger: Logger, private config: ConfigProvider) {}

  requestHandler(
    request: import('express-serve-static-core').Request,
    response: import('express-serve-static-core').Response
  ): void {
    this.logger.debug('MODULE_HEALTH', 'handling health request');

    /**
     * Environment variables
     */
    const visibleSettings: { [key: string]: string | number } = {};

    // For a list of all keys (and other things) available to apps, see: http://whatazurewebsiteenvironmentvariablesareavailable.azurewebsites.net/
    const whitelistedKeys = [
      'DEBUG',
      'META',
      '_DAILY_AZURE',
      'APP_ENV',

      // Azure App Service specific keys
      'NODE_VERSION',
      'YARN_VERSION'
    ];
    const maskedKeys = [
      'AZURE_STORAGE_ACCOUNT_NAME',
      'AZURE_STORAGE_ACCOUNT_ACCESS_KEY',
      'AZURE_STORAGE_CONTAINER_NAME'
    ];

    // Start by showing all keys (to get a dump of what is available)
    Object.keys(process.env).forEach(k => {
      visibleSettings[k] = '';
    });

    // Show full value of whitelisted keys
    whitelistedKeys.forEach(wk => {
      if (process.env[wk]) {
        visibleSettings[wk] = process.env[wk];
      }
    });

    // Mask particular values
    maskedKeys.forEach(mk => {
      if (process.env[mk]) {
        const value = process.env[mk];
        visibleSettings[mk] = value.substr(0, 3) + value.substr(3).replace(/./g, '#');
      }
    });

    response.setHeader('Content-Type', 'application/json');
    response.send(
      JSON.stringify({
        status: 'OK',
        config: this.config.logConfig(),
        environment: visibleSettings
      })
    );
  }
}
