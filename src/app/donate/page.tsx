import Link from "next/link";

export const metadata = {
  title: "Support The Movie Ground",
  description: "Support Aloah Milton and the continued development of The Movie Ground.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-black px-4 pb-20 pt-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-red-400">Support independent building</p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
          Help keep The Movie Ground growing.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
          The Movie Ground is an independent discovery project built by Aloah Milton. Your encouragement helps make room for more thoughtful improvements to the experience.
        </p>

        <section className="mt-12 border-y border-white/10 py-8">
          <h2 className="text-xl font-bold text-white">Donations</h2>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
            A verified payment destination has not been connected yet. I’m keeping this page open until there’s a real donation link to send you to.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="https://github.com/aloahmilton/themovieground" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
            View the project on GitHub
          </a>
          <Link href="/about" className="inline-flex items-center rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]">
            About Aloah
          </Link>
        </div>
      </div>
    </div>
  );
}