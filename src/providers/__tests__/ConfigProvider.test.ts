import 'jest';
import { ConfigProvider } from '../ConfigProvider';

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

  it('will only expose whitelisted values', () => {
    const loggedConfig = new ConfigProvider().logConfig();

    // Should match values in config/development.json
    expect(loggedConfig['meta']).toEqual('local');
    expect(loggedConfig['port']).toEqual(3000);
  });
});
