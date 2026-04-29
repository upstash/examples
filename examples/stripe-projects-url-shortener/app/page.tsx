import { redis } from "@/lib/redis";
import { headers } from "next/headers";
import { CreateLinkForm } from "./create-link-form";
import { deleteLink } from "./actions";

export const dynamic = "force-dynamic";

type LinkRow = {
  slug: string;
  target_url: string;
  created_at: number;
};

export default async function Home() {
  // Most recent 50 slugs.
  const slugs = (await redis.zrange<string[]>("links:recent", 0, 49, {
    rev: true,
  })) ?? [];

  const rows: LinkRow[] = slugs.length
    ? (
        await Promise.all(
          slugs.map(async (slug) => {
            const data = await redis.hgetall<{
              target_url: string;
              created_at: string;
            }>(`link:${slug}`);
            return data
              ? {
                  slug,
                  target_url: data.target_url,
                  created_at: Number(data.created_at),
                }
              : null;
          }),
        )
      ).filter((r): r is LinkRow => r !== null)
    : [];

  const counts = rows.length
    ? ((await redis.mget<(number | null)[]>(
        ...rows.map((r) => `clicks:${r.slug}`),
      )) ?? [])
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

      {rows.length === 0 ? (
        <p className="text-zinc-500">No links yet. Shorten one above.</p>
      ) : (
        <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {rows.map((link, i) => {
            const shortUrl = `${host}/${link.slug}`;
            return (
              <li
                key={link.slug}
                className="flex items-center justify-between gap-4 p-4"
              >
                <div className="min-w-0 flex-1">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm font-medium hover:underline"
                  >
                    {shortUrl}
                  </a>
                  <p className="truncate text-sm text-zinc-500">
                    → {link.target_url}
                  </p>
                </div>
                <span className="tabular-nums text-sm text-zinc-600 dark:text-zinc-400">
                  {counts[i] ?? 0} clicks
                </span>
                <DeleteButton slug={link.slug} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DeleteButton({ slug }: { slug: string }) {
  async function action() {
    "use server";
    await deleteLink(slug);
  }
  return (
    <form action={action}>
      <button
        type="submit"
        className="text-sm text-zinc-500 hover:text-red-600"
      >
        Delete
      </button>
    </form>
  );
}
