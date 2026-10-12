"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { HOME_CATALOGS } from "@/lib/catalogs";
import type { Movie } from "@/lib/tmdb";

function CatalogSection({
  id,
  title,
  mediaType,
}: {
  id: string;
  title: string;
  mediaType?: "movie" | "tv";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [items, setItems] = useState<Movie[]>([]);
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || requested) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setRequested(true);

      fetch(`/api/catalog?list=${encodeURIComponent(id)}&page=1`)
        .then(async (response) => {
          if (!response.ok) throw new Error("Catalog unavailable");
          return response.json() as Promise<{ results: Movie[] }>;
        })
        .then((data) => {
          setItems(data.results.slice(0, 12));
          setLoaded(true);
        })
        .catch(() => setFailed(true));
    }, { rootMargin: "500px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, [id, requested]);

  return (
    <section
      id={id === "popular-movies" ? "most-watched" : undefined}
      ref={sectionRef}
      className="mb-12 scroll-mt-24"
      aria-labelledby={`catalog-${id}`}
    >
      <div className="mb-4 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <h2 id={`catalog-${id}`} className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        <Link
          href={`/search?list=${id}`}
          className="shrink-0 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          View All <span aria-hidden="true">→</span>
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 px-4 sm:grid-cols-4 sm:gap-4 sm:px-6 lg:px-8 xl:grid-cols-6">
          {items.map((item, index) => (
            <div key={`${item.id}-${item.media_type || mediaType}`} className={index >= 6 ? "hidden sm:block" : ""}>
              <MovieCard item={item} mediaType={mediaType} grid />
            </div>
          ))}
        </div>
      ) : failed ? (
        <p className="px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">This category could not load.</p>
      ) : loaded ? (
        <p className="px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">No titles found in this category.</p>
      ) : requested ? (
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6 lg:grid-cols-6 lg:px-8" aria-label={`Loading ${title}`}>
          {Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-[2/3] animate-pulse rounded-md bg-zinc-900" />)}
        </div>
      ) : (
        <div className="h-2" aria-hidden="true" />
      )}
    </section>
  );
}

export default function HomeCatalog() {
  return (
    <div className="relative z-10 -mt-10 space-y-2 pb-8">
      {HOME_CATALOGS.map((catalog) => <CatalogSection key={catalog.id} {...catalog} />)}
    </div>
  );
}