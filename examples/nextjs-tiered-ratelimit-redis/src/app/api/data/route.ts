import { NextRequest, NextResponse } from "next/server";
import { limiters, resolveTier } from "@/lib/limiters";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // In a real app these would come from a session / JWT.
  // Here they are passed as query params so the demo UI can toggle tiers.
  const userId = req.nextUrl.searchParams.get("userId") || null;
  const plan = req.nextUrl.searchParams.get("plan") || null;
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const tier = resolveTier(userId, plan);
  const identifier = userId ?? ip;

  const { success, limit, remaining, reset } = await limiters[tier].limit(identifier);

  if (!success) {
    return NextResponse.json(
      { error: "Too Many Requests", tier, limit, remaining: 0 },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(reset),
        },
      }
    );
  }

  return NextResponse.json(
    {
      message: "Hello from the API!",
      tier,
      limit,
      remaining,
      reset,
    },
    {
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(remaining),
        "X-RateLimit-Reset": String(reset),
      },
    }
  );
}
