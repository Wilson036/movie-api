import { Movies } from '../entity/movies';
import { Arg, Query, Resolver } from 'type-graphql';
import { getManager, getRepository } from 'typeorm';

@Resolver()
export class MoviesResolver {
  @Query(() => [Movies])
  async queryAllMovies(): Promise<Movies[] | null> {
    const manager = getManager();
    return await manager.find(Movies);
  }

  @Query(() => Movies)
  async queryMoviesById(@Arg('id') id: string): Promise<Movies | null> {
    const manager = getManager();
    const movie = await manager.findOne(Movies, { movie_id: id });
    if (!movie) {
      throw new Error('movie not found');
    }

    return movie;
  }

  @Query(() => [Movies])
  async queryMoviesByDate(@Arg('date') date: string): Promise<Movies[] | null> {
    const manager = getRepository(Movies);
    const movies = await manager.find({
      where: {
        release_time: { $lt: date },
      },
    });
    if (!movies) {
      throw new Error('movie not found');
    }

    return movies;
  }
  @Query(() => [Movies], { nullable: true })
  async queryMoviesByIds(
    @Arg('ids', () => [String], { nullable: true }) ids: string[]
  ): Promise<Movies[] | null> {
    const manager = getRepository(Movies);

    try {
      const movies = await manager.find({
        where: {
          movie_id: { $in: ids },
        },
      });
      if (!movies) {
        throw new Error('movie not found');
      }
      return movies;
    } catch (err) {
      throw new Error(err);
    }
  }
}
