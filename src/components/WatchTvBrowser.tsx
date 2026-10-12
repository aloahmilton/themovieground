"use client";

import { useEffect, useState } from "react";
import type { IptvChannel } from "@/lib/iptv";
import WatchTvPlayer from "@/components/WatchTvPlayer";

type ChannelResponse = {
  channels: IptvChannel[];
  groups: string[];
  total: number;
  page: number;
  pageSize: number;
  unavailable?: boolean;
};

export default function WatchTvBrowser() {
  const [channels, setChannels] = useState<IptvChannel[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<IptvChannel | null>(null);
  const [group, setGroup] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page) });
    if (group) params.set("group", group);
    if (query.trim()) params.set("q", query.trim());

    setLoading(true);
    setUnavailable(false);
    const timeout = window.setTimeout(() => {
      fetch(`/api/watch-tv?${params}`, { signal: controller.signal })
        .then(async (response) => {
          if (!response.ok) throw new Error("Channel list unavailable");
          return response.json() as Promise<ChannelResponse>;
        })
        .then((data) => {
          setChannels(data.channels);
          setGroups(data.groups);
          setTotal(data.total);
          setSelectedChannel((current) =>
            current && data.channels.some((channel) => channel.id === current.id)
              ? current
              : data.channels[0] || null
          );
        })
        .catch(() => {
          if (!controller.signal.aborted) setUnavailable(true);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, query.trim() ? 250 : 0);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [group, page, query]);

  const pageCount = Math.max(1, Math.ceil(total / 48));

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-400">Live television</p>
        <h1 className="text-3xl font-black text-white sm:text-4xl">Local Channels</h1>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-label="Selected channel" className="min-w-0">
            <WatchTvPlayer channel={selectedChannel} />
            {selectedChannel && (
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-white">{selectedChannel.name}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{selectedChannel.group}</p>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase text-red-400">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> Live
                </span>
              </div>
            )}
          </section>

          <section aria-label="Channel directory" className="min-w-0">
            <div className="mb-4 flex gap-2">
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                type="search"
                placeholder="Find a channel"
                aria-label="Find a channel"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/70"
              />
              <select
                value={group}
                onChange={(event) => {
                  setGroup(event.target.value);
                  setPage(1);
                }}
                aria-label="Filter channels by group"
                className="max-w-[42%] rounded-md border border-white/10 bg-[#111113] px-2 text-xs text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/70"
              >
                <option value="">All groups</option>
                {groups.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <p className="mb-3 text-xs text-zinc-500">
              {loading ? "Loading channels..." : `${total.toLocaleString()} channels`}
            </p>

            {unavailable ? (
              <p className="border-t border-white/10 py-8 text-sm text-zinc-500">Channel list is unavailable right now.</p>
            ) : channels.length === 0 && !loading ? (
              <p className="border-t border-white/10 py-8 text-sm text-zinc-500">No channels match this selection.</p>
            ) : (
              <div className="max-h-[min(62vh,42rem)] space-y-1 overflow-y-auto pr-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setSelectedChannel(channel)}
                    aria-pressed={selectedChannel?.id === channel.id}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                      selectedChannel?.id === channel.id
                        ? "border-red-600/40 bg-red-600/10"
                        : "border-transparent hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-zinc-900 text-xs font-bold text-zinc-400">
                      {channel.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white">{channel.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-zinc-500">{channel.group}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {pageCount > 1 && !unavailable && (
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1}
                  className="text-sm text-zinc-300 hover:text-white disabled:cursor-not-allowed disabled:text-zinc-700"
                >
                  Previous
                </button>
                <span className="text-xs text-zinc-500">{page} / {pageCount}</span>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                  disabled={page >= pageCount}
                  className="text-sm text-zinc-300 hover:text-white disabled:cursor-not-allowed disabled:text-zinc-700"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}