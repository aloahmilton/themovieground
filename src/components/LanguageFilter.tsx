"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { POPULAR_LANGUAGES } from "@/lib/tmdb";

export default function LanguageFilter({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("lang") || "";

  const setLang = (code: string) => {
    const targetPath = pathname === "/search" ? pathname : "/search";
    const params = new URLSearchParams(pathname === "/search" ? searchParams.toString() : "");
    if (code) params.set("lang", code);
    else params.delete("lang");
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${targetPath}?${query}` : targetPath);
  };

  if (compact) {
    return (
      <div className="relative w-full">
        <select
          value={current}
          onChange={(event) => setLang(event.target.value)}
          aria-label="Filter by language"
          className="w-full appearance-none rounded-md border border-white/10 bg-white/[0.06] py-2.5 pl-3 pr-8 text-xs font-semibold uppercase text-zinc-200 outline-none transition-colors hover:bg-white/10 focus:ring-2 focus:ring-red-500/70"
        >
          <option value="" className="bg-zinc-900">All languages</option>
          {POPULAR_LANGUAGES.map((language) => (
            <option key={language.code} value={language.code} className="bg-zinc-900">
              {language.name}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-zinc-500 text-sm mr-1">Language:</span>
      <button
        onClick={() => setLang("")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
          !current ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        All
      </button>
      {POPULAR_LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
            current === l.code ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}
