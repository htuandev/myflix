import { Metadata } from 'next';
import Link from 'next/link';
import { FilterQuery } from 'mongoose';
import CastCard from '@/components/shared/CastCard';
import EpisodeList from '@/components/shared/EpisodeList';
import MovieCard from '@/components/shared/MovieCard';
import MovieFacts from '@/components/shared/MovieFacts';
import VideoPlayer from '@/components/shared/VideoPlayer';
import { ContentType, Status } from '@/constants';
import { extractIdFromSlug, hexToRgba, tmdbImageSrc } from '@/lib/utils';
import { fetchEpisodeDetail, fetchMovieDetail, fetchRandomMovies } from '@/services';
import { MovieSchema, NextQuery } from '@/types';

export async function generateMetadata({ params }: { params: NextQuery }): Promise<Metadata> {
  const episode = await fetchEpisodeDetail(params.slug);
  const { movie } = await fetchMovieDetail(episode.movie);

  const { name, year, poster, backdrop, thumbnail, overview } = movie;

  return {
    title: `${name} (${year}) - ${episode.name} | Myflix`,
    description: overview,
    openGraph: {
      images: [poster, backdrop, thumbnail],
      title: `${name} (${year}) | Myflix`,
      description: overview
    }
  };
}

export default async function Page({ params }: { params: NextQuery }) {
  const episode = await fetchEpisodeDetail(params.slug);
  const { movie, casts, episodes } = await fetchMovieDetail(episode.movie);

  const { name, backdrop, backdropColor, overview, slug, type } = movie;

  const recommendedCount = type.includes(ContentType.Series) ? 6 : 12;

  const filtered: FilterQuery<MovieSchema> = {
    _id: { $ne: movie._id },
    status: { $ne: Status.Trailer },
    type: { $in: [type[0]] },
    countries: { $in: movie.countries.map(({ _id }) => _id) },
    genres: { $in: movie.genres.map(({ _id }) => _id) }
  };

  const recommended = await fetchRandomMovies(filtered, recommendedCount);

  const styles: { [key: string]: React.CSSProperties } = {
    bg: { backgroundImage: `url(${tmdbImageSrc(backdrop, 'w1920_and_h800_multi_faces')})` },
    bgImgColor: {
      backgroundImage: `linear-gradient(to right, ${backdropColor} calc((50vw - 180px) - 300px), ${hexToRgba(backdropColor, 0.84)} 50%, ${hexToRgba(backdropColor, 0.84)} 100%)`
    },
    bgColor: { backgroundColor: backdropColor }
  };

  return (
    <section>
      <div className='container max-w-6xl xl:pt-4'>
        <VideoPlayer source={episode.link} thumbnail={episode.thumbnail || movie.thumbnail} />
        <Link href={`/album/${slug}-${movie._id}`} className=' group'>
          <h1 className='text-heading inline-block '>
            {name}
            {type.includes(ContentType.Series) && (
              <span className=' font-medium group-hover:invisible'> - {episode.name}</span>
            )}
          </h1>
        </Link>
        <MovieFacts {...movie} />
        <p className='mt-4'> {overview}</p>
        {casts.length > 0 && (
          <div className='my-8'>
            <div className=' grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-8'>
              {casts.map((cast) => (
                <CastCard key={cast._id} {...cast} style={styles.bgColor} />
              ))}
            </div>
          </div>
        )}

        <EpisodeList
          episodes={episodes}
          type={type}
          movieName={name}
          movieSlug={slug}
          currentEpisodeId={extractIdFromSlug(params.slug)}
          style={styles.bgColor}
          isPlaying
        />

        {recommended.length > 0 && (
          <div className='mt-8'>
            <h2 className=' mb-4 text-2xl font-medium'>Đề xuất cho bạn</h2>
            <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              {recommended.map((movie) => (
                <MovieCard {...(movie as MovieSchema)} key={movie._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
