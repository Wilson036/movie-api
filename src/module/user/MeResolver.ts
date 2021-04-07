import { Context } from 'src/types/Context';
import { toObjectId } from '../../utils/toObjectID';
import { Ctx, Query, Resolver } from 'type-graphql';
import { getMongoRepository } from 'typeorm';
import { Users } from '../../entity/users';

@Resolver()
export class MeResolver {
  @Query(() => Users, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<Users | undefined> {
    //@ts-ignore
    const _id = toObjectId(ctx.req.session!.userId);
    const users = getMongoRepository(Users).findOne({ where: { _id } });
    return users;
  }
}
