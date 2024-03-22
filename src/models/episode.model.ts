import { Schema, model, models } from 'mongoose';
import { dbCollection, dbDocument } from '@/constants';
import { EpisodeSchema } from '@/types';

const episodeSchema = new Schema<EpisodeSchema>(
  {
    _id: String,
    name: String,
    slug: String,
    movie: {
      type: String,
      ref: dbDocument.movie,
      index: true
    },
    thumbnail: String,
    link: String
  },
  {
    collection: dbCollection.episode,
    timestamps: true
  }
);

export const EpisodeModel = models[dbDocument.episode] || model<EpisodeSchema>(dbDocument.episode, episodeSchema);
