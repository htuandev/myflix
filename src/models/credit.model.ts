import { Schema, model, models } from 'mongoose';
import { dbCollection, dbDocument } from '@/constants/db';
import { CreditSchema } from '@/types';

const creditSchema = new Schema<CreditSchema>(
  {
    _id: String,
    person: {
      type: String,
      ref: dbDocument.person,
      index: true
    },
    movie: {
      type: String,
      ref: dbDocument.movie,
      index: true
    },
    character: String
  },
  {
    collection: dbCollection.credit,
    timestamps: true
  }
);

export const CreditModel = models[dbDocument.credit] || model<CreditSchema>(dbDocument.credit, creditSchema);
