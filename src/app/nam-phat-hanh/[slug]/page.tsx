import { Metadata } from 'next';
import MovieCard from '@/components/shared/MovieCard';
import Pagination from '@/components/shared/Pagination';
import { fetchMovies } from '@/services';
import { NextQuery } from '@/types';

type Props = {
  params: NextQuery;
  searchParams: NextQuery;
};

export async function generateMetadata({ searchParams, params }: Props): Promise<Metadata> {
  return {
    title: `Phim Phát Hành Năm ${params.slug}${Number(searchParams.page) > 1 ? ` - Trang ${searchParams.page}` : ''} | Myflix`
  };
}

export default async function Page({ searchParams, params }: Props) {
  const { movies, totalPages } = await fetchMovies(searchParams.page, { year: params.slug });

  return (
    <section className=' container flex flex-col xl:pt-8'>
      <h1 className='text-heading mb-6 text-center'>Phim Phát Hành Năm {params.slug}</h1>
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
