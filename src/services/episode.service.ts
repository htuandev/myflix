import mongodb from '@/lib/mongodb';
import { extractIdFromSlug } from '@/lib/utils';
import { EpisodeModel } from '@/models';
import { EpisodeSchema, Prettify } from '@/types';

export const fetchEpisodeDetail = async (slug: string) => {
  try {
    await mongodb();
    const id = extractIdFromSlug(slug);
    const episode = (await EpisodeModel.findById(id).lean()) as Prettify<EpisodeSchema> | null;
    if (!episode) throw new Error('Episode not found');

    return episode;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching episode');
  }
};
