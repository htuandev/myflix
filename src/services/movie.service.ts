import { FilterQuery } from 'mongoose';
import { Gender, PAGE_SIZE, Status } from '@/constants';
import mongodb from '@/lib/mongodb';
import { extractIdFromSlug } from '@/lib/utils';
import { CreditModel, EpisodeModel, MovieModel } from '@/models';
import { IEpisodeList, MovieDetail, MovieSchema, Prettify } from '@/types';

export const fetchMovies = async (
  page = '1',
  filtered: FilterQuery<MovieSchema> = {},
  pageSize = PAGE_SIZE
): Promise<{ movies: MovieSchema[]; totalPages: number; totalMovies: number }> => {
  try {
    await mongodb();

    const pageNumber = parseInt(page) || 1;

    if (pageNumber < 1) throw Error('Page must be greater than 0');

    const totalMovies = await MovieModel.countDocuments(filtered).lean();
    const totalPages = Math.ceil(totalMovies / pageSize);

    if (totalPages === 0) return { movies: [], totalPages: 1, totalMovies };
    if (totalPages < pageNumber) throw Error('Page not found');

    const skip = (pageNumber - 1) * pageSize;

    const movies = (await MovieModel.find(filtered)
      .find({ status: { $ne: Status.Trailer }, ...filtered })
      .sort({ updatedAt: 'desc' })
      .select(' name slug poster backdropColor backdrop')
      .skip(skip)
      .limit(pageSize)
      .lean()) as Prettify<MovieSchema>[];

    return { movies, totalPages, totalMovies };
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies');
  }
};

export const fetchRandomMovies = async (filtered: FilterQuery<MovieSchema> = {}, size = 6) => {
  await mongodb();

  return MovieModel.aggregate([
    { $match: filtered },
    { $sample: { size } },
    { $project: { name: 1, poster: 1, slug: 1, backdropColor: 1, backdrop: 1 } }
  ]);
};

export const fetchMovieDetail = async (slug: string) => {
  await mongodb();

  const id = extractIdFromSlug(slug);

  const movie = (await MovieModel.findById(id)
    .populate([
      {
        path: 'genres',
        select: 'name slug'
      },
      {
        path: 'countries',
        select: 'name slug'
      },
      {
        path: 'networks',
        select: 'name slug'
      }
    ])
    .select('-createdAt -updatedAt -__v')
    .lean()) as MovieDetail | null;

  if (!movie) throw Error('Movie not found');

  movie.episodes = await EpisodeModel.countDocuments({ movie: id });

  const credits = (await CreditModel.find({ movie: id })
    .select('person character')
    .populate('person', 'name slug gender profileImage')
    .lean()) as {
    _id: string;
    person: { _id: string; name: string; slug: string; gender: Gender; profileImage: string };
    character?: string;
  }[];

  const casts = credits.map((credit) => ({
    _id: credit.person._id,
    name: credit.person.name,
    slug: credit.person.slug,
    gender: credit.person.gender,
    profileImage: credit.person.profileImage,
    character: credit.character
  }));

  const episodes = (await EpisodeModel.find({ movie: id }).select('name slug thumbnail').lean()) as IEpisodeList;

  return { movie, casts, episodes };
};

export const fetchMoviesByPersonId = async (personId: string, page = '1', pageSize = PAGE_SIZE) => {
  try {
    await mongodb();

    const filtered = { person: personId };

    const pageNumber = parseInt(page) || 1;

    if (pageNumber < 1) throw Error('Page must be greater than 0');

    const totalMovies = await CreditModel.countDocuments(filtered).lean();
    const totalPages = Math.ceil(totalMovies / pageSize);

    if (totalPages === 0) return { movies: [], totalPages: 1, totalMovies };
    if (totalPages < pageNumber) throw Error('Page not found');

    const skip = (pageNumber - 1) * pageSize;

    const movies = (
      await CreditModel.find(filtered)
        .populate('movie', 'name slug poster backdropColor updatedAt')
        .select('movie')
        .skip(skip)
        .limit(pageSize)
        .lean()
    )
      .map(({ movie }) => movie)
      .sort((a, b) => b.updatedAt - a.updatedAt) as MovieSchema[];

    return { movies, totalPages, totalMovies };
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies');
  }
};
