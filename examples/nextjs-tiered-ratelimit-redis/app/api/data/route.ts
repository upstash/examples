import { NextRequest } from "next/server";
import { limiters, Plan } from "@/lib/ratelimit";

const PLAN_LIMITS: Record<Plan, number> = {
  free: 10,
  pro: 100,
  enterprise: 1000,
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId") ?? req.headers.get("x-forwarded-for") ?? "anonymous";
  const plan = (searchParams.get("plan") ?? "free") as Plan;

  if (!(plan in limiters)) {
    return Response.json({ error: "Invalid plan." }, { status: 400 });
  }

  const { success, limit, remaining } = await limiters[plan].limit(userId);

  const headers = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
  };

  if (!success) {
    return Response.json(
      { error: "Rate limit exceeded. Upgrade for higher limits." },
      { status: 429, headers: { ...headers, "X-RateLimit-Remaining": "0" } }
    );
  }

  return Response.json(
    {
      message: "Request successful.",
      userId,
      plan,
      limit: PLAN_LIMITS[plan],
      remaining,
    },
    { status: 200, headers }
  );
}
