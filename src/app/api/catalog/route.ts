import { getCatalogPage } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalogs";
import { hasTmdbApiKey } from "@/lib/tmdb";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const catalog = getCatalog(params.get("list") || "");
  if (!catalog) return Response.json({ error: "Unknown catalog" }, { status: 404 });
  if (!hasTmdbApiKey()) return Response.json({ results: [], unavailable: true }, { status: 503 });

  const page = Math.min(100, Math.max(1, Number(params.get("page")) || 1));
  try {
    const results = await getCatalogPage(catalog.id, page);
    return Response.json({ results, page, hasMore: results.length >= 20 });
  } catch {
    return Response.json({ results: [], unavailable: true }, { status: 502 });
  }
}