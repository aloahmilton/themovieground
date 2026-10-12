export type CatalogId =
  | "trending"
  | "popular-movies"
  | "in-demand-movies"
  | "hidden-gems-movies"
  | "top-rated-movies"
  | "now-playing"
  | "coming-soon"
  | "in-demand-tv"
  | "hidden-gems-tv"
  | "popular-tv"
  | "top-rated-tv"
  | "on-the-air";

export const HOME_CATALOGS: { id: CatalogId; title: string; mediaType?: "movie" | "tv" }[] = [
  { id: "popular-movies", title: "Popular Movies", mediaType: "movie" },
  { id: "trending", title: "Trending This Week" },
  { id: "in-demand-movies", title: "In Demand Movies", mediaType: "movie" },
  { id: "hidden-gems-movies", title: "Hidden Gems · Movies", mediaType: "movie" },
  { id: "top-rated-movies", title: "Top Rated Movies", mediaType: "movie" },
  { id: "now-playing", title: "Now Playing in Theaters", mediaType: "movie" },
  { id: "coming-soon", title: "Coming Soon", mediaType: "movie" },
  { id: "in-demand-tv", title: "In Demand TV", mediaType: "tv" },
  { id: "hidden-gems-tv", title: "Hidden Gems · TV", mediaType: "tv" },
  { id: "popular-tv", title: "Popular TV Shows", mediaType: "tv" },
  { id: "top-rated-tv", title: "Top Rated TV Shows", mediaType: "tv" },
  { id: "on-the-air", title: "On The Air", mediaType: "tv" },
];

export function getCatalog(id: string) {
  return HOME_CATALOGS.find((catalog) => catalog.id === id);
}