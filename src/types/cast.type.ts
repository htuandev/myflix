import { Gender } from '@/constants';

export type CreditSchema = {
  _id: string;
  movie: string;
  person: string;
  character?: string;
};

export type ICast = {
  _id: string;
  personId: string;
  name: string;
  character?: string;
  profileImage?: string;
  gender: Gender;
  slug: string;
};
