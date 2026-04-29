import { createClient } from "@supabase/supabase-js";

// Anon, cookie-free client for the public redirect path.
// Reads are allowed by the public-read RLS policy on `links`.
export const publicSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } },
);
