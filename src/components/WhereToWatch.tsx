import type { WatchProviderRegion } from "@/lib/tmdb";

const regions = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "NG", name: "Nigeria" },
  { code: "CM", name: "Cameroon" },
];

type Props = {
  availability: WatchProviderRegion | null;
  detailPath: string;
  region: string;
  title: string;
};

export default function WhereToWatch({ availability, detailPath, region, title }: Props) {
  const offers = [
    { label: "Stream", providers: availability?.flatrate },
    { label: "Free", providers: availability?.free },
    { label: "With ads", providers: availability?.ads },
    { label: "Rent", providers: availability?.rent },
    { label: "Buy", providers: availability?.buy },
  ].filter((offer) => offer.providers?.length);
  const hasOffers = offers.length > 0;
  const providerSearch = availability?.link || `https://www.justwatch.com/${region.toLowerCase()}/search?q=${encodeURIComponent(title)}`;

  return (
    <section className="mt-8 border-y border-white/10 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Where to Watch</h2>
          <p className="mt-1 text-sm text-zinc-500">Availability depends on your region and provider.</p>
        </div>
        <form action={detailPath} method="get" className="flex items-center gap-2">
          <label htmlFor="watch-region" className="sr-only">Streaming region</label>
          <select
            id="watch-region"
            name="region"
            defaultValue={region}
            className="rounded-md border border-white/10 bg-[#111113] px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/70"
          >
            {regions.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}
          </select>
          <button type="submit" className="rounded-md border border-white/10 px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white">
            Update
          </button>
        </form>
      </div>

      {hasOffers ? (
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          {offers.map((offer) => (
            <div key={offer.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{offer.label}</p>
              <p className="text-sm text-zinc-200">{offer.providers?.map((provider) => provider.provider_name).join(", ")}</p>
            </div>
          ))}
          <a
            href={providerSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Watch Now
          </a>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">No provider listings found for this region.</p>
          <a
            href={providerSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Find Watch Options
          </a>
        </div>
      )}
      <p className="mt-4 text-xs text-zinc-600">Playback quality and offline downloads are managed by each provider.</p>
    </section>
  );
}