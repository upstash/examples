import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redis } from "@/lib/redis";
import { CreateLinkForm } from "./create-link-form";
import { deleteLink } from "@/app/actions";

export const dynamic = "force-dynamic";

type Link = {
  slug: string;
  target_url: string;
  created_at: string;
};

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: links } = await supabase
    .from("links")
    .select("slug, target_url, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const rows: Link[] = links ?? [];

  const counts = rows.length
    ? await redis.mget<(number | null)[]>(
        ...rows.map((l) => `clicks:${l.slug}`),
      )
    : [];

  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    `http://${(await headers()).get("host") ?? "localhost:3000"}`;

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your links</h1>
        <form action={signOut}>
          <button className="text-sm text-zinc-500 hover:underline">
            Sign out
          </button>
        </form>
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
