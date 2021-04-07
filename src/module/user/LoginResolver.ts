import { Users } from '../../entity/users';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';
import { getManager } from 'typeorm';
import { Context } from '../../types/Context';

@Resolver()
export class LoginResolver {
  @Mutation(() => Users)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<Users | undefined> {
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
    console.log(id);
    //@ts-ignores
    ctx.req.session.userId = users.id;
    return users;
  }
}
