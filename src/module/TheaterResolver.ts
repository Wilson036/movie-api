import { Theater } from '../entity/theater';
import { Arg, Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';

@Resolver()
export class TheaterResolver {
  @Query(() => [Theater])
  async queryTheaterById(
    @Arg('id') area_id: string
  ): Promise<Theater[] | null> {
    const manager = getManager();
    return await manager.find(Theater, { area_id: area_id });
  }
}
