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
  const requestedRegion = search.region?.toUpperCase() || "CM";
  const region = /^[A-Z]{2}$/.test(requestedRegion) ? requestedRegion : "CM";
  const providers = await getWatchProviders("tv", show.id).then((data) => data.results[region] || null).catch(() => null);

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[50vh] min-h-[360px] max-h-[560px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(show.backdrop_path || show.poster_path, "w1280")}
          alt={getTitle(show)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      <div className="relative -mt-48 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(show.poster_path, "w500")}
              alt={getTitle(show)}
              className="w-full rounded-xl shadow-2xl shadow-black/80"
            />
          </div>

          <div className="flex-1 space-y-5">
            <div>

            <WhereToWatch availability={providers} detailPath={`/tv/${show.id}`} region={region} title={getTitle(show)} />
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{getTitle(show)}</h1>
              {show.tagline && <p className="text-zinc-400 italic mt-2">{show.tagline}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              {year && <span>{year}</span>}
              {show.number_of_seasons && (
                <><span className="text-zinc-600">•</span><span>{show.number_of_seasons} Season{show.number_of_seasons > 1 ? "s" : ""}</span></>
              )}
              {show.vote_average > 0 && (
                <><span className="text-zinc-600">•</span><span className="text-yellow-400 font-semibold">★ {show.vote_average.toFixed(1)}</span></>
              )}
              {show.status && (<><span className="text-zinc-600">•</span><span>{show.status}</span></>)}
            </div>

            {show.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-zinc-800/80 text-zinc-200 text-xs rounded-full border border-zinc-700">{g.name}</span>
                ))}
              </div>
            )}

            <p className="text-zinc-200 text-base md:text-lg leading-relaxed max-w-3xl">{show.overview}</p>

            <div className="flex flex-wrap gap-3">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
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
          </div>
        </div>

        {cast.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-5">Cast</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {cast.map((person) => (
                <div key={person.id} className="flex-shrink-0 w-28 text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-zinc-800 mx-auto mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getImageUrl(person.profile_path, "w300")} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-white font-medium line-clamp-1">{person.name}</p>
                  <p className="text-xs text-zinc-500 line-clamp-1">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <div className="mt-14 -mx-4 sm:-mx-6 lg:-mx-8">
            <MovieRow title="More Like This" items={similar} mediaType="tv" />
          </div>
        )}

        <div className="mt-10">
          <Link href="/" className="text-red-400 hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
