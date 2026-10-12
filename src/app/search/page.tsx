import MovieCard from "@/components/MovieCard";
import LanguageFilter from "@/components/LanguageFilter";
import { searchMulti, getPopular, discoverWithFilters, Movie } from "@/lib/tmdb";
import { getCatalogPage } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalogs";
import CatalogResults from "@/components/CatalogResults";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ q?: string; type?: string; page?: string; lang?: string; list?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const typeFilter = params.type as "movie" | "tv" | undefined;
  const page = Number(params.page) || 1;
  const lang = params.lang;
  const catalog = params.list ? getCatalog(params.list) : undefined;

  let results: Movie[] = [];
  let totalResults = 0;
  let title = "Explore";

  if (catalog && !query) {
    results = await getCatalogPage(catalog.id, page).catch(() => []);
    title = catalog.title;
  } else if (query) {
    const data = await searchMulti(query, page).catch(() => ({ results: [], total_results: 0 }));
    results = data.results.filter((r) => {
      if (!r.media_type || (r.media_type !== "movie" && r.media_type !== "tv")) return false;
      if (typeFilter === "movie") return r.media_type === "movie";
      if (typeFilter === "tv") return r.media_type === "tv";
      return true;
    });
    totalResults = data.total_results;
    title = `Results for “${query}”`;
  } else if (typeFilter === "movie" || typeFilter === "tv") {
    const data = lang
      ? await discoverWithFilters(typeFilter, { language: lang, page }).catch(() => ({ results: [], total_pages: 0 }))
      : await getPopular(typeFilter, page).catch(() => ({ results: [] }));
    results = data.results;
    title = typeFilter === "movie" ? "Popular Movies" : "Popular TV Shows";
    if (lang) title += ` · ${lang.toUpperCase()}`;
  } else {
    const [movies, tv] = await Promise.all([
      getPopular("movie").catch(() => ({ results: [] })),
      getPopular("tv").catch(() => ({ results: [] })),
    ]);
    results = [...movies.results.slice(0, 12), ...tv.results.slice(0, 12)];
    title = "Explore Movies & TV";
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
              {query && (
                <p className="text-zinc-400 mt-1">
                  {totalResults > 0 ? `${totalResults.toLocaleString()} results` : "No results found"}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Link
                href={query ? `/search?q=${encodeURIComponent(query)}${lang ? `&lang=${lang}` : ""}` : `/search${lang ? `?lang=${lang}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  !typeFilter ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                All
              </Link>
              <Link
                href={query ? `/search?q=${encodeURIComponent(query)}&type=movie${lang ? `&lang=${lang}` : ""}` : `/search?type=movie${lang ? `&lang=${lang}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  typeFilter === "movie" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                Movies
              </Link>
              <Link
                href={query ? `/search?q=${encodeURIComponent(query)}&type=tv${lang ? `&lang=${lang}` : ""}` : `/search?type=tv${lang ? `&lang=${lang}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  typeFilter === "tv" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                TV Shows
              </Link>
            </div>
          </div>

          <Suspense fallback={null}>
            <LanguageFilter />
          </Suspense>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg">Nothing found. Try a different search or language.</p>
            <Link href="/" className="mt-4 inline-block text-red-400 hover:underline">
              Back to Home
            </Link>
          </div>
        ) : catalog && !query ? (
          <CatalogResults catalogId={catalog.id} initialItems={results} mediaType={catalog.mediaType} page={page} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map((item) => (
              <MovieCard key={`${item.id}-${item.media_type || typeFilter}`} item={item} mediaType={typeFilter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
