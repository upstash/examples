import { getRedis } from "./_utils/redis";

module.exports = async (req, res) => {
  const redis = getRedis();
  const n = await redis.zrevrange("roadmap", 0, 100, "WITHSCORES");
  const result = [];
  for (let i = 0; i < n.length - 1; i += 2) {
    const item = {};
    item["title"] = n[i];
    item["score"] = n[i + 1];
    result.push(item);
  }

  redis.quit();

  res.json({
    body: result,
  });
};
