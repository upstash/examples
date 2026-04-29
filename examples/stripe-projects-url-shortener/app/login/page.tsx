import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function sendMagicLink(formData: FormData) {
  "use server";
  const email = String(formData.get("email"));
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl}/auth/callback` },
  });

  if (error) throw error;
  redirect("/login?sent=1");
}

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Enter your email and we'll send you a magic link.
      </p>
      <form action={sendMagicLink} className="flex gap-2">
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Send link
        </button>
      </form>
      {sent === "1" && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Check your inbox for the sign-in link.
        </p>
      )}
    </div>
  );
}
