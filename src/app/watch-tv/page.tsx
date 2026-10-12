export const metadata = {
  title: "Local Channels – The Movie Ground",
  description: "Local channel directory on The Movie Ground.",
};

export default function WatchTvPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black px-4 pb-16 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-400">Live television</p>
        <h1 className="text-3xl font-black text-white sm:text-4xl">Local Channels</h1>

        <section className="mt-8 flex aspect-video max-h-[70vh] items-center justify-center border border-white/10 bg-[#080808]">
          <div className="px-6 text-center">
            <svg className="mx-auto mb-4 h-10 w-10 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
              <path d="m9 2 3 3 3-3m-7 17v3m6-3v3m-8 0h10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-medium text-zinc-300">No channels are available yet.</p>
          </div>
        </section>
      </div>
    </main>
  );
}