"use client";

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  year?: string;
  vote_average?: number;
};

const KEY = "tmg_watchlist";

export function getWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWatchlist(item: WatchlistItem) {
  const list = getWatchlist();
  if (list.some((i) => i.id === item.id && i.media_type === item.media_type)) return list;
  const next = [item, ...list].slice(0, 200);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function removeFromWatchlist(id: number, mediaType: "movie" | "tv") {
  const next = getWatchlist().filter((i) => !(i.id === id && i.media_type === mediaType));
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function isInWatchlist(id: number, mediaType: "movie" | "tv") {
  return getWatchlist().some((i) => i.id === id && i.media_type === mediaType);
}
