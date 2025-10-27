export const CONFIG = {
  DAYS_TO_BE_SCHEDULES: Number(import.meta.env.VITE_DAYS_TO_BE_SCHEDULES) || 3,
  MY_JSON_SERVER_URL: import.meta.env.VITE_MY_JSON_SERVER_URL || 'http://localhost:3000/',
  MY_JSON_SERVER_API: import.meta.env.VITE_MY_JSON_SERVER_API || 'TEST_TOKEN',
};
