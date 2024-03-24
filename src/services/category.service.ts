import mongodb from '@/lib/mongodb';
import pipelines from '@/lib/pipelines';
import { extractIdFromSlug } from '@/lib/utils';
import { CategoryModel, MovieModel } from '@/models';
import { CategorySchema, CategoryType, IMovieYears, MovieCategories, Prettify } from '@/types';

export const fetchCategory = async (slug: string, type: CategoryType): Promise<CategorySchema> => {
  try {
    await mongodb();
    const id = extractIdFromSlug(slug);

    const category = await CategoryModel[type].findById(id);
    if (!category) throw new Error('Category not found');

    return category;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching category');
  }
};

export const fetchMovieCategories = async () => {
  const years = (await MovieModel.aggregate(pipelines.years())) as Prettify<IMovieYears>;
  const genres = (await MovieModel.aggregate(pipelines.categories('genres'))) as Prettify<MovieCategories>;
  const countries = (await MovieModel.aggregate(pipelines.categories('countries'))) as Prettify<MovieCategories>;
  const networks = (await MovieModel.aggregate(pipelines.categories('networks'))) as Prettify<MovieCategories>;

  return { years, genres, countries, networks };
};
