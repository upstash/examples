import { redis } from "@/lib/redis";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const target = await redis.hget<string>(`link:${slug}`, "target_url");
  if (!target) return new Response("Not found", { status: 404 });

  redis.incr(`clicks:${slug}`).catch(() => {});

  return Response.redirect(target, 302);
}
