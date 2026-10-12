"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "@/components/MovieCard";
import type { CatalogId } from "@/lib/catalogs";
import type { Movie } from "@/lib/tmdb";

type Props = {
  catalogId: CatalogId;
  initialItems: Movie[];
  mediaType?: "movie" | "tv";
  page: number;
};

export default function CatalogResults({ catalogId, initialItems, mediaType, page: initialPage }: Props) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialItems.length >= 20);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loading) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setLoading(true);

      fetch(`/api/catalog?list=${catalogId}&page=${page + 1}`)
        .then(async (response) => {
          if (!response.ok) throw new Error("Could not load more titles");
          return response.json() as Promise<{ results: Movie[]; hasMore: boolean }>;
        })
        .then((data) => {
          setItems((current) => {
            const known = new Set(current.map((item) => item.id));
            return [...current, ...data.results.filter((item) => !known.has(item.id))];
          });
          setPage((current) => current + 1);
          setHasMore(data.hasMore);
        })
        .catch(() => setHasMore(false))
        .finally(() => setLoading(false));
    }, { rootMargin: "500px 0px" });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [catalogId, hasMore, loading, page]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-6">
        {items.map((item) => (
          <MovieCard key={`${item.media_type || mediaType}-${item.id}`} item={item} mediaType={mediaType} grid />
        ))}
      </div>
      {loading && <p className="py-8 text-center text-sm text-zinc-500">Loading more titles...</p>}
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />
    </>
  );
}