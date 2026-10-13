# The Movie Ground

A **monolith** Next.js app for discovering movies, TV shows, sports, and (optionally) authorized live TV channels.

**Not a pirate streaming site.** We do not host or stream copyrighted movies/TV episodes.

## Why users cannot stream Netflix/Prime/etc. movies here

| Reason | Explanation |
|--------|-------------|
| **Copyright law** | Movies and series are owned by studios and licensed to Netflix, Disney+, Prime, etc. Streaming them without a license is illegal. |
| **No license** | This project has no deals with studios or aggregators to deliver full films. |
| **API terms** | TMDB only provides **metadata** (titles, posters, cast, trailers, where-to-watch links). It does not provide video files. |
| **Risk** | Hosting or embedding pirated streams can get the site taken down, the domain blocked, and the operator in legal trouble. |

### What *is* allowed (and already built)

1. **Discovery** – search, genres, hidden gems, ratings, cast, similar titles  
2. **Official trailers** – YouTube links from TMDB  
3. **Where to Watch** – legal providers for your region (Netflix, Prime, etc.) via TMDB  
4. **Local Channels** (`/watch-tv`) – only if **you** supply a legal HTTPS M3U playlist via `IPTV_PLAYLIST_URL` (e.g. public-domain or licensed channels you have rights to use)

If you want full-film streaming legally, you need licensed content (your own rights, a paid aggregator API, or partner integrations). That is a business/legal project, not a free-API side project.

---

## Architecture (monolith)

One Next.js 16 app, one deploy unit. No monorepo packages.

```
src/
├── app/                    # Routes (App Router)
│   ├── page.tsx             # Home + catalog rows
│   ├── search/              # Search + filters
│   ├── genres/              # Genre browser
│   ├── movie/[id]/         # Movie detail + Where to Watch
│   ├── tv/[id]/            # TV detail
│   ├── watchlist/           # Browser watchlist + export
│   ├── sports/              # Leagues + F1
│   ├── watch-tv/            # Legal IPTV browser (optional)
│   ├── about/  donate/
│   └── api/                 # catalog, search, locale, watch-tv
├── components/              # UI (nav, hero, cards, player…)
└── lib/                     # TMDB, sports, IPTV, catalog, i18n
```

**Data flow**

- Movies/TV metadata → TMDB API (`TMDB_API_KEY`)
- Sports → TheSportsDB + Jolpica F1
- Live TV → optional M3U over HTTPS (`IPTV_PLAYLIST_URL`)
- Watchlist → browser `localStorage` only

---

## Setup

```bash
git clone https://github.com/aloahmilton/themovieground.git
cd themovieground
npm install
cp .env.example .env.local
```

### Environment (`.env.local`)

```env
# Required for movies & TV
TMDB_API_KEY=your_tmdb_v3_key

# Optional sports
SPORTSDB_API_KEY=3

# Optional: legal live-TV playlist (HTTPS M3U only)
# IPTV_PLAYLIST_URL=https://example.com/your-licensed-playlist.m3u
```

```bash
npm run dev
```

Open http://localhost:3000

### Vercel

1. Import the repo  
2. Set `TMDB_API_KEY` (and optional `IPTV_PLAYLIST_URL` / `SPORTSDB_API_KEY`)  
3. Deploy  

Styles use Tailwind v4 + `@tailwindcss/postcss` (`postcss.config.mjs`). If CSS looks broken after deploy, redeploy after pulling latest `main`.

---

## Features summary

- Netflix-style home rows (trending, in demand, hidden gems, …)
- Search, genres, language filters
- Movie/TV detail: cast, trailer, similar, watchlist, **Where to Watch**
- Sports + Formula 1
- Optional **Local Channels** player (HLS.js) for authorized playlists
- Interface language toggle, about & donate pages

## License

MIT — use responsibly. Do not add pirated streams.
