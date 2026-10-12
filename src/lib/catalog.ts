import {
  getHiddenGems,
  getInDemand,
  getNowPlaying,
  getOnTheAir,
  getPopular,
  getTopRated,
  getTrending,
  getUpcoming,
  Movie,
} from "@/lib/tmdb";
import { CatalogId, getCatalog } from "@/lib/catalogs";

export async function getCatalogPage(id: CatalogId, page = 1): Promise<Movie[]> {
  switch (id) {
    case "trending":
      return (await getTrending("all", "week", page)).results;
    case "popular-movies":
      return (await getPopular("movie", page)).results;
    case "in-demand-movies":
      return (await getInDemand("movie", page)).results;
    case "hidden-gems-movies":
      return (await getHiddenGems("movie", page)).results;
    case "top-rated-movies":
      return (await getTopRated("movie", page)).results;
    case "now-playing":
      return (await getNowPlaying(page)).results;
    case "coming-soon":
      return (await getUpcoming(page)).results;
    case "in-demand-tv":
      return (await getInDemand("tv", page)).results;
    case "hidden-gems-tv":
      return (await getHiddenGems("tv", page)).results;
    case "popular-tv":
      return (await getPopular("tv", page)).results;
    case "top-rated-tv":
      return (await getTopRated("tv", page)).results;
    case "on-the-air":
      return (await getOnTheAir(page)).results;
  }
}