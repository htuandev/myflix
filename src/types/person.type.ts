import { Gender } from '../constants';

export type PersonSchema = {
  _id: string;
  tmdb: string;
  name: string;
  knownAs: string[];
  slug: string;
  birthday: string;
  gender: Gender;
  profileImage: string;
  credits: number;
};