
"use client"
import { useEffect, useState } from "react";
import { MovieBanner } from "@/components/MovieBanner";
import { MovieCarousel } from "@/components/MovieCarousel";
import { Footer } from "@/components/Footer";
import { fetchMovies, fetchTrendingMovies } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/NavBar";

interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
}

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: popularMovies = { results: [] } } = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => fetchMovies(),
  });

  const { data: trendingMovies = { results: [] } } = useQuery({
    queryKey: ["movies", "trending"],
    queryFn: () => fetchTrendingMovies(),
  });

  const { data: searchResults = { results: [] } } = useQuery({
    queryKey: ["movies", "search", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: searchQuery.length > 0,
  });

  useEffect(() => {
    if (popularMovies.results.length > 0 && !selectedMovie) {
      setSelectedMovie(popularMovies.results[0]);
    }
  }, [popularMovies.results, selectedMovie]);

  const movies = searchQuery ? searchResults.results : popularMovies.results;

  if (!selectedMovie) return null;


  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar onSearch={setSearchQuery} />
      <MovieBanner movie={selectedMovie} />
      <div className="relative z-10 pt-8 space-y-8">
        <MovieCarousel
          title={searchQuery ? "Search Results" : "Popular Movies"}
          movies={movies}
          onMovieSelect={setSelectedMovie}
        />
        {!searchQuery && (
          <MovieCarousel
            title="Trending Now"
            movies={trendingMovies.results}
            onMovieSelect={setSelectedMovie}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

