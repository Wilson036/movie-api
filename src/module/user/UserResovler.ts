import { Users } from '../../entity/users';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RegisterInput } from './register/registerInput';

@Resolver()
export class UserResolver {
  @Query(() => [Users])
  async users(): Promise<Users[] | null> {
    const manager = getManager();
    return await manager.find(Users);
  }

  @Mutation(() => Users)
  async registerUser(
    @Arg('data') { username, password, email }: RegisterInput
  ): Promise<Users | null> {
    const user = new Users();
    const manager = getManager();
    user.username = username;
    user.password = await bcrypt.hash(password, 12);
    user.email = email;
    user.createdAt = new Date(Date.now());
    console.log('new Date()', new Date(Date.now()));
    try {
      await manager.save(user);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
