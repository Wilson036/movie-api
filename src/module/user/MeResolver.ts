import { Context } from 'src/types/Context';
import { toObjectId } from '../../utils/toObjectID';
import { Ctx, Resolver, Mutation } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { Users } from '../../entity/users';
import jwt from 'jsonwebtoken';

@Resolver()
export class MeResolver {
  @Mutation(() => Users, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<Users | undefined> {
    const token = `${ctx.req.headers.authorization}`;
    //@ts-ignore
    const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`);
    //@ts-ignore
    const _id = toObjectId(id);
    const users = await getMongoRepository(Users).findOne({ where: { _id } });

    return users;
  }
}
