"use client";

import { useEffect, useState } from "react";
import { deleteLink } from "./actions";

type Row = { slug: string; target_url: string };

export function LinksList({
  rows,
  host,
  initialCounts,
}: {
  rows: Row[];
  host: string;
  initialCounts: number[];
}) {
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(rows.map((r, i) => [r.slug, initialCounts[i] ?? 0])),
  );

  useEffect(() => {
    if (rows.length === 0) return;

    const slugs = rows.map((r) => r.slug).join(",");
    let cancelled = false;

    async function poll() {
      if (document.hidden) return;
      try {
        const res = await fetch(`/api/counts?slugs=${slugs}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as Record<string, number>;
        if (!cancelled) setCounts(data);
      } catch {
        // swallow transient network errors
      }
    }

    const id = setInterval(poll, 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [rows]);

  if (rows.length === 0) {
    return <p className="text-zinc-500">No links yet. Shorten one above.</p>;
  }

  return (
    <ul className="divide-y divide-zinc-200 rounded-md border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {rows.map((link) => {
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
              {counts[link.slug] ?? 0} clicks
            </span>
            <form action={async () => deleteLink(link.slug)}>
              <button
                type="submit"
                className="text-sm text-zinc-500 hover:text-red-600"
              >
                Delete
              </button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
