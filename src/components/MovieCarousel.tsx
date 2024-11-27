import { BASE_IMG_URL } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
}
interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}
export function MovieCarousel({ title, movies, onMovieSelect }: MovieCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  useEffect(() => {
    checkScroll();
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', checkScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);
  const scrollTo = (direction: 'left' | 'right') => {
    console.log(`Scrolling ${direction}`);
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);
  return (
    <div className="py-4 relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h2 className="text-2xl font-bold text-white mb-4 px-8">{title}</h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 z-10 transition-all duration-300 ease-in-out"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 scroll-smooth"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none relative w-64 group transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onMovieSelect(movie)}
            >
              <img
                src={`${BASE_IMG_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-36 object-cover rounded"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded flex flex-col items-center justify-center">
                <h3 className="text-white text-center font-semibold px-4 mb-2">{movie.title}</h3>
                <button 
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMovieSelect(movie);
                  }}
                >
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 z-10 transition-all duration-300 ease-in-out"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
