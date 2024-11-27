import { BASE_IMG_URL } from "@/lib/utils";

interface Movie {
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
}

interface MovieBannerProps {
  movie: Movie;
}

export function MovieBanner({ movie }: MovieBannerProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={`${BASE_IMG_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-8 max-w-2xl text-white">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-4">{movie.overview}</p>
        <p className="text-netflix-gray">
          Release Date: {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
}