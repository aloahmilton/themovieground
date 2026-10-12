"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { isNavItemActive, moreNavGroups, NavItem, primaryNavItems, sportsNavItems } from "@/components/navigation";
import LanguageFilter from "@/components/LanguageFilter";
import SearchBox from "./SearchBox";

function TabLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-2.5 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm ${
        active
          ? "border-white/15 bg-white/10 text-white shadow-inner shadow-white/5"
          : "border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function SearchTabLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const searchParams = useSearchParams();
  const itemType = new URLSearchParams(item.href.split("?")[1]).get("type");
  return <TabLink item={item} active={searchParams.get("type") === itemType} onClick={onClick} />;
}

function MoreLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
        active ? "bg-red-600/15 text-white" : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function SearchMoreLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const searchParams = useSearchParams();
  const itemType = new URLSearchParams(item.href.split("?")[1]).get("type");
  return <MoreLink item={item} active={searchParams.get("type") === itemType} onClick={onClick} />;
}

export default function DesktopTopNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);

  const isActive = (href: string) => isNavItemActive(pathname, href);

  const closeMenus = () => {
    setMoreOpen(false);
    setSportsOpen(false);
  };

  const renderTab = (item: NavItem) => {
    if (item.href.startsWith("/search")) {
      return (
        <Suspense key={item.href} fallback={<TabLink item={item} active={false} onClick={closeMenus} />}>
          <SearchTabLink item={item} onClick={closeMenus} />
        </Suspense>
      );
    }
    return <TabLink key={item.href} item={item} active={isActive(item.href)} onClick={closeMenus} />;
  };

  const renderMoreLink = (item: NavItem) => {
    if (item.href.startsWith("/search")) {
      return (
        <Suspense key={item.href} fallback={<MoreLink item={item} active={false} onClick={closeMenus} />}>
          <SearchMoreLink item={item} onClick={closeMenus} />
        </Suspense>
      );
    }
    return <MoreLink key={item.href} item={item} active={isActive(item.href)} onClick={closeMenus} />;
  };

  const moreIsActive = moreNavGroups.some((group) => group.items.some((item) => isActive(item.href)));
  const sportsIsActive = pathname === "/sports" || pathname.startsWith("/sports/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/10 bg-black/65 shadow-lg shadow-black/20 backdrop-blur-2xl lg:block">
      <div className="relative mx-auto flex h-[72px] max-w-[1600px] items-center gap-2 px-4 xl:gap-4 xl:px-6">
        <Link href="/" aria-label="The Movie Ground home" className="shrink-0">
          <Image src="/logo.png" alt="The Movie Ground" width={52} height={52} className="h-11 w-11 object-contain" />
        </Link>

        <nav aria-label="Main navigation" className="flex min-w-0 items-center gap-0.5">
          {primaryNavItems.map((item) => renderTab(item))}
          <div className="relative">
              <button
                type="button"
                onClick={() => setSportsOpen(!sportsOpen)}
                aria-expanded={sportsOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm ${
                  sportsOpen || sportsIsActive
                    ? "border-white/15 bg-white/10 text-white"
                    : "border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                Sports
                <svg className={`h-3.5 w-3.5 transition-transform ${sportsOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {sportsOpen && (
                <div className="absolute left-0 top-full mt-3 max-h-[min(72vh,38rem)] w-64 overflow-y-auto rounded-lg border border-white/10 bg-[#111113]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
                  <section className="py-2">
                    <h2 className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">All Sports</h2>
                    <div className="space-y-0.5">
                      {sportsNavItems.map((item) => renderMoreLink(item))}
                    </div>
                  </section>
                </div>
              )}
            </div>
            <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm ${
                moreOpen || moreIsActive
                  ? "border-white/15 bg-white/10 text-white"
                  : "border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              More
              <svg className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-3 max-h-[min(72vh,38rem)] w-64 overflow-y-auto rounded-lg border border-white/10 bg-[#111113]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
                {moreNavGroups.map((group) => (
                  <section key={group.label} className="py-2">
                    <h2 className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{group.label}</h2>
                    <div className="space-y-0.5">{group.items.map((item) => renderMoreLink(item))}</div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex w-full min-w-[260px] max-w-[430px] items-center gap-2">
          <SearchBox className="min-w-0 flex-1" />
          <div className="w-[124px] shrink-0 xl:w-[140px]">
            <Suspense fallback={<div className="h-10 rounded-md border border-white/10 bg-white/[0.06]" />}>
              <LanguageFilter compact />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}