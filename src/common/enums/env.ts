import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET_KEY = process.env.PRITEKEY;
export const EXPIRES_TIME = '7d';

export const EnvKeyName = {
  // system
  NODE_ENV: 'NODE_ENV',
  UV_THREADPOOL_SIZE: 'UV_THREADPOOL_SIZE',

  // app
  API_PORT: 'API_PORT',

  // database

  // sentry
  SENTRY_DSN: 'SENTRY_DSN',
  MONGODB: 'MONGODB',
  PRITEKEY: 'PRITEKEY',
  saltRounds: 'saltRounds',
};
