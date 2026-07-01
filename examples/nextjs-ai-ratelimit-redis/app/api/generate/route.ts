import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const freeTier = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "1 d"),
  prefix: "rl:free",
});

const paidTier = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(500, "1 h"),
  prefix: "rl:paid",
});

const MOCK_RESPONSES = [
  "The universe is approximately 13.8 billion years old, but it still has no idea what to do with its weekends.",
  "A cat's purr vibrates at 25–50 Hz — the same frequency range used in physical therapy to promote bone healing.",
  "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.",
  "Octopuses have three hearts, blue blood, and nine brains — one central brain and one in each arm.",
  "The shortest war in history lasted 38–45 minutes: the Anglo-Zanzibar War of 1896.",
  "Bananas are technically berries, but strawberries are not — botanically speaking.",
  "A single bolt of lightning contains enough energy to toast about 100,000 slices of bread.",
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const plan: "free" | "paid" = body.plan === "paid" ? "paid" : "free";
  const userId: string = body.userId || "anonymous";
  const prompt: string = body.prompt || "";

  // Per-user, per-tier rate limit (layered on top of the global middleware limit)
  const limiter = plan === "paid" ? paidTier : freeTier;
  const { success, remaining, reset } = await limiter.limit(userId);

  if (!success) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded for your plan",
        retryAfter: Math.ceil((reset - Date.now()) / 1000),
        plan,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(reset),
        },
      }
    );
  }

  // Simulate AI processing latency
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

  // Mock AI response — swap this block for a real OpenAI / Anthropic call:
  //
  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [{ role: "user", content: prompt }],
  //   });
  //   const text = completion.choices[0].message.content ?? "";
  //
  const text = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

  return NextResponse.json(
    { text, plan, userId, prompt },
    {
      headers: {
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    }
  );
}
