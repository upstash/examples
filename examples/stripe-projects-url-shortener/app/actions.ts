"use server";

import { revalidatePath } from "next/cache";
import { customAlphabet } from "nanoid";
import { Ratelimit } from "@upstash/ratelimit";
import { createClient } from "@/lib/supabase/server";
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

export async function createLink(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { success } = await ratelimit.limit(user.id);
  if (!success) throw new Error("Slow down — 10 links per minute max.");

  const targetUrl = String(formData.get("url"));
  try {
    new URL(targetUrl);
  } catch {
    throw new Error("Invalid URL.");
  }

  const slug = generateSlug();

  const { error } = await supabase
    .from("links")
    .insert({ user_id: user.id, slug, target_url: targetUrl });

  if (error) throw error;

  // Warm the cache so the first click is also fast.
  await redis.set(`link:${slug}`, targetUrl, { ex: 60 * 60 * 24 });

  revalidatePath("/dashboard");
  return slug;
}

export async function deleteLink(slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("slug", slug)
    .eq("user_id", user.id);

  if (error) throw error;

  await Promise.all([
    redis.del(`link:${slug}`),
    redis.del(`clicks:${slug}`),
  ]);

  revalidatePath("/dashboard");
}
