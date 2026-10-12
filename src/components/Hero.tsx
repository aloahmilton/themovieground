import Link from "next/link";
import { Movie, getImageUrl, getTitle, getYear } from "@/lib/tmdb";

type Props = {
  item: Movie;
};

export default function Hero({ item }: Props) {
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
          className="w-full h-full object-cover object-center"
        />
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
            <Link
              href={href}
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              More Info
            </Link>
            <Link
              href={href}
              className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-md backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
