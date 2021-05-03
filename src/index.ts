import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cors from 'cors';
import { redis } from './redis';

const main = async () => {
  await createConnection().catch((err) => console.error(err));

  const schema = await buildSchema({
    resolvers: [__dirname + '/module/**/*.ts'],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });
  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'https://localhost:3000',
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: 'diq',
      secret: 'wilson036',
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app, cors: false, path: '/movie-api' });

  app.listen(process.env.PORT, () => {
    console.log(`server start!!!! port is ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
