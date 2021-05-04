import Redis from 'ioredis';

const URL = `${process.env.REDIS_URL}`;
export const redis =
  process.env.NODE_ENV === 'production' ? new Redis(URL) : new Redis();
