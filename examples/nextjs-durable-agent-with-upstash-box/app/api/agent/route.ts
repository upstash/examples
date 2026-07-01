import { Agent, Box } from "@upstash/box";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function getUserBox(userId: string) {
  const existing = await redis.get<string>(`box:${userId}`);
  if (existing) {
    // Reattach to the same durable workspace as last time.
    return Box.get(existing);
  }

  const box = await Box.create({
    runtime: "node",
    agent: {
      harness: Agent.ClaudeCode,
      model: "anthropic/claude-opus-4-6",
      apiKey: process.env.ANTHROPIC_API_KEY,
    },
  });
  await redis.set(`box:${userId}`, box.id);
  return box;
}

export async function POST(req: Request) {
  const { userId, prompt } = await req.json();

  if (!userId || !prompt) {
    return new Response("userId and prompt are required", { status: 400 });
  }

  const box = await getUserBox(userId as string);
  const agentStream = await box.agent.stream({ prompt: prompt as string });

  // Forward the agent's text deltas to the client as they arrive.
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of agentStream) {
        if (chunk.type === "text-delta") {
          controller.enqueue(encoder.encode(chunk.text));
        }
      }
      controller.close();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
