import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  getNowPlaying,
  getOnTheAir,
  getHiddenGems,
  getInDemand,
  Movie,
} from "@/lib/tmdb";

export const revalidate = 3600;

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    return fallback;
  }
}

export default async function HomePage() {
  const empty = { results: [] as Movie[] };

  const [
    trending,
    popularMovies,
    topRatedMovies,
    upcoming,
    nowPlaying,
    popularTv,
    topRatedTv,
    onAir,
    hiddenMovies,
    hiddenTv,
    demandMovies,
    demandTv,
  ] = await Promise.all([
    safeFetch(() => getTrending("all", "week"), empty),
    safeFetch(() => getPopular("movie"), empty),
    safeFetch(() => getTopRated("movie"), empty),
    safeFetch(() => getUpcoming(), empty),
    safeFetch(() => getNowPlaying(), empty),
    safeFetch(() => getPopular("tv"), empty),
    safeFetch(() => getTopRated("tv"), empty),
    safeFetch(() => getOnTheAir(), empty),
    safeFetch(() => getHiddenGems("movie"), empty),
    safeFetch(() => getHiddenGems("tv"), empty),
    safeFetch(() => getInDemand("movie"), empty),
    safeFetch(() => getInDemand("tv"), empty),
  ]);

  const heroItem = trending.results[0] || popularMovies.results[0];

  return (
    <div className="min-h-screen bg-black">
      {heroItem ? (
        <Hero item={heroItem} />
      ) : (
        <div className="h-[50vh] flex items-center justify-center text-zinc-400">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-3xl font-bold text-white">The Movie Ground</h1>
            <p>Add your free TMDB API key to start exploring.</p>
            <p className="text-sm">
              Get one at{" "}
              <a
                href="https://www.themoviedb.org/settings/api"
                className="text-red-400 underline"
                target="_blank"
                rel="noreferrer"
              >
                themoviedb.org/settings/api
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="relative -mt-16 z-10 space-y-2 pb-8">
        <MovieRow title="Trending This Week" items={trending.results.slice(0, 20)} />
        <MovieRow title="🔥 In Demand" items={demandMovies.results} mediaType="movie" />
        <MovieRow title="💎 Hidden Gems – Movies" items={hiddenMovies.results} mediaType="movie" />
        <MovieRow title="Popular Movies" items={popularMovies.results} mediaType="movie" />
        <MovieRow title="Top Rated Movies" items={topRatedMovies.results} mediaType="movie" />
        <MovieRow title="Now Playing in Theaters" items={nowPlaying.results} mediaType="movie" />
        <MovieRow title="Coming Soon" items={upcoming.results} mediaType="movie" />
        <MovieRow title="🔥 In Demand TV" items={demandTv.results} mediaType="tv" />
        <MovieRow title="💎 Hidden Gems – TV" items={hiddenTv.results} mediaType="tv" />
        <MovieRow title="Popular TV Shows" items={popularTv.results} mediaType="tv" />
        <MovieRow title="Top Rated TV Shows" items={topRatedTv.results} mediaType="tv" />
        <MovieRow title="On The Air" items={onAir.results} mediaType="tv" />
      </div>
    </div>
  );
}
