"use client";

import { useEffect, useState } from "react";
import { addToWatchlist, removeFromWatchlist, isInWatchlist, WatchlistItem } from "@/lib/watchlist";

type Props = {
  item: WatchlistItem;
  className?: string;
};

export default function WatchlistButton({ item, className = "" }: Props) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(isInWatchlist(item.id, item.media_type));
  }, [item.id, item.media_type]);

  const toggle = () => {
    if (inList) {
      removeFromWatchlist(item.id, item.media_type);
      setInList(false);
    } else {
      addToWatchlist(item);
      setInList(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 font-semibold px-4 py-2.5 rounded-md transition-colors ${
        inList
          ? "bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600/30"
          : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
      } ${className}`}
      aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
    >
      {inList ? (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
          In Watchlist
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          My List
        </>
      )}
    </button>
  );
}
