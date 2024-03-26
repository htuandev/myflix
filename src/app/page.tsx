import { Metadata } from 'next';
import Link from 'next/link';
import MovieCard from '@/components/shared/MovieCard';
import { CURRENT_YEAR, ContentType, METADATA_TITLE, Status } from '@/constants';
import { fetchMovies, fetchRandomMovies } from '@/services';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const movies = await fetchRandomMovies({ year: CURRENT_YEAR, status: { $ne: Status.Trailer } }, 1);

  const title = METADATA_TITLE;

  return {
    title,
    openGraph: { title, images: movies.map((movie) => movie.backdrop) }
  };
}

export default async function Home() {
  const series = await fetchMovies(undefined, { type: ContentType.Series }, 12);
  const single = await fetchMovies(undefined, { type: ContentType.Single }, 12);
  const vietnamese = await fetchMovies(undefined, { type: ContentType.Vietnamese }, 6);
  const animation = await fetchMovies(undefined, { type: ContentType.Animation }, 6);
  const tenYearsAgoMovies = await fetchRandomMovies({ year: { $lt: CURRENT_YEAR - 10, $nin: [0] } });

  return (
    <section className='container'>
      <Link href='/phim-bo'>
        <h2 className=' text-heading'>Phim bộ mới cập nhật</h2>
      </Link>
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {series.movies.map((movie) => (
          <MovieCard {...movie} key={movie._id} />
        ))}
      </div>

      <Link href='/phim-le'>
        <h2 className=' text-heading mt-6'>Phim lẻ mới cập nhật</h2>
      </Link>
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {single.movies.map((movie) => (
          <MovieCard {...movie} key={movie._id} />
        ))}
      </div>

      <Link href='/phim-thuyet-minh'>
        <h2 className=' text-heading mt-6'>Phim thuyết minh mới cập nhật</h2>
      </Link>
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {vietnamese.movies.map((movie) => (
          <MovieCard {...movie} key={movie._id} />
        ))}
      </div>

      <Link href='/phim-hoat-hinh'>
        <h2 className=' text-heading mt-6'>Phim hoạt hình mới cập nhật</h2>
      </Link>
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {animation.movies.map((movie) => (
          <MovieCard {...movie} key={movie._id} />
        ))}
      </div>

      <Link href='/phim-muoi-nam-ve-truoc'>
        <h2 className=' text-heading mt-6'>10 năm về trước</h2>
      </Link>
      <div className=' grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {tenYearsAgoMovies.map((movie) => (
          <MovieCard {...movie} key={movie._id} />
        ))}
      </div>
    </section>
  );
}
