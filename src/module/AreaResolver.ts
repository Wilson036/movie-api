import { Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';
import { Area } from '../entity/area';

@Resolver()
export class AreaResolver {
  @Query(() => [Area])
  async queryAllArea(): Promise<Area[] | null> {
    const manager = getManager();
    return await manager.find(Area);
  }
}
