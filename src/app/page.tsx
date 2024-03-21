import MovieCard from "@/components/MovieCard";
import { ContentType } from "@/constants";
import { fetchMovies, fetchRandomMovies } from "@/services";
import { MovieSchema } from "@/types";
import { log } from "console";
import Link from "next/link";

export default async function Home() {
  const series = await fetchMovies("1", { type: ContentType.Series }, 12);
  const single = await fetchMovies("1", { type: ContentType.Single }, 12);
  const vietnamese = await fetchMovies(
    "1",
    { type: ContentType.Vietnamese },
    6
  );
  const animation = await fetchMovies("1", { type: ContentType.Animation }, 6);
  const twentyYearAgoMovies = await fetchRandomMovies({
    year: { $lt: new Date().getFullYear() - 10, $nin: [0] },
  });

  return (
    <main className="container">
      <Link href="/phim-bo">
        <h2 className=" text-heading">Phim bộ mới cập nhật</h2>
      </Link>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {series.movies.map((movie) => (
          <MovieCard {...(movie as MovieSchema)} key={movie._id as string} />
        ))}
      </div>

      <Link href="/phim-le">
        <h2 className=" text-heading mt-6">Phim lẻ mới cập nhật</h2>
      </Link>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {single.movies.map((movie) => (
          <MovieCard {...(movie as MovieSchema)} key={movie._id as string} />
        ))}
      </div>

      <Link href="/phim-thuyet-minh">
        <h2 className=" text-heading mt-6">Phim thuyết minh mới cập nhật</h2>
      </Link>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {vietnamese.movies.map((movie) => (
          <MovieCard {...(movie as MovieSchema)} key={movie._id as string} />
        ))}
      </div>

      <Link href="/phim-hoat-hinh">
        <h2 className=" text-heading mt-6">Phim hoạt hình mới cập nhật</h2>
      </Link>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {animation.movies.map((movie) => (
          <MovieCard {...(movie as MovieSchema)} key={movie._id as string} />
        ))}
      </div>

      <Link href="/phim-muoi-nam-ve-truoc">
        <h2 className=" text-heading mt-6">10 năm về trước</h2>
      </Link>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {twentyYearAgoMovies.map((movie) => (
          <MovieCard {...(movie as MovieSchema)} key={movie._id as string} />
        ))}
      </div>
    </main>
  );
}
