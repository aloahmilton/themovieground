export type NavItem = { href: string; label: string; icon: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Discover",
    items: [
      { href: "/", label: "Home", icon: "home" },
      { href: "/search", label: "Explore All", icon: "grid" },
      { href: "/search?type=movie", label: "Movies", icon: "movie" },
      { href: "/search?type=tv", label: "TV Shows", icon: "tv" },
      { href: "/genres", label: "Genres", icon: "grid" },
      { href: "/genres/27?type=movie&name=Horror", label: "Midnight", icon: "moon" },
      { href: "/genres/16?type=movie&name=Animation", label: "Animation", icon: "sparkles" },
      { href: "/#most-watched", label: "Most Watched", icon: "fire" },
      { href: "/watch-tv", label: "Local Channels", icon: "tv" },
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

export const allNavItems = navGroups.flatMap((group) => group.items);

export const primaryNavItems = [
  navGroups[0].items[0],
  navGroups[0].items[2],
  navGroups[0].items[3],
  navGroups[0].items[5],
  navGroups[0].items[6],
  navGroups[0].items[7],
  navGroups[0].items[8],
];

export const sportsNavItems = navGroups[3].items;

export const moreNavGroups: NavGroup[] = [
  { label: "Explore", items: [navGroups[0].items[1], navGroups[0].items[4]] },
  { label: "My Library", items: navGroups[1].items },
  { label: "About", items: navGroups[2].items },
];

export function isNavItemActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const route = href.split("?")[0];
  if (route === "/") return pathname === "/";
  if (route === "/sports" || route === "/genres") return pathname === route;
  return pathname === route || pathname.startsWith(`${route}/`);
}