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
    <section className="relative h-[70vh] min-h-[420px] max-h-[720px] w-full overflow-hidden">
      {/* Full-bleed banner media */}
      <div className="absolute inset-0">
        {trailerKey ? (
          <div className="absolute inset-0 scale-110">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
              title={`${title} trailer`}
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(item.backdrop_path || item.poster_path, "w1280")}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        )}
        {/* Gradients so text stays readable over video/image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content anchored to bottom-left of banner */}
      <div className="relative mx-auto flex h-full max-w-[1600px] items-end px-4 pb-16 sm:px-6 md:px-8 md:pb-20">
        <div className="max-w-2xl space-y-4 md:space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
            {year && <span>{year}</span>}
            {rating && (
              <>
                <span className="text-gray-500">•</span>
                <span className="font-medium text-yellow-400">★ {rating}</span>
              </>
            )}
            <span className="text-gray-500">•</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
              {type === "tv" ? "TV Series" : "Movie"}
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="line-clamp-3 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
            {item.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              More Info
            </Link>
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/15 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                Watch Trailer
              </a>
            )}
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Where to Watch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
