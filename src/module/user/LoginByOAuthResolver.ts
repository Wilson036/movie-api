import { Users } from '../../entity/users';
import { Context } from 'src/types/Context';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { gravatar } from '../../utils/gravatar';

@Resolver()
export class LoginWithOauthResolver {
  @Mutation(() => String)
  async LoginWithOauth(
    @Arg('email') email: string,
    @Arg('id') id: string,
    @Ctx() { req }: Context
  ): Promise<string | null> {
    const manager = getManager();
    let user = await manager.findOne(Users, { email: email });

    if (!user) {
      user = new Users();
      user.username = email.split('@')[0];
      user.password = await bcrypt.hash(`${id}`, 12);
      user.email = email;
      user.avatar = gravatar(email);
      user.createdAt = new Date(Date.now());
      try {
        await manager.save(user);
      } catch (err) {
        console.error(err);
      }
    }
    const userId = user.id;
    //@ts-ignore
    req.session.userId = userId;

    return jwt.sign({ id: userId }, `${process.env.JWT_SECRET}`);
  }
}
