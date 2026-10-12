# The Movie Ground 🎬

A complete **Netflix + Prime Video + MovieBox** style movie & TV discovery platform.

Powered by the free **TMDB API**.

## Features

### Discovery
- 🔥 **Trending** this week
- 🔥 **In Demand** (high popularity + votes)
- 💎 **Hidden Gems** (high rating, lower popularity)
- Popular, Top Rated, Now Playing, Upcoming, On The Air
- Full **Genre** browser (Movies + TV)
- Language-aware discovery

### Search & Details
- Powerful multi-search (movies + TV)
- Movie & TV detail pages with cast, trailers, similar titles
- Ratings, runtime, seasons, status

### Personal
- **My Watchlist** (saved in browser localStorage)
- One-click “My List” button on every detail page

### UI/UX
- Dark Netflix-inspired design
- Horizontal carousels
- Fully responsive (mobile-first polish)
- Fast SSR + 1-hour cache

## Quick Start

1. Get free TMDB API key → https://www.themoviedb.org/settings/api
2. ```bash
   git clone https://github.com/aloahmilton/themovieground.git
   cd themovieground
   npm install
   cp .env.example .env.local
   ```
3. Put your key in `.env.local`:
   ```
   TMDB_API_KEY=your_key_here
   ```
4. ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Deploy on Vercel
Import the repo → add env var `TMDB_API_KEY` → Deploy.

## Project Structure
```
src/
├── app/
│   ├── page.tsx                 # Home with all rows
│   ├── search/page.tsx
│   ├── genres/page.tsx          # Genre browser
│   ├── genres/[id]/page.tsx
│   ├── watchlist/page.tsx       # Personal list
│   ├── movie/[id]/page.tsx
│   └── tv/[id]/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── MovieCard.tsx
│   ├── MovieRow.tsx
│   └── WatchlistButton.tsx
└── lib/
    ├── tmdb.ts                  # All TMDB helpers + Hidden Gems / In Demand
    └── watchlist.ts             # localStorage watchlist
```

## Notes
- This is a **discovery** platform. It does not stream or download copyrighted content.
- Watchlist is stored locally in your browser.
- Attribution: This product uses the TMDB API but is not endorsed or certified by TMDB.

## License
MIT
