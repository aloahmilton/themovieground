import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Movie Ground – Discover Movies & TV Shows",
  description:
    "The Movie Ground is a Netflix-style platform to search and explore movies and TV shows. Powered by TMDB. Trending, popular, top-rated and more.",
  keywords: ["movies", "tv shows", "netflix", "streaming", "tmdb", "movie ground"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <Navbar />
        <main className="pt-0">{children}</main>
        <footer className="border-t border-zinc-800 mt-16 py-10 px-4 text-center text-zinc-500 text-sm">
          <p>
            The Movie Ground — Data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              TMDB
            </a>
            . This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          <p className="mt-2">Built for discovery. No streaming of copyrighted content.</p>
        </footer>
      </body>
    </html>
  );
}
