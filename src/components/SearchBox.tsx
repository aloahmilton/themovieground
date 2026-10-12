"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Suggestion = {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  year: string;
  posterUrl: string;
};

type Props = { className?: string; onSearch?: () => void };

export default function SearchBox({ className = "", onSearch }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      setOpen(false);
      setLoading(false);
      setFailed(false);
      return;
    }

    const controller = new AbortController();
    setOpen(true);
    setLoading(true);
    setFailed(false);
    setActiveIndex(-1);

    const timeout = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal })
        .then(async (response) => {
          if (!response.ok) throw new Error("Suggestion request failed");
          return response.json() as Promise<{ results: Suggestion[] }>;
        })
        .then((data) => setSuggestions(data.results))
        .catch(() => {
          if (!controller.signal.aborted) {
            setSuggestions([]);
            setFailed(true);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const goToSearch = (term: string) => {
    if (!term.trim()) return;
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
    setOpen(false);
    onSearch?.();
  };

  const chooseSuggestion = (suggestion: Suggestion) => {
    router.push(`/${suggestion.mediaType}/${suggestion.id}`);
    setQuery("");
    setOpen(false);
    onSearch?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % suggestions.length);
    }
    if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    }
    if (event.key === "Enter" && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault();
      chooseSuggestion(suggestions[activeIndex]);
    }
  };

  const listId = "title-search-suggestions";
  const activeSuggestionId = activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        goToSearch(query);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      className={`relative w-full ${className}`}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => query.trim().length >= 2 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search movies & TV..."
        aria-label="Search movies and TV shows"
        aria-autocomplete="list"
        aria-expanded={open && query.trim().length >= 2}
        aria-controls={listId}
        aria-activedescendant={activeSuggestionId}
        className="w-full rounded-md border border-white/10 bg-white/[0.06] py-2.5 pl-3 pr-10 text-sm text-white placeholder-zinc-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500/70"
      />
      <button type="submit" className="absolute right-3 top-3 text-zinc-400 hover:text-white" aria-label="Search">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {open && query.trim().length >= 2 && (
        <div id={listId} role="listbox" aria-label="Title suggestions" className="absolute left-0 right-0 top-full z-[80] mt-2 max-h-[min(65vh,24rem)] overflow-y-auto rounded-lg border border-white/10 bg-[#111113]/98 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          {loading && <p className="px-3 py-3 text-sm text-zinc-400">Searching titles...</p>}
          {!loading && failed && <p className="px-3 py-3 text-sm text-zinc-400">Suggestions unavailable. Press Enter to search.</p>}
          {!loading && !failed && suggestions.length === 0 && <p className="px-3 py-3 text-sm text-zinc-400">No matching titles.</p>}
          {!loading && suggestions.map((suggestion, index) => (
            <Link
              key={`${suggestion.mediaType}-${suggestion.id}`}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              href={`/${suggestion.mediaType}/${suggestion.id}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setQuery("");
                setOpen(false);
                onSearch?.();
              }}
              className={`flex items-center gap-3 rounded-md px-2 py-2 transition-colors ${
                activeIndex === index ? "bg-white/10" : "hover:bg-white/[0.06]"
              }`}
            >
              <Image src={suggestion.posterUrl} alt="" width={36} height={52} className="h-[52px] w-9 shrink-0 rounded-sm bg-zinc-800 object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-white">{suggestion.title}</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  {suggestion.mediaType === "tv" ? "TV show" : "Movie"}{suggestion.year ? ` · ${suggestion.year}` : ""}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
}