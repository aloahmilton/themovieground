import Link from "next/link";
import { getGenres } from "@/lib/tmdb";

export const revalidate = 86400;

export default async function GenresPage() {
  const [movieGenres, tvGenres] = await Promise.all([
    getGenres("movie").catch(() => ({ genres: [] })),
    getGenres("tv").catch(() => ({ genres: [] })),
  ]);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse by Genre</h1>
        <p className="text-zinc-400 mb-10">Explore movies and TV shows by category</p>

        <section className="mb-14">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded-full" />
            Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {movieGenres.genres.map((g) => (
              <Link
                key={g.id}
                href={`/genres/${g.id}?type=movie&name=${encodeURIComponent(g.name)}`}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-5 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/20"
              >
                <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                  {g.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-red-600 rounded-full" />
            TV Shows
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {tvGenres.genres.map((g) => (
              <Link
                key={g.id}
                href={`/genres/${g.id}?type=tv&name=${encodeURIComponent(g.name)}`}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 p-5 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/20"
              >
                <span className="text-white font-medium group-hover:text-red-400 transition-colors">
                  {g.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
