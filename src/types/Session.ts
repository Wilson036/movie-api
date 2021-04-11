import { Session } from 'express-session';
import { ObjectID } from 'mongodb';

declare module 'express-session' {
  interface Session {
    userId: ObjectID;
  }
}
