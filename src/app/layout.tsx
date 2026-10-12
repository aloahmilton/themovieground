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
            <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <p>Built for discovery. No streaming of copyrighted content.</p>
              <span className="hidden text-zinc-700 sm:inline" aria-hidden="true">·</span>
              <p>
                Built by{" "}
                <a href="https://github.com/aloahmilton" target="_blank" rel="noreferrer" className="text-zinc-300 underline decoration-red-500 underline-offset-4 hover:text-white">
                  Aloah Milton
                </a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
