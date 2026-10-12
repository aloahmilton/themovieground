const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function getApiKey() {
  const key = (process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || "").trim();
  return key === "your_tmdb_api_key_here" ? "" : key;
}

export function hasTmdbApiKey() {
  return Boolean(getApiKey());
}

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) {
    throw new Error("TMDB_API_KEY is not configured. Add a valid key to .env.local.");
  }

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv";
  popularity: number;
};

export type MovieDetails = Movie & {
  genres: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  tagline?: string;
  videos?: { results: { key: string; site: string; type: string; name: string }[] };
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
  similar?: { results: Movie[] };
  recommendations?: { results: Movie[] };
};

export type Genre = { id: number; name: string };

export type WatchProvider = {
  provider_id: number;
  provider_name: string;
};

export type WatchProviderRegion = {
  link: string;
  flatrate?: WatchProvider[];
  free?: WatchProvider[];
  ads?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
};

export function getImageUrl(path: string | null, size: "w300" | "w500" | "w780" | "original" | "w1280" = "w500") {
  if (!path) return "/placeholder-poster.svg";
  return `${IMAGE_BASE}/${size}${path}`;
}

export function getTitle(item: Movie) {
  return item.title || item.name || "Untitled";
}

export function getYear(item: Movie) {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : "";
}

export async function getTrending(media: "all" | "movie" | "tv" = "all", time: "day" | "week" = "week", page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/trending/${media}/${time}`, { page: String(page) });
}

export async function getPopular(type: "movie" | "tv" = "movie", page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/${type}/popular`, { page: String(page) });
}

export async function getTopRated(type: "movie" | "tv" = "movie", page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/${type}/top_rated`, { page: String(page) });
}

export async function getUpcoming(page = 1) {
  return tmdbFetch<{ results: Movie[] }>("/movie/upcoming", { page: String(page) });
}

export async function getNowPlaying(page = 1) {
  return tmdbFetch<{ results: Movie[] }>("/movie/now_playing", { page: String(page) });
}

export async function getOnTheAir(page = 1) {
  return tmdbFetch<{ results: Movie[] }>("/tv/on_the_air", { page: String(page) });
}

export async function searchMulti(query: string, page = 1) {
  return tmdbFetch<{ results: Movie[]; total_results: number; total_pages: number }>(
    "/search/multi",
    { query, page: String(page), include_adult: "false" }
  );
}

export async function getMovieDetails(id: number) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "videos,credits,similar,recommendations",
  });
}

export async function getTvDetails(id: number) {
  return tmdbFetch<MovieDetails>(`/tv/${id}`, {
    append_to_response: "videos,credits,similar,recommendations",
  });
}

export async function getWatchProviders(type: "movie" | "tv", id: number) {
  return tmdbFetch<{ results: Record<string, WatchProviderRegion> }>(`/${type}/${id}/watch/providers`);
}

export async function getGenres(type: "movie" | "tv" = "movie") {
  return tmdbFetch<{ genres: Genre[] }>(`/genre/${type}/list`);
}

export async function discoverByGenre(type: "movie" | "tv", genreId: number, page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/discover/${type}`, {
    with_genres: String(genreId),
    page: String(page),
    sort_by: "popularity.desc",
  });
}

export async function getHiddenGems(type: "movie" | "tv" = "movie", page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/discover/${type}`, {
    sort_by: "vote_average.desc",
    "vote_count.gte": "200",
    "vote_average.gte": "7.5",
    page: String(page),
  });
}

export async function getInDemand(type: "movie" | "tv" = "movie", page = 1) {
  return tmdbFetch<{ results: Movie[] }>(`/discover/${type}`, {
    sort_by: "popularity.desc",
    "vote_count.gte": "500",
    page: String(page),
  });
}

export async function discoverWithFilters(
  type: "movie" | "tv",
  opts: {
    genreId?: number;
    year?: number;
    language?: string;
    sortBy?: string;
    page?: number;
    voteGte?: number;
  } = {}
) {
  const params: Record<string, string> = {
    page: String(opts.page || 1),
    sort_by: opts.sortBy || "popularity.desc",
  };
  if (opts.genreId) params.with_genres = String(opts.genreId);
  if (opts.year) {
    if (type === "movie") params.primary_release_year = String(opts.year);
    else params.first_air_date_year = String(opts.year);
  }
  if (opts.language) params.with_original_language = opts.language;
  if (opts.voteGte) params["vote_average.gte"] = String(opts.voteGte);

  return tmdbFetch<{ results: Movie[]; total_pages: number }>(`/discover/${type}`, params);
}

export async function getLanguages() {
  return tmdbFetch<{ iso_639_1: string; english_name: string; name: string }[]>("/configuration/languages");
}

export const POPULAR_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
];
