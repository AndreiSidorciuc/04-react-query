import axios from "axios";
import type { Movie } from "../types/movie";

// ИСПРАВЛЕНО: Указан корректный URL-адрес для запросов к API TMDB
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

// ВЫПОЛНЕНО: Объявили именованный интерфейс в этом же файле
export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

// Избавились от инлайновой типизации в сигнатуре функции и в дженерике axios.get
export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await axios.get<MoviesResponse>(BASE_URL, {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      Accept: "application/json",
    },
  });

  return {
    results: data.results,
    total_pages: data.total_pages,
  };
};
