import { Schema, model, models } from 'mongoose';
import { dbCollection, dbDocument } from '@/constants';
import { CategorySchema, CategoryType } from '@/types';

const key = (type: CategoryType) => (type === 'countries' ? 'country' : type === 'genres' ? 'genre' : 'network');

const categorySchema = (type: CategoryType) =>
  new Schema<CategorySchema>(
    {
      _id: String,
      name: {
        type: String,
        trim: true
      },
      slug: String
    },
    {
      collection: dbCollection[key(type)],
      timestamps: true
    }
  );

const Model = (type: CategoryType) => model<CategorySchema>(dbDocument[key(type)], categorySchema(type));

export const CategoryModel = {
  genres: models[dbDocument.genre] || Model('genres'),
  networks: models[dbDocument.network] || Model('networks'),
  countries: models[dbDocument.country] || Model('countries')
};
