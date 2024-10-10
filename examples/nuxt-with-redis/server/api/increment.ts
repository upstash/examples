import { defineEventHandler } from "h3";
import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || ""
});

export default defineEventHandler(async () => {
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
    return {
      success: true,
      count: count,
      lastCalled: lastCalledAt,
    };
  } catch (error) {
    console.error("Redis error:", error);
    return {
      success: false,
      message: "Error interacting with Redis",
    };
  }
});
