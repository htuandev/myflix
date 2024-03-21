export type CategorySchema = {
  _id: string;
  name: string;
  slug: string;
  credits: number;
};

export type CategoryType = 'genres' | 'networks' | 'countries';
