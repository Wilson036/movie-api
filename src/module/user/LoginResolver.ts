import { Users } from '../../entity/users';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import { Context } from '../../types/Context';
import jwt from 'jsonwebtoken';

@Resolver()
export class LoginResolver {
  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const manager = getManager();
    const users = await manager.findOne(Users, { email: email });
    if (!users) {
      throw new Error('user not found');
    }

    const pwd = await bcrypt.compare(password, users.password);
    if (!pwd) {
      throw new Error('password not correct');
    }
    const id = users.id;

    //@ts-ignores
    ctx.req.session.userId = id;

    return jwt.sign({ id: id }, `${process.env.JWT_SECRET}`);
  }
}
