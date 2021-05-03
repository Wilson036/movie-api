import Redis from 'ioredis';
//const redisClient = process.env.REDIS_URI;
const redisConfig = {
  host: 'ec2-34-227-34-10.compute-1.amazonaws.com', // Redis host
  port: 21330, // Redis port
  password: 'p64a63871362ba54c2c0c7ac88d380c70d8d70d366de91b2d17f2efdf069a66e7',
  db: 4,
  connectTimeout: 10000,
};

export const redis = new Redis(redisConfig);
