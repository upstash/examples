import { redis } from "@/lib/redis";
import { publicSupabase } from "@/lib/supabase/public";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let target = await redis.get<string>(`link:${slug}`);

  if (!target) {
    const { data } = await publicSupabase
      .from("links")
      .select("target_url")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) return new Response("Not found", { status: 404 });

    target = data.target_url as string;
    await redis.set(`link:${slug}`, target, { ex: 60 * 60 * 24 });
  }

  // Fire-and-forget atomic increment.
  redis.incr(`clicks:${slug}`).catch(() => {});

  return Response.redirect(target, 302);
}
