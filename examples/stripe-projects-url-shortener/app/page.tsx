import { redis } from "@/lib/redis";
import { headers } from "next/headers";
import { CreateLinkForm } from "./create-link-form";
import { LinksList } from "./links-list";

export const dynamic = "force-dynamic";

type LinkRow = {
  slug: string;
  target_url: string;
};

export default async function Home() {
  const slugs =
    (await redis.zrange<string[]>("links:recent", 0, 49, { rev: true })) ?? [];

  const rows: LinkRow[] = slugs.length
    ? (
        await Promise.all(
          slugs.map(async (slug) => {
            const data = await redis.hgetall<{ target_url: string }>(
              `link:${slug}`,
            );
            return data ? { slug, target_url: data.target_url } : null;
          }),
        )
      ).filter((r): r is LinkRow => r !== null)
    : [];

  const initialCounts = rows.length
    ? ((await redis.mget<(number | null)[]>(
        ...rows.map((r) => `clicks:${r.slug}`),
      )) ?? []).map((c) => c ?? 0)
    : [];

  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    `http://${(await headers()).get("host") ?? "localhost:3000"}`;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Shorty</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          A public URL shortener — built on Upstash Redis, deployed via Stripe Projects.
        </p>
      </header>

      <CreateLinkForm />

      <LinksList rows={rows} host={host} initialCounts={initialCounts} />
    </div>
  );
}
