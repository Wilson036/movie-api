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
        release_date: { $gt: new Date(date) },
      },
    });
    if (!movies) {
      throw new Error('movie not found');
    }

    return movies;
  }
}