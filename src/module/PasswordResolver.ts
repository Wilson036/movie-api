import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 } from 'uuid';
import { Users } from '../entity/users';
import { redis } from '../redis';
import { sendEMail } from '../utils/sendEmail';
import { getManager } from 'typeorm';
import { forgotPasswordPrefix } from '../constant/redisPrefix';
import { ChangePasswordInput } from './password/ChangePasswordInput';
import bcrypt from 'bcryptjs';
import { toObjectId } from '../utils/toObjectID';

@Resolver()
export class PasswordResolver {
  @Mutation(() => Boolean)
  async sendComfiredEmail(@Arg('email') email: string): Promise<Boolean> {
    const manager = getManager();
    const user = await manager.findOne(Users, { where: { email } });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set(
      forgotPasswordPrefix + token,
      `${user.id}`,
      'ex',
      60 * 60 * 24
    );
    sendEMail(email, `http://localhost:3000/change-password/${token}`);
    return true;
  }

  @Mutation(() => Boolean, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput
  ): Promise<Boolean> {
    const manager = getManager();
    let _id;
    await redis.get(forgotPasswordPrefix + token, (_err, id) => {
      if (id) {
        _id = toObjectId(id);
      }
    });
    if (!_id) {
      return false;
    }

    const user = await manager.findOne(Users, { where: { _id } });

    if (!user) {
      return false;
    }

    await redis.del(forgotPasswordPrefix + token);
    user.password = await bcrypt.hash(password, 12);
    manager.save(user);

    // //@ts-ignore
    // ctx.req.session!.userId = user.id;
    return true;
  }
}
