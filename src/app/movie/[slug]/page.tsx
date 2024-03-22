import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Play, PlayCircle } from 'lucide-react';
import CastCard from '@/components/shared/CastCard';
import MovieFacts from '@/components/shared/MovieFacts';
import Poster from '@/components/shared/Poster';
import Avatar from '@/components/shared/ProfileImage';
import ProfileImage from '@/components/shared/ProfileImage';
import { Button } from '@/components/ui/button';
import { ContentType, Status } from '@/constants';
import { hexToRgba, lightenColor, tmdbImageSrc } from '@/lib/utils';
import { fetchMovieDetail } from '@/services';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { movie, casts } = await fetchMovieDetail(params.slug);

  const { name, year, poster, backdrop, thumbnail, overview } = movie;

  return {
    title: `${name} (${year}) | Myflix`,
    description: overview,
    openGraph: {
      images: [poster, backdrop, thumbnail],
      title: `${name} (${year}) | Myflix`,
      description: overview
    }
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { movie, casts } = await fetchMovieDetail(params.slug);
  const episodes: { _id: string; slug: string }[] = [{ _id: '1', slug: 'episode-1' }];

  const { name, year, poster, backdrop, backdropColor, overview, slug, status, type } = movie;

  const styles: { [key: string]: React.CSSProperties } = {
    bg: { backgroundImage: `url(${tmdbImageSrc(backdrop, 'w1920_and_h800_multi_faces')})` },
    bgColor: {
      backgroundImage: `linear-gradient(to right, ${backdropColor} calc((50vw - 180px) - 300px), ${hexToRgba(backdropColor, 0.84)} 50%, ${hexToRgba(backdropColor, 0.84)} 100%)`
    },
    poster: { backgroundColor: backdropColor }
  };

  return (
    <section>
      <div className='flex-center relative z-10 text-opacity-95'>
        <div
          className=' absolute top-0 h-56 w-full overflow-hidden bg-cover bg-center bg-no-repeat md:h-full md:bg-[right_-180px_top]'
          style={styles.bg}
        >
          <div style={styles.bgColor} className=' absolute inset-0' />
        </div>
        <div className='container'>
          <div className=' flex flex-wrap items-center md:flex-nowrap'>
            <div className='relative mb-6 w-full md:mb-0 md:w-[300px]'>
              <div className=' w-32 md:mx-auto md:w-[300px]'>
                <Poster src={poster} alt={name} size='lg' style={styles.poster} />
              </div>
            </div>
            <div className='relative z-10 w-full md:ml-8 md:w-auto'>
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

                <Button variant='ghost'>
                  <PlayCircle className='mr-2 h-4 w-4' /> Trailer
                </Button>
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
                <CastCard key={cast._id} {...cast} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
