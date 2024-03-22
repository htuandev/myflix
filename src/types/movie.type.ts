import { ContentType, Status } from '@/constants';
import { Prettify } from '.';

export type MovieSchema = {
  _id: string;
  tmdb: string;
  name: string;
  slug: string;
  knownAs: string[];
  poster: string;
  thumbnail: string;
  backdrop: string;
  backdropColor: string;
  releaseDate: string;
  year: number;
  overview: string;
  trailer: string;
  runtime: number;
  episodes: number;
  totalEpisodes: number;
  type: ContentType[];
  status: Status;
  genres: string[];
  countries: string[];
  networks: string[];
  views: number;
};

export type MovieDetail = Prettify<
  Omit<MovieSchema, 'genres' | 'countries' | 'networks'> & {
    genres: { _id: string; name: string; slug: string }[];
    countries: { _id: string; name: string; slug: string }[];
    networks: { _id: string; name: string; slug: string }[];
  }
>;
