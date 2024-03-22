import { model, models, Schema } from 'mongoose';
import { dbCollection, dbDocument, Gender } from '@/constants';
import { numberFilter } from '@/lib/utils';
import { PersonSchema } from '@/types';

const personSchema = new Schema<PersonSchema>(
  {
    _id: String,
    name: {
      type: String,
      trim: true
    },
    knownAs: [String],
    slug: String,
    birthday: String,
    gender: {
      type: Number,
      enum: Object.values(Gender).filter(numberFilter)
    },
    profileImage: {
      type: String,
      default: ''
    },
    tmdb: {
      type: String,
      index: true
    },
    credits: {
      type: Number,
      default: 0
    }
  },
  {
    collection: dbCollection.person,
    timestamps: true
  }
);

export const personModel = models[dbDocument.person] || model<PersonSchema>(dbDocument.person, personSchema);
