import { Schema, model } from 'mongoose';
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
  genres: Model('genres'),
  networks: Model('networks'),
  countries: Model('countries')
};
