import Hero from "@/components/Hero";
import HomeCatalog from "@/components/HomeCatalog";
import {
  getTrending,
  getPopular,
  getMovieDetails,
  getTvDetails,
  hasTmdbApiKey,
  Movie,
} from "@/lib/tmdb";

export const revalidate = 3600;

function CatalogUnavailable() {
  return (
    <div className="flex h-[50vh] items-center justify-center text-zinc-400">
      <div className="space-y-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-white">The Movie Ground</h1>
        <p>The catalog is temporarily unavailable. Please try again later.</p>
      </div>
    </div>
  );
}

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    return fallback;
  }
}

export default async function HomePage() {
  if (!hasTmdbApiKey()) {
    return (
      <div className="min-h-screen bg-black">
        <CatalogUnavailable />
      </div>
    );
  }

  const trending = await safeFetch(() => getTrending("all", "week"), { results: [] as Movie[] });
  const heroItem = trending.results[0] || (await safeFetch(() => getPopular("movie"), { results: [] as Movie[] })).results[0];
  const heroType = heroItem?.media_type || (heroItem?.title ? "movie" : "tv");
  const heroDetails = heroItem
    ? await (heroType === "tv" ? getTvDetails(heroItem.id) : getMovieDetails(heroItem.id)).catch(() => null)
    : null;
  const heroTrailer = heroDetails?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  ) || heroDetails?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Teaser"
  );

  return (
    <div className="min-h-screen bg-black">
      {heroItem ? (
        <Hero item={heroItem} trailerKey={heroTrailer?.key} />
      ) : (
        <CatalogUnavailable />
      )}

      {heroItem && <HomeCatalog />}
    </div>
  );
}
