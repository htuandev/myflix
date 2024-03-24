import mongodb from '@/lib/mongodb';
import { extractIdFromSlug } from '@/lib/utils';
import { PersonModel } from '@/models';
import { PersonSchema } from '@/types';

export const fetchPerson = async (slug: string): Promise<PersonSchema> => {
  try {
    await mongodb();
    const id = extractIdFromSlug(slug);

    const person = (await PersonModel.findById(id).lean()) as PersonSchema | null;
    if (!person) throw new Error('Person not found');

    return person;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching person');
  }
};
