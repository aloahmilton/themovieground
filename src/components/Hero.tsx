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
  const rating = item.vote_average ? Math.round(item.vote_average * 10) : null;

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Billboard height: tall on desktop, solid on mobile */}
      <div className="relative h-[min(92vw,56vh)] min-h-[340px] w-full sm:h-[58vh] sm:min-h-[420px] md:h-[68vh] md:min-h-[520px] lg:h-[78vh] lg:max-h-[820px]">
        {/* Backdrop — Netflix uses stills for the billboard */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageUrl(item.backdrop_path || item.poster_path, "original")}
            alt=""
            className="h-full w-full object-cover object-[center_20%]"
            fetchPriority="high"
          />

          {/* Soft video layer on large screens only (optional trailer under image feel) */}
          {trailerKey && (
            <div className="pointer-events-none absolute inset-0 hidden opacity-90 lg:block">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`}
                title=""
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                tabIndex={-1}
                className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              />
            </div>
          )}

          {/* Netflix-style vignettes */}
          {/* Left dark edge for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent md:w-[70%]" />
          {/* Bottom fade into page */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/70 to-transparent" />
          {/* Top fade under nav */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
          {/* Right soft edge */}
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-black/40 to-transparent md:block" />
        </div>

        {/* Billboard copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-4 pb-10 sm:px-6 sm:pb-14 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
          <div className="w-full max-w-[min(100%,520px)] space-y-3 sm:space-y-4 md:max-w-[580px] md:space-y-5">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              {rating != null && rating > 0 && (
                <span className="font-semibold text-[#46d369]">{rating}% Match</span>
              )}
              {year && <span className="text-zinc-300">{year}</span>}
              <span className="rounded-[2px] border border-white/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-200 sm:text-xs">
                {type === "tv" ? "Series" : "Movie"}
              </span>
              <span className="rounded-[2px] border border-white/40 px-1.5 py-0.5 text-[10px] text-zinc-300 sm:text-xs">
                HD
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[2rem] font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {title}
            </h1>

            {/* Synopsis */}
            {item.overview && (
              <p className="line-clamp-3 text-sm leading-snug text-zinc-100/95 drop-shadow sm:text-base md:line-clamp-4 md:text-[1.05rem] md:leading-relaxed">
                {item.overview}
              </p>
            )}

            {/* Actions — Netflix Play + More Info */}
            <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-[4px] bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-white/85 sm:px-7 sm:py-3 sm:text-base"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </Link>

              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-[4px] bg-zinc-500/70 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-zinc-500/50 sm:px-7 sm:py-3 sm:text-base"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6m0-9v.01" strokeLinecap="round" />
                </svg>
                More Info
              </Link>

              {trailerKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] border border-white/25 bg-transparent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-5 sm:py-3"
                >
                  Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extra fade so rows blend under the billboard */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
