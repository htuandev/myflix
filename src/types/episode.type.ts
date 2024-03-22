export type EpisodeSchema = {
  _id: string;
  name: string;
  slug: string;
  movie: string;
  thumbnail: string;
  link: string;
};

export type IEpisodeList = {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
}[];
