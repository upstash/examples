import { redis } from "@/lib/redis";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slugs = url.searchParams
    .get("slugs")
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  if (slugs.length === 0) {
    return Response.json({}, { headers: { "cache-control": "no-store" } });
  }

  const counts = await redis.mget<(number | null)[]>(
    ...slugs.map((s) => `clicks:${s}`),
  );

  const result: Record<string, number> = {};
  slugs.forEach((slug, i) => {
    result[slug] = counts[i] ?? 0;
  });

  return Response.json(result, { headers: { "cache-control": "no-store" } });
}
