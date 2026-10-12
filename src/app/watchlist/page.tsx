"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWatchlist, removeFromWatchlist, WatchlistItem } from "@/lib/watchlist";
import { getImageUrl } from "@/lib/tmdb";

export default function WatchlistPage() {
  const [list, setList] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    setList(getWatchlist());
  }, []);

  const remove = (id: number, mediaType: "movie" | "tv") => {
    const next = removeFromWatchlist(id, mediaType);
    setList(next);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "the-movie-ground-watchlist.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Watchlist</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <p className="text-zinc-400">
            {list.length === 0
              ? "Your list is empty. Add titles from any movie or TV page."
              : `${list.length} title${list.length > 1 ? "s" : ""} saved`}
          </p>
          {list.length > 0 && (
            <button
              onClick={exportJson}
              className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md border border-zinc-700 transition self-start"
            >
              Export JSON
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 mb-6">Start building your list from the home page or search.</p>
            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              Explore Titles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {list.map((item) => (
              <div key={`${item.media_type}-${item.id}`} className="group relative">
                <Link href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(item.poster_path, "w500")}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-white line-clamp-2">{item.title}</h3>
                  {item.year && <p className="text-xs text-zinc-500">{item.year}</p>}
                </Link>
                <button
                  onClick={() => remove(item.id, item.media_type)}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label="Remove"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
