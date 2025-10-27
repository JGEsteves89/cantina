// config.ts
export interface Config {
  DAYS_TO_BE_SCHEDULES: number;
  MY_JSON_SERVER_URL: string;
  MY_JSON_SERVER_API: string;
}

export class ConfigManager {
  private static instance: Config | null = null;

  static set(config: Config) {
    ConfigManager.instance = config;
  }

  static get(): Config {
    if (!ConfigManager.instance) {
      throw new Error('Config has not been set');
    }
    return ConfigManager.instance;
  }
}
