# The Movie Ground 🎬

A complete **Netflix + Prime Video + MovieBox** style discovery platform for **Movies, TV Shows & Sports**.

Powered by free APIs: **TMDB**, **TheSportsDB**, and **Jolpica F1**.

## Features

### Movies & TV
- Trending, Popular, Top Rated, Now Playing, Upcoming, On The Air
- 🔥 **In Demand** and 💎 **Hidden Gems** rows
- Full search with Movies / TV filter
- **Language filter** (English, French, Spanish, Japanese, Korean, Hindi, Arabic…)
- **Genre browser** with per-genre pages
- Movie & TV detail pages: cast, trailer, similar titles, ratings
- **My Watchlist** (saved in browser)

### Sports
- Premier League, La Liga, Serie A, Bundesliga, Ligue 1
- NBA, NFL, MLB
- League pages with upcoming fixtures, recent results & teams
- **Formula 1** – current driver standings + race calendar

### UI
- Dark Netflix-inspired design
- Horizontal carousels, hero banner
- Fully responsive (mobile-first)
- Fast SSR + caching

## Quick Start

### 1. Get a free TMDB API key
https://www.themoviedb.org/settings/api  
(Create account → Settings → API → Request Developer key)

### 2. Clone & install
```bash
git clone https://github.com/aloahmilton/themovieground.git
cd themovieground
npm install
```

### 3. Environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
TMDB_API_KEY=your_tmdb_api_key_here
SPORTSDB_API_KEY=3
```

### 4. Run
```bash
npm run dev
```
Open http://localhost:3000

## Deploy on Vercel
1. Import the repo on [vercel.com](https://vercel.com)
2. Add Environment Variable: `TMDB_API_KEY` = your key
3. (Optional) `SPORTSDB_API_KEY=3`
4. Deploy

## Project Structure
```
src/
├── app/
│   ├── page.tsx                 # Home
│   ├── search/page.tsx          # Search + language filter
│   ├── genres/                  # Genre browser
│   ├── movie/[id]/page.tsx     # Movie details
│   ├── tv/[id]/page.tsx        # TV details
│   ├── watchlist/page.tsx      # Personal list
│   └── sports/                  # Sports + F1
├── components/                  # Navbar, Hero, Cards, etc.
└── lib/
    ├── tmdb.ts                   # Movies & TV API
    ├── sports.ts                 # Sports + F1 API
    └── watchlist.ts              # localStorage watchlist
```

## Important notes
- This is a **discovery** platform only. It does not stream or download copyrighted content.
- Watchlist is stored in the browser (localStorage).
- Attribution: This product uses the TMDB API but is not endorsed or certified by TMDB.

## License
MIT
