import Link from "next/link";
import { Movie, getImageUrl, getTitle, getYear } from "@/lib/tmdb";

type Props = {
  item: Movie;
  mediaType?: "movie" | "tv";
  grid?: boolean;
};

export default function MovieCard({ item, mediaType, grid = false }: Props) {
  const type = mediaType || item.media_type || (item.title ? "movie" : "tv");
  const href = type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
  const title = getTitle(item);
  const year = getYear(item);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <Link href={href} className={`group relative min-w-0 ${grid ? "w-full" : "w-[140px] flex-shrink-0 sm:w-[160px] md:w-[180px] lg:w-[200px]"}`}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-red-900/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(item.poster_path, "w500")}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {rating && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded">
            ★ {rating}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">{title}</h3>
          {year && <p className="text-gray-300 text-xs mt-1">{year}</p>}
        </div>
      </div>
    </Link>
  );
}
