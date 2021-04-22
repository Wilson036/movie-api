import { Showtime } from '../entity/showTime';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@Resolver()
export class ShowTimeResolver {
  @Mutation(() => [Showtime])
  async queryTimeByMovieId(
    @Arg('id') movie_id: string,
    @Arg('date') date: string,
    @Arg('theater_ids', () => [String]) theater_ids: string[]
  ): Promise<Showtime[] | null> {
    const manager = getRepository(Showtime);
    const showTime = await manager.find({
      where: {
        movie_id,
        date,
        theater_id: { $in: theater_ids },
      },
    });

    return showTime;
  }

  @Query(() => [Showtime])
  async queryTimeById(@Arg('id') movie_id: string): Promise<Showtime[] | null> {
    const manager = getRepository(Showtime);
    const showTime = await manager.find({
      where: {
        movie_id,
      },
    });

    return showTime;
  }
}
