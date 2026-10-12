import MovieCard from "./MovieCard";
import { Movie } from "@/lib/tmdb";

type Props = {
  title: string;
  items: Movie[];
  mediaType?: "movie" | "tv";
};

export default function MovieRow({ title, items, mediaType }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="relative group/row">
        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4 snap-x">
          {items.map((item) => (
            <div key={`${item.id}-${item.media_type || mediaType}`} className="snap-start">
              <MovieCard item={item} mediaType={mediaType} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
