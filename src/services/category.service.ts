import mongodb from '@/lib/mongodb';
import { extractIdFromSlug } from '@/lib/utils';
import { CategoryModel } from '@/models';
import { CategorySchema, CategoryType } from '@/types';

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
