import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "$env/static/private";
import { json } from '@sveltejs/kit';
import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL || "",
  token: UPSTASH_REDIS_REST_TOKEN || ""
});

export async function GET() {
  const identifier = "api_call_counter";

  try {
    // Increment the API call counter and get the updated value
    const count = await redis.incr(identifier);

    // Optionally, you can also retrieve other information like the last time it was called
    const lastCalled = await redis.get("last_called");
    const lastCalledAt = lastCalled || "Never";

    // Store the current timestamp as the last called time
    await redis.set("last_called", new Date().toISOString());

    // Return the count and last called time
    return json({
      success: true,
      count: count,
      lastCalled: lastCalledAt,
    });
  } catch (error) {
    console.error("Redis error:", error);
    return json({
      success: false,
      message: "Error interacting with Redis",
    });
  }
}
