"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string; icon: string };

function SidebarLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        active ? "bg-red-600/15 text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className={`h-5 w-5 ${active ? "text-red-400" : "text-zinc-500"}`} aria-hidden="true">
        {item.icon === "home" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        {item.icon === "movie" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.7" /><path d="M7 4v4m5-4v4m5-4v4M7 16v4m5-4v4m5-4v4M3 12h18" strokeWidth="1.7" /></svg>}
        {item.icon === "tv" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.7" /><path d="m9 2 3 3 3-3m-7 17v3m6-3v3m-8 0h10" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        {item.icon === "grid" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="8" height="8" rx="1.5" strokeWidth="1.7" /><rect x="13" y="3" width="8" height="5" rx="1.5" strokeWidth="1.7" /><rect x="13" y="10" width="8" height="11" rx="1.5" strokeWidth="1.7" /><rect x="3" y="13" width="8" height="8" rx="1.5" strokeWidth="1.7" /></svg>}
        {item.icon === "bookmark" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z" strokeWidth="1.7" strokeLinejoin="round" /></svg>}
        {item.icon === "ball" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="1.7" /><path d="m12 7 3 2-1 4h-4L9 9zm0 6 3 2m-7-1 3-2m5-6-1 3m-6-3 1 3m0 6 1 3m5-3-1 3" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
        {item.icon === "flag" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 21V4m0 1c6-4 8 4 14 0v11c-6 4-8-4-14 0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        {item.icon === "person" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="1.7" /><path d="M4 21a8 8 0 0 1 16 0" strokeWidth="1.7" strokeLinecap="round" /></svg>}
        {item.icon === "heart" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.8 8.6c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4Z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

function SearchSidebarLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const searchParams = useSearchParams();
  const itemType = new URLSearchParams(item.href.split("?")[1]).get("type");
  return <SidebarLink item={item} active={searchParams.get("type") === itemType} onClick={onClick} />;
}

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

  const navGroups = [
    {
      label: "Discover",
      items: [
        { href: "/", label: "Home", icon: "home" },
        { href: "/search", label: "Explore All", icon: "grid" },
        { href: "/search?type=movie", label: "Movies", icon: "movie" },
        { href: "/search?type=tv", label: "TV Shows", icon: "tv" },
        { href: "/genres", label: "Genres", icon: "grid" },
      ],
    },
    {
      label: "My Library",
      items: [{ href: "/watchlist", label: "Watchlist", icon: "bookmark" }],
    },
    {
      label: "Community",
      items: [
        { href: "/about", label: "About Aloah", icon: "person" },
        { href: "/donate", label: "Donate", icon: "heart" },
      ],
    },
    {
      label: "Sports",
      items: [
        { href: "/sports", label: "All Sports", icon: "ball" },
        { href: "/sports/f1", label: "Formula 1", icon: "flag" },
        { href: "/sports/4328?name=English%20Premier%20League", label: "Premier League", icon: "ball" },
        { href: "/sports/4335?name=Spanish%20La%20Liga", label: "La Liga", icon: "ball" },
        { href: "/sports/4332?name=Italian%20Serie%20A", label: "Serie A", icon: "ball" },
        { href: "/sports/4331?name=German%20Bundesliga", label: "Bundesliga", icon: "ball" },
        { href: "/sports/4334?name=French%20Ligue%201", label: "Ligue 1", icon: "ball" },
        { href: "/sports/4380?name=NBA", label: "NBA", icon: "ball" },
        { href: "/sports/4391?name=NFL", label: "NFL", icon: "ball" },
        { href: "/sports/4424?name=MLB", label: "MLB", icon: "ball" },
      ],
    },
  ];

  const navItems = navGroups.flatMap((group) => group.items);

  const isActive = (href: string) => {
    const route = href.split("?")[0];
    return route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`);
  };

  const handleNav = () => setMenuOpen(false);

  const searchForm = (className: string) => (
    <form onSubmit={handleSearch} className={className}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies & TV..."
          aria-label="Search movies and TV shows"
          className="w-full bg-white/[0.06] border border-white/10 rounded-md py-2.5 pl-3 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-transparent transition-all"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white" aria-label="Search">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );

  const navLink = (item: (typeof navItems)[number]) => {
    if (item.href.startsWith("/search")) {
      return (
        <Suspense key={item.href} fallback={<SidebarLink item={item} active={false} onClick={handleNav} />}>
          <SearchSidebarLink item={item} onClick={handleNav} />
        </Suspense>
      );
    }

    const active = isActive(item.href);
    return (
      <SidebarLink key={item.href} item={item} active={active} onClick={handleNav} />
    );
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-white/[0.08] bg-[#0b0b0d] px-4 py-6 lg:flex">
        <Link href="/" aria-label="The Movie Ground home" className="mb-4 flex justify-center px-2">
          <Image src="/logo.png" alt="The Movie Ground" width={72} height={72} className="h-16 w-16 object-contain" />
        </Link>

        <nav aria-label="Main navigation" className="flex-1 space-y-7 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">{group.label}</p>
              <div className="space-y-1">{group.items.map((item) => navLink(item))}</div>
            </div>
          ))}
        </nav>

      </aside>

      <header className="fixed left-64 right-0 top-0 z-40 hidden h-16 items-center justify-end bg-gradient-to-b from-black/95 via-black/80 to-transparent px-8 lg:flex">
        {searchForm("w-full max-w-sm")}
      </header>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0b0b0d] lg:hidden">
        <div className="mx-auto flex h-14 items-center justify-between px-3 sm:h-16 sm:px-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image src="/logo.png" alt="The Movie Ground" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
            <span className="hidden text-lg font-bold text-white group-hover:text-red-400 transition-colors sm:inline">
              The Movie Ground
            </span>
            <span className="text-lg font-bold text-white sm:hidden">TMG</span>
          </Link>

          {searchForm("hidden max-w-[220px] flex-1 sm:mx-4 sm:block")}

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
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.08] px-3 pb-4 pt-3 sm:px-6">
            {searchForm("mb-3 sm:hidden")}
            <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-1">
              {navItems.map((item) => navLink(item))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
