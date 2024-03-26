import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { FilterQuery } from 'mongoose';
import CastCard from '@/components/shared/CastCard';
import EpisodeList from '@/components/shared/EpisodeList';
import MovieCard from '@/components/shared/MovieCard';
import MovieFacts from '@/components/shared/MovieFacts';
import Poster from '@/components/shared/Poster';
import YoutubeModal from '@/components/shared/YoutubeModal';
import { Button } from '@/components/ui/button';
import { ContentType, Status } from '@/constants';
import { hexToRgba, tmdbImageSrc } from '@/lib/utils';
import { fetchMovieDetail, fetchRandomMovies } from '@/services';
import { MovieSchema, NextQuery } from '@/types';

export async function generateMetadata({ params }: { params: NextQuery }): Promise<Metadata> {
  const { movie } = await fetchMovieDetail(params.slug);

  const { name, year, backdrop, thumbnail, overview } = movie;

  const title = `${name} (${year}) | Myflix`;
  const description = overview;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: thumbnail || backdrop
    }
  };
}

export default async function Page({ params }: { params: NextQuery }) {
  const { movie, casts, episodes } = await fetchMovieDetail(params.slug);

  const { name, year, poster, backdrop, backdropColor, overview, slug, status, type } = movie;

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
    <>
      <div className='flex-center relative z-[5] text-opacity-95'>
        <div
          className=' absolute top-0 h-56 w-full overflow-hidden bg-cover bg-center bg-no-repeat md:h-full md:bg-[right_-180px_top]'
          style={styles.bg}
        >
          <div style={styles.bgImgColor} className=' absolute inset-0' />
        </div>
        <div className='container'>
          <div className=' flex flex-wrap items-center md:flex-nowrap'>
            <div className='relative mb-6 w-full md:mb-0 md:w-[300px]'>
              <div className=' w-32 md:mx-auto md:w-[300px]'>
                <Poster src={poster} alt={name} size='lg' style={styles.bgColor} />
              </div>
            </div>
            <div className='relative z-[5] w-full md:ml-8 md:w-auto'>
              <h1 className='text-heading '>
                {name}
                {!!year && year > 0 && <span className=' font-medium'> ({year})</span>}
              </h1>

              <MovieFacts {...movie} />

              <div className='mt-6 flex flex-wrap items-center gap-4'>
                {status !== Status.Trailer && (
                  <Link
                    href={`/play/${slug}${type.includes(ContentType.Series) ? `-${episodes[0].slug}` : ''}-${episodes[0]._id}`}
                  >
                    <Button>
                      <Play className='mr-2 h-4 w-4' /> Phát
                    </Button>
                  </Link>
                )}

                <YoutubeModal trailer={movie.trailer} />
              </div>

              <h3 className='mt-4 text-xl font-bold'>Overview</h3>
              <p className='mt-2'> {overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container pt-0'>
        {casts.length > 0 && (
          <div className='my-8'>
            <h2 className=' mb-4 text-2xl font-medium'>Diễn viên</h2>
            <div className=' grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'>
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
          currentEpisodeId={episodes[0]._id}
          style={styles.bgColor}
        />

        {recommended.length > 0 && (
          <div className='mt-8'>
            <h2 className=' mb-4 text-2xl font-medium'>Đề xuất cho bạn</h2>
            <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
              {recommended.map((movie) => (
                <MovieCard {...(movie as MovieSchema)} key={movie._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
