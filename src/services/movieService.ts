import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<{ results: Movie[]; total_pages: number }> => {
  const { data } = await axios.get<{ results: Movie[]; total_pages: number }>(
    BASE_URL,
    {
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
    },
  );

  return {
    results: data.results,
    total_pages: data.total_pages,
  };
};
