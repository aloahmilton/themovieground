# The Movie Ground 🎬

A beautiful **Netflix + Prime Video + MovieBox** style movie & TV discovery platform.

Powered entirely by the free **TMDB (The Movie Database) API**.

![The Movie Ground](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TMDB](https://img.shields.io/badge/API-TMDB-01b4e4?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)

## Features

- 🔥 **Trending**, Popular, Top Rated, Upcoming, Now Playing, On The Air
- 🔍 Full **search** across movies & TV shows
- 🎬 Movie & TV **detail pages** with cast, trailers, similar titles
- 🌙 Dark Netflix-style UI with horizontal carousels
- 📱 Fully responsive (mobile + desktop)
- ⚡ Server-side rendering + caching (Next.js App Router)
- 🆓 100% free APIs (only needs a free TMDB key)

## Quick Start

### 1. Get a free TMDB API Key

1. Create an account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings → API**
3. Request an API Key (choose **Developer**)
4. Copy your **API Key (v3 auth)**

### 2. Clone & Install

```bash
git clone https://github.com/aloahmilton/themovieground.git
cd themovieground
npm install
```

### 3. Add your API key

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your key:

```
TMDB_API_KEY=your_actual_key_here
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (1-click)

1. Push this repo to GitHub (already done)
2. Import the project on [vercel.com](https://vercel.com)
3. Add Environment Variable: `TMDB_API_KEY` = your key
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (Netflix-style rows)
│   ├── search/page.tsx       # Search + filter Movies/TV
│   ├── movie/[id]/page.tsx  # Movie details + cast + trailer
│   └── tv/[id]/page.tsx     # TV details
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── MovieCard.tsx
│   └── MovieRow.tsx
└── lib/
    └── tmdb.ts               # All TMDB API helpers
```

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **TMDB API** (free)

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

## License

MIT — feel free to use, fork, and improve.

---

**The Movie Ground** — Discover everything. Stream nowhere (legally).
