"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { customAlphabet } from "nanoid";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

const generateSlug = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  6,
);

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"),
  prefix: "shorty:create",
});

async function clientId() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "anonymous"
  );
}

export async function createLink(formData: FormData) {
  const ip = await clientId();
  const { success } = await ratelimit.limit(ip);
  if (!success) throw new Error("Slow down — 10 links per minute per IP.");

  const targetUrl = String(formData.get("url"));
  try {
    new URL(targetUrl);
  } catch {
    throw new Error("Invalid URL.");
  }

  const slug = generateSlug();
  const createdAt = Date.now();

  await Promise.all([
    redis.hset(`link:${slug}`, {
      target_url: targetUrl,
      created_at: String(createdAt),
    }),
    redis.zadd("links:recent", { score: createdAt, member: slug }),
  ]);

  revalidatePath("/");
  return slug;
}

export async function deleteLink(slug: string) {
  await Promise.all([
    redis.del(`link:${slug}`),
    redis.del(`clicks:${slug}`),
    redis.zrem("links:recent", slug),
  ]);
  revalidatePath("/");
}
