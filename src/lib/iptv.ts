export type IptvChannel = {
  id: string;
  name: string;
  group: string;
  logo: string;
  streamUrl: string;
};

function readAttributes(line: string) {
  return Object.fromEntries(
    [...line.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]])
  );
}

export function parseM3uPlaylist(playlist: string): IptvChannel[] {
  const channels: IptvChannel[] = [];
  let pending: { id: string; name: string; group: string; logo: string } | null = null;

  for (const rawLine of playlist.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("#EXTINF:")) {
      const attributes = readAttributes(line);
      const comma = line.lastIndexOf(",");
      const name = (comma >= 0 ? line.slice(comma + 1).trim() : "") || attributes["tvg-name"] || "Unnamed channel";
      const group = attributes["group-title"]?.trim() || "Other";
      const id = attributes["tvg-id"]?.trim() || `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${channels.length}`;

      pending = {
        id: `${id}-${channels.length}`,
        name,
        group,
        logo: attributes["tvg-logo"] || "",
      };
      continue;
    }

    if (line.startsWith("#") || !pending) continue;

    try {
      const stream = new URL(line);
      if (stream.protocol === "https:") {
        channels.push({ ...pending, streamUrl: stream.toString() });
      }
    } catch {}
    pending = null;
  }

  return channels;
}

export async function getIptvChannels() {
  const configuredUrl = process.env.IPTV_PLAYLIST_URL?.trim();
  if (!configuredUrl) return [];

  const playlistUrl = new URL(configuredUrl);
  if (playlistUrl.protocol !== "https:") {
    throw new Error("The IPTV playlist URL must use HTTPS.");
  }

  const response = await fetch(playlistUrl, {
    headers: { Accept: "application/vnd.apple.mpegurl, application/x-mpegURL, text/plain" },
    next: { revalidate: 1800 },
  });
  if (!response.ok) throw new Error(`IPTV playlist request failed: ${response.status}`);

  return parseM3uPlaylist(await response.text());
}