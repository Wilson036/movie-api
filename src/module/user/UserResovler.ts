import { Users } from '../../entity/users';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RegisterInput } from './register/registerInput';
import jwt from 'jsonwebtoken';
import { Context } from 'src/types/Context';

@Resolver()
export class UserResolver {
  @Query(() => [Users])
  async users(): Promise<Users[] | null> {
    const manager = getManager();
    return await manager.find(Users);
  }

  @Mutation(() => String)
  async registerUser(
    @Arg('data') { username, password, email }: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<string | null> {
    const user = new Users();
    const manager = getManager();
    user.username = username;
    user.password = await bcrypt.hash(password, 12);
    user.email = email;
    user.createdAt = new Date(Date.now());

    try {
      await manager.save(user);
      const id = user.id;
      //@ts-ignore
      req.session.userId = id;
      return jwt.sign({ id: id }, `${process.env.JWT_SECRET}`);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async addFoviesMovie(
    @Arg('favorite_movies', () => [String]) favorite_movies: string[],
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const token = `${ctx.req.headers.authorization}`;
    const manager = getManager();
    //@ts-ignore
    const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`);
    //@ts-ignore
    const _id = toObjectId(id);

    const user = await manager.findOne(Users, { where: { _id } });
    if (!user) {
      return false;
    }
    user.favorite_movies = favorite_movies;
    await manager.save(user);

    return true;
  }
}
