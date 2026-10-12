import { getIptvChannels } from "@/lib/iptv";

const PAGE_SIZE = 48;

export async function GET(request: Request) {
  if (!process.env.IPTV_PLAYLIST_URL?.trim()) {
    return Response.json({ channels: [], groups: [], total: 0, unavailable: true }, { status: 503 });
  }

  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.trim().toLowerCase() || "";
    const group = url.searchParams.get("group") || "";
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const allChannels = await getIptvChannels();
    const groups = [...new Set(allChannels.map((channel) => channel.group))].sort((a, b) => a.localeCompare(b));
    const filtered = allChannels.filter((channel) => {
      const matchesGroup = !group || channel.group === group;
      const matchesQuery = !query || `${channel.name} ${channel.group}`.toLowerCase().includes(query);
      return matchesGroup && matchesQuery;
    });
    const start = (page - 1) * PAGE_SIZE;

    return Response.json({
      channels: filtered.slice(start, start + PAGE_SIZE),
      groups,
      total: filtered.length,
      page,
      pageSize: PAGE_SIZE,
    });
  } catch {
    return Response.json({ channels: [], groups: [], total: 0, unavailable: true }, { status: 502 });
  }
}