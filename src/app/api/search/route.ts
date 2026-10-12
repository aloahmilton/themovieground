import { getImageUrl, getTitle, getYear, hasTmdbApiKey, searchMulti } from "@/lib/tmdb";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  if (query.length < 2) return Response.json({ results: [] });
  if (!hasTmdbApiKey()) return Response.json({ results: [], unavailable: true }, { status: 503 });

  try {
    const data = await searchMulti(query.slice(0, 100));
    const results = data.results.flatMap((item) => {
      if (item.media_type !== "movie" && item.media_type !== "tv") return [];
      return [{
        id: item.id,
        mediaType: item.media_type,
        title: getTitle(item),
        year: getYear(item),
        posterUrl: getImageUrl(item.poster_path, "w300"),
      }];
    }).slice(0, 6);

    return Response.json({ results });
  } catch {
    return Response.json({ results: [], unavailable: true }, { status: 502 });
  }
}