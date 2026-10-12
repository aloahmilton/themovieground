"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { isNavItemActive, NavItem, navGroups } from "@/components/navigation";
import SearchBox from "./SearchBox";

function NavIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      {name === "home" && <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
      {name === "movie" && <><rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.7" /><path d="M7 4v4m5-4v4m5-4v4M7 16v4m5-4v4m5-4v4M3 12h18" strokeWidth="1.7" /></>}
      {name === "tv" && <><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.7" /><path d="m9 2 3 3 3-3m-7 17v3m6-3v3m-8 0h10" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>}
      {name === "grid" && <><rect x="3" y="3" width="8" height="8" rx="1.5" strokeWidth="1.7" /><rect x="13" y="3" width="8" height="5" rx="1.5" strokeWidth="1.7" /><rect x="13" y="10" width="8" height="11" rx="1.5" strokeWidth="1.7" /><rect x="3" y="13" width="8" height="8" rx="1.5" strokeWidth="1.7" /></>}
      {name === "bookmark" && <path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4z" strokeWidth="1.7" strokeLinejoin="round" />}
      {name === "ball" && <><circle cx="12" cy="12" r="9" strokeWidth="1.7" /><path d="m12 7 3 2-1 4h-4L9 9zm0 6 3 2m-7-1 3-2m5-6-1 3m-6-3 1 3m0 6 1 3m5-3-1 3" strokeWidth="1.5" strokeLinejoin="round" /></>}
      {name === "flag" && <path d="M5 21V4m0 1c6-4 8 4 14 0v11c-6 4-8-4-14 0" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
      {name === "person" && <><circle cx="12" cy="8" r="4" strokeWidth="1.7" /><path d="M4 21a8 8 0 0 1 16 0" strokeWidth="1.7" strokeLinecap="round" /></>}
      {name === "heart" && <path d="M20.8 8.6c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4Z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
      {name === "moon" && <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
      {name === "sparkles" && <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" strokeWidth="1.7" strokeLinejoin="round" /><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" strokeWidth="1.5" strokeLinejoin="round" /></>}
      {name === "fire" && <path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-2 4-2 5-2-1-3-3-3-6-3 3-6 7-6 11a8 8 0 0 0 8 7Z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function MobileNavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        active ? "bg-red-600/15 text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className={`h-5 w-5 ${active ? "text-red-400" : "text-zinc-500"}`}>
        <NavIcon name={item.icon} />
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

function SearchMobileNavLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const searchParams = useSearchParams();
  const itemType = new URLSearchParams(item.href.split("?")[1]).get("type");
  return <MobileNavLink item={item} active={searchParams.get("type") === itemType} onClick={onClick} />;
}

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const isActive = (href: string) => isNavItemActive(pathname, href);

  const renderLink = (item: NavItem) => {
    if (item.href.startsWith("/search")) {
      return (
        <Suspense key={item.href} fallback={<MobileNavLink item={item} active={false} onClick={close} />}>
          <SearchMobileNavLink item={item} onClick={close} />
        </Suspense>
      );
    }
    return <MobileNavLink key={item.href} item={item} active={isActive(item.href)} onClick={close} />;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#0b0b0d]/95 px-3 backdrop-blur-xl sm:h-16 sm:px-6 lg:hidden">
        <Link href="/" aria-label="The Movie Ground home" className="flex items-center">
          <Image src="/logo.png" alt="The Movie Ground" width={44} height={44} className="h-10 w-10 object-contain" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="rounded-md p-2 text-white hover:bg-white/[0.06]"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" onClick={close} aria-label="Close navigation menu" className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <aside role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute inset-y-0 left-0 flex w-[min(88vw,340px)] flex-col border-r border-white/10 bg-[#0b0b0d] px-4 py-5 shadow-2xl shadow-black/60">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" onClick={close} aria-label="The Movie Ground home">
                <Image src="/logo.png" alt="The Movie Ground" width={56} height={56} className="h-12 w-12 object-contain" />
              </Link>
              <button type="button" onClick={close} aria-label="Close navigation menu" className="rounded-md p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6"><SearchBox onSearch={close} /></div>

            <nav aria-label="Mobile navigation links" className="flex-1 space-y-6 overflow-y-auto">
              {navGroups.map((group) => (
                <section key={group.label}>
                  <h2 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">{group.label}</h2>
                  <div className="space-y-1">{group.items.map((item) => renderLink(item))}</div>
                </section>
              ))}
            </nav>
            <p className="mt-4 border-t border-white/10 px-3 pt-4 text-xs text-zinc-600">The Movie Ground</p>
          </aside>
        </div>
      )}
    </>
  );
}