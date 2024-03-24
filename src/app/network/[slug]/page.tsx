import { Metadata } from 'next';
import MovieCard from '@/components/shared/MovieCard';
import Pagination from '@/components/shared/Pagination';
import { ContentType } from '@/constants';
import { extractIdFromSlug } from '@/lib/utils';
import { fetchMovies, fetchCategory } from '@/services';
import { NextQuery } from '@/types';

type Params = {
  params: NextQuery;
  searchParams: NextQuery;
};

export async function generateMetadata({ params, searchParams }: Params): Promise<Metadata> {
  const { name } = await fetchCategory(params.slug, 'networks');
  return {
    title: `Phim ${name}${Number(searchParams.page) > 1 ? ` - Trang ${searchParams.page}` : ''} | Myflix`,
    description: `Danh sách phim ${name} | Myflix`
  };
}

export default async function Page({ searchParams, params }: Params) {
  const { name } = await fetchCategory(params.slug, 'networks');

  const { movies, totalPages } = await fetchMovies(searchParams.page, { networks: extractIdFromSlug(params.slug) });

  return (
    <section className=' container flex min-h-screen flex-col'>
      <h1 className='text-heading mb-6 text-center'>Phim {name}</h1>
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
