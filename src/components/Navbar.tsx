"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMenuOpen(false);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/search?type=movie", label: "Movies" },
    { href: "/search?type=tv", label: "TV Shows" },
    { href: "/genres", label: "Genres" },
    { href: "/sports", label: "Sports" },
    { href: "/watchlist", label: "My List" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/80 to-transparent backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/50">
              <span className="text-white font-black text-base sm:text-lg">M</span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors hidden xs:inline">
              The Movie Ground
            </span>
            <span className="text-lg font-bold text-white xs:hidden">TMG</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.split("?")[0]))
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden sm:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies & TV..."
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" aria-label="Search">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <button className="lg:hidden p-2 text-white -mr-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-white/10 pt-3">
            <form onSubmit={handleSearch} className="px-1 mb-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies & TV..."
                className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </form>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.split("?")[0]))
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
