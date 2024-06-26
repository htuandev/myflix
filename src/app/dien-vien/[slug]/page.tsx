import { Metadata } from 'next';
import MovieCard from '@/components/shared/MovieCard';
import Pagination from '@/components/shared/Pagination';
import ProfileImage from '@/components/shared/ProfileImage';
import { extractIdFromSlug } from '@/lib/utils';
import { fetchMoviesByPersonId, fetchPerson } from '@/services';
import { NextQuery } from '@/types';

type Params = {
  params: NextQuery;
  searchParams: NextQuery;
};

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { name, profileImage } = await fetchPerson(params.slug);

  const title = `${name}${Number(searchParams.page) > 1 ? ` | Phim tham gia - Trang ${searchParams.page}` : ''} | Myflix`;
  const description = `Danh sách phim ${name} | Myflix`;

  return {
    title,
    description,
    openGraph: {
      images: profileImage,
      title,
      description
    }
  };
}

export default async function Page({ searchParams, params }: Params) {
  const { name, credits, profileImage, gender, birthday } = await fetchPerson(params.slug);

  const { movies, totalPages } = await fetchMoviesByPersonId(extractIdFromSlug(params.slug), searchParams.page);

  return (
    <section className=' container flex flex-col xl:pt-8'>
      <div className='flex-center'>
        <div className='mb-6 flex gap-6'>
          <ProfileImage src={profileImage} gender={gender} alt={name} className=' h-20 w-20 md:h-32 md:w-32' />
          <div className=' flex flex-col justify-center gap-4'>
            <h1 className='text-heading mb-0'>{name}</h1>
            {birthday && <p className=' hidden md:block'>Ngày sinh: {birthday}</p>}
            {credits > 0 && <p className=' hidden md:block'>Phim tham gia: {credits}</p>}
          </div>
        </div>
      </div>
      {credits > 0 && <h1 className='text-heading mb-6'>Phim tham gia</h1>}
      <div className=' flex-1'>
        <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {movies.map((movie) => (
            <MovieCard {...movie} key={movie._id} />
          ))}
        </div>
      </div>
      {totalPages > 1 && <Pagination page={searchParams.page} totalPages={totalPages} />}
    </section>
  );
}
