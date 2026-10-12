import Link from "next/link";

export const metadata = {
  title: "About Aloah Milton – The Movie Ground",
  description: "Meet Aloah Milton and learn how The Movie Ground is built.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black px-4 pb-20 pt-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-red-400">The person behind the project</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
          Good stories deserve a better way to be found.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-300">
          I’m Aloah Milton, a full-stack and mobile engineer based in Yaoundé, Cameroon. I build web platforms, cloud APIs, and mobile apps, and The Movie Ground is where I bring that curiosity to movies, television, and sport.
        </p>

        <section className="mt-20 grid gap-10 border-t border-white/10 py-10 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-2xl font-bold text-white">Why I built it</h2>
          <p className="max-w-2xl leading-7 text-zinc-400">
            It started with a familiar question: “What should I watch next?” I wanted one focused place to explore what’s popular, follow a genre, compare details, and keep a personal list. The Movie Ground is a discovery guide, not a streaming service: it helps you find a title, then points you toward its details and official trailer.
          </p>
        </section>

        <section className="border-t border-white/10 py-10">
          <h2 className="mb-8 text-2xl font-bold text-white">How it comes together</h2>
          <div className="divide-y divide-white/10">
            <div className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr_1.4fr]">
              <span className="font-mono text-sm text-red-400">01</span>
              <h3 className="font-semibold text-white">A fast web foundation</h3>
              <p className="text-sm leading-6 text-zinc-400">Next.js, React, TypeScript, and Tailwind CSS shape the responsive interface and server-rendered pages.</p>
            </div>
            <div className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr_1.4fr]">
              <span className="font-mono text-sm text-red-400">02</span>
              <h3 className="font-semibold text-white">Useful public data</h3>
              <p className="text-sm leading-6 text-zinc-400">TMDB powers movie and TV discovery; TheSportsDB and Jolpica provide sports schedules, results, and Formula 1 data.</p>
            </div>
            <div className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr_1.4fr]">
              <span className="font-mono text-sm text-red-400">03</span>
              <h3 className="font-semibold text-white">Small details that stick</h3>
              <p className="text-sm leading-6 text-zinc-400">Cached data keeps browsing responsive, while the watchlist stays in your browser so your saved titles remain yours.</p>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-8">
          <a href="https://github.com/aloahmilton" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white underline decoration-red-500 underline-offset-4 hover:text-red-300">
            Aloah on GitHub
          </a>
          <a href="https://github.com/aloahmilton/themovieground" target="_blank" rel="noreferrer" className="text-sm text-zinc-400 hover:text-white">
            Explore the source
          </a>
          <Link href="/donate" className="text-sm text-zinc-400 hover:text-white">Support the project</Link>
        </div>
      </div>
    </div>
  );
}