import { Schema, model, models } from 'mongoose';
import { ContentType, Status, dbCollection, dbDocument } from '@/constants';
import { numberFilter } from '@/lib/utils';
import { MovieSchema } from '@/types';

const movieSchema = new Schema<MovieSchema>(
  {
    _id: String,
    name: {
      type: String,
      trim: true
    },
    slug: String,
    knownAs: [String],
    tmdb: {
      type: String,
      index: true
    },
    poster: String,
    thumbnail: {
      type: String,
      default: ''
    },
    backdrop: String,
    backdropColor: String,
    releaseDate: {
      type: String,
      default: ''
    },
    trailer: {
      type: String,
      default: ''
    },
    year: {
      type: Number,
      index: true
    },
    overview: {
      type: String,
      trim: true
    },
    runtime: Number,
    totalEpisodes: Number,
    type: [
      {
        type: Number,
        enum: Object.values(ContentType).filter(numberFilter),
        index: true
      }
    ],
    status: {
      type: Number,
      enum: Object.values(Status).filter(numberFilter),
      index: true,
      default: Status.Trailer
    },
    genres: [{ type: String, ref: dbDocument.genre, index: true }],
    countries: [{ type: String, ref: dbDocument.country, index: true }],
    networks: [{ type: String, ref: dbDocument.network, index: true }],
    views: {
      type: Number,
      default: 0
    }
  },
  {
    collection: dbCollection.movie,
    timestamps: true
  }
);

export const MovieModel = models[dbDocument.movie] || model<MovieSchema>(dbDocument.movie, movieSchema);
