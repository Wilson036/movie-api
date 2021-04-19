import { Showtime } from '../entity/showTime';
import { Arg, Query, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';

@Resolver()
export class ShowTimeResolver {
  @Query(() => [Showtime])
  async queryTimeByMovieId(
    @Arg('id') movie_id: string
  ): Promise<Showtime[] | null> {
    const manager = getManager();
    return await manager.find(Showtime, { movie_id });
  }
}
