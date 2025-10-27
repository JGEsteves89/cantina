export interface Config {
  DAYS_TO_BE_SCHEDULES: number;
  MY_JSON_SERVER_URL: string;
  MY_JSON_SERVER_API: string;
}

async function loadConfig(): Promise<Config> {
  const res = await fetch('/config.json');
  return await res.json();
}

const CONFIG = await loadConfig();

export { CONFIG };
