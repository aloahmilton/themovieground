import Link from "next/link";
import { Movie, getImageUrl, getTitle, getYear } from "@/lib/tmdb";

type Props = {
  item: Movie;
  trailerKey?: string;
};

export default function Hero({ item, trailerKey }: Props) {
  const type = item.media_type || (item.title ? "movie" : "tv");
  const href = type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
  const title = getTitle(item);
  const year = getYear(item);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <section className="relative h-[52vh] min-h-[360px] max-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(item.backdrop_path || item.poster_path, "w1280")}
          alt={title}
          className={`h-full w-full object-cover object-center ${trailerKey ? "opacity-40" : ""}`}
        />
        {trailerKey && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&modestbranding=1`}
            title={`${title} official trailer preview`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="relative h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 md:pb-24">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            {year && <span>{year}</span>}
            {rating && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-yellow-400 font-medium">★ {rating}</span>
              </>
            )}
            <span className="text-gray-500">•</span>
            <span className="uppercase tracking-wider text-xs font-semibold text-red-400">
              {type === "tv" ? "TV Series" : "Movie"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            {title}
          </h1>

          <p className="text-gray-200 text-base md:text-lg line-clamp-3 max-w-xl leading-relaxed">
            {item.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-200"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </a>
            )}
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              Where to Watch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
