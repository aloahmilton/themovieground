"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { POPULAR_LANGUAGES } from "@/lib/tmdb";

export default function LanguageFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("lang") || "";

  const setLang = (code: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (code) params.set("lang", code);
    else params.delete("lang");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

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
