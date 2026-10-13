import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getTvDetails,
  getImageUrl,
  getTitle,
  getYear,
  getWatchProviders,
  MovieDetails,
} from "@/lib/tmdb";
import MovieRow from "@/components/MovieRow";
import WatchlistButton from "@/components/WatchlistButton";
import WhereToWatch from "@/components/WhereToWatch";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ region?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const show = await getTvDetails(Number(id));
    return { title: `${getTitle(show)} – The Movie Ground`, description: show.overview?.slice(0, 160) };
  } catch {
    return { title: "TV Show – The Movie Ground" };
  }
}

export default async function TvPage({ params, searchParams }: Props) {
  const [{ id }, search] = await Promise.all([params, searchParams]);
  let show: MovieDetails;
  try {
    show = await getTvDetails(Number(id));
  } catch {
    notFound();
  }

  const trailer = show.videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  const cast = show.credits?.cast?.slice(0, 12) || [];
  const similar = show.similar?.results || show.recommendations?.results || [];
  const year = getYear(show);
  const requestedRegion = search.region?.toUpperCase() || "US";
  const region = /^[A-Z]{2}$/.test(requestedRegion) ? requestedRegion : "US";
  const providers = await getWatchProviders("tv", show.id)
    .then((data) => data.results[region] || null)
    .catch(() => null);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[50vh] min-h-[360px] max-h-[560px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(show.backdrop_path || show.poster_path, "w1280")}
          alt={getTitle(show)}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      <div className="relative -mt-48 mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row">
          <div className="mx-auto w-48 shrink-0 md:mx-0 md:w-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(show.poster_path, "w500")}
              alt={getTitle(show)}
              className="w-full rounded-xl shadow-2xl shadow-black/80"
            />
          </div>

          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">{getTitle(show)}</h1>
              {show.tagline && <p className="mt-2 italic text-zinc-400">{show.tagline}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              {year && <span>{year}</span>}
              {show.number_of_seasons && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span>
                    {show.number_of_seasons} Season{show.number_of_seasons > 1 ? "s" : ""}
                  </span>
                </>
              )}
              {show.vote_average > 0 && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="font-semibold text-yellow-400">★ {show.vote_average.toFixed(1)}</span>
                </>
              )}
              {show.status && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span>{show.status}</span>
                </>
              )}
            </div>

            {show.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs text-zinc-200"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="max-w-3xl text-base leading-relaxed text-zinc-200 md:text-lg">{show.overview}</p>

            <div className="flex flex-wrap gap-3">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </a>
              )}
              <WatchlistButton
                item={{
                  id: show.id,
                  title: getTitle(show),
                  poster_path: show.poster_path,
                  media_type: "tv",
                  year: year || undefined,
                  vote_average: show.vote_average,
                }}
              />
            </div>

            <WhereToWatch
              availability={providers}
              detailPath={`/tv/${show.id}`}
              region={region}
              title={getTitle(show)}
            />
          </div>
        </div>

        {cast.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-xl font-bold text-white md:text-2xl">Cast</h2>
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
              {cast.map((person) => (
                <div key={person.id} className="w-28 shrink-0 text-center">
                  <div className="mx-auto mb-2 h-28 w-28 overflow-hidden rounded-full bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(person.profile_path, "w300")}
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="line-clamp-1 text-sm font-medium text-white">{person.name}</p>
                  <p className="line-clamp-1 text-xs text-zinc-500">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <div className="-mx-4 mt-14 sm:-mx-6 lg:-mx-8">
            <MovieRow title="More Like This" items={similar} mediaType="tv" />
          </div>
        )}

        <div className="mt-10">
          <Link href="/" className="text-sm text-red-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
