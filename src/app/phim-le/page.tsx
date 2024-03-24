import { Metadata } from 'next';
import MovieCard from '@/components/shared/MovieCard';
import Pagination from '@/components/shared/Pagination';
import { CURRENT_YEAR, ContentType } from '@/constants';
import { fetchMovies } from '@/services';
import { MovieSchema, NextQuery } from '@/types';

export async function generateMetadata({ searchParams }: { searchParams: NextQuery }): Promise<Metadata> {
  return {
    title: `Top Phim Lẻ Hay Mới Nhất ${CURRENT_YEAR}${Number(searchParams.page) > 1 ? ` - Trang ${searchParams.page}` : ''} | Myflix`
  };
}

export default async function Page({ searchParams }: { searchParams: NextQuery }) {
  const { movies, totalPages } = await fetchMovies(searchParams.page, { type: ContentType.Single });

  return (
    <section className=' container flex flex-col'>
      <h1 className='text-heading mb-6 text-center'>Phim Lẻ Mới Cập Nhật</h1>
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
