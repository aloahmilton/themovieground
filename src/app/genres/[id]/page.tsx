import MovieCard from "@/components/MovieCard";
import LanguageFilter from "@/components/LanguageFilter";
import { discoverWithFilters } from "@/lib/tmdb";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string; name?: string; page?: string; lang?: string }>;
};

export default async function GenreDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const type = (sp.type === "tv" ? "tv" : "movie") as "movie" | "tv";
  const name = sp.name || "Genre";
  const page = Number(sp.page) || 1;
  const lang = sp.lang;

  const data = await discoverWithFilters(type, {
    genreId: Number(id),
    language: lang,
    page,
  }).catch(() => ({ results: [], total_pages: 0 }));

  const results = data.results || [];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/genres" className="text-red-400 text-sm hover:underline mb-2 inline-block">
            ← All Genres
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {name}{" "}
            <span className="text-zinc-500 text-lg font-normal">
              ({type === "tv" ? "TV" : "Movies"})
              {lang ? ` · ${lang.toUpperCase()}` : ""}
            </span>
          </h1>
          <Suspense fallback={null}>
            <LanguageFilter />
          </Suspense>
        </div>

        {results.length === 0 ? (
          <p className="text-zinc-500 py-16 text-center">
            No titles found for this genre{lang ? " and language" : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((item) => (
              <MovieCard key={item.id} item={item} mediaType={type} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
