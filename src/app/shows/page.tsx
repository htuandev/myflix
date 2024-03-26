import { Metadata } from 'next';
import MovieCard from '@/components/shared/MovieCard';
import Pagination from '@/components/shared/Pagination';
import { ContentType } from '@/constants';
import { fetchMovies } from '@/services';
import { NextQuery } from '@/types';

export async function generateMetadata({ searchParams }: { searchParams: NextQuery }): Promise<Metadata> {
  const { movies } = await fetchMovies(searchParams.page, { type: ContentType.Shows });

  const title = `Top Shows Mới Cập Nhật${Number(searchParams.page) > 1 ? ` - Trang ${searchParams.page}` : ''} | Myflix`;
  const description = `Danh sách shows mới cập nhật | Myflix`;

  return {
    title,
    description,
    openGraph: { title, description, images: movies.map((movie) => movie.thumbnail || movie.backdrop) }
  };
}

export default async function Page({ searchParams }: { searchParams: NextQuery }) {
  const { movies, totalPages } = await fetchMovies(searchParams.page, { type: ContentType.Shows });

  return (
    <section className=' container flex flex-col xl:pt-8'>
      <h1 className='text-heading mb-6 text-center'>Shows Mới Cập Nhật</h1>
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
