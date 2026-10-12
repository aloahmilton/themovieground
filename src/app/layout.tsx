import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "The Movie Ground – Discover Movies & TV Shows",
  description:
    "The Movie Ground is a platform to search and explore movies and TV shows. Discover trending, popular, top-rated titles and more.",
  keywords: ["movies", "tv shows", "movie ground", "sports", "watchlist"],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <Navigation />
        <div>
          <main className="pt-14 sm:pt-16 lg:pt-0">{children}</main>
          <footer className="border-t border-zinc-800 mt-16 py-10 px-4 text-center text-zinc-500 text-sm">
            <p>Built for discovery. No streaming of copyrighted content.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
