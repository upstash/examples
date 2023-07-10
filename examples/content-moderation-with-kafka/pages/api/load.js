import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "REPLACE_HERE",
  token: "REPLACE_HERE",
});

export default async function handler(req, res) {
  const comments = await redis.lrange("comments", 0, 100);
  const censored = await redis.lrange("rejected-comments", 0, 100);
  const result = { comments: comments, censored: censored };
  res.status(200).json(result);
}
