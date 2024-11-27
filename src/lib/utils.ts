import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ViYTE1YzhlOTMwNmExNGMxZWQ3ZDUyYTRlNGFhMCIsIm5iZiI6MTczMjYxMjEwNC4xMTAzNDA0LCJzdWIiOiI2NzQ1OGRkMzgwYjQ0YTg5MzdiN2MzNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.f5pYhZOw9kt_ZFyPzWay-D1seZ2dOGJ43W7Mb5-a-A0"; 
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const API_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query?: string) {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    : `${API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
  
  
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
}

export async function fetchTrendingMovies() {
  const endpoint = `${API_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch trending movies');
  return response.json();
}
