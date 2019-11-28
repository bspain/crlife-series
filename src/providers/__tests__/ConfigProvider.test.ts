import 'jest';
import { ConfigProvider, AppConfig, AppConfigKey } from '../ConfigProvider';

describe('Config provider', () => {
  afterEach(() => {
    // Clean up all environment variables
    if (process.env['APP_ENV']) {
      delete process.env.APP_ENV;
    }
  });

  it('Will load development by default', () => {
    const config = new ConfigProvider();
    expect(config.env).toBe('development');
    expect(config.get('meta')).toBe('local');
  });

  it('Will load production config if APP_ENV set accordingly', () => {
    process.env['APP_ENV'] = 'production';
    const config = new ConfigProvider();
    expect(config.env).toBe('production');
    // expect(config.get("meta")).toBe("production");
  });

  it('will expose all config as key value pairs', () => {
    // Should match values in config/development.json
    const dumpedConfig = new ConfigProvider().dumpConfig();
    expect(dumpedConfig).toContainEqual({ key: AppConfig.meta, value: 'local' });
    expect(dumpedConfig).toContainEqual({ key: AppConfig.port, value: 3000 });
  });
});
