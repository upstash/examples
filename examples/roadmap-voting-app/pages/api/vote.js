import { getRedis } from "./_utils/redis";

module.exports = async (req, res) => {
  const redis = getRedis();
  const body = req.body;
  const title = body["title"];
  const ip = req.headers["x-forwarded-for"] || req.headers["Remote_Addr"] || "NA";
  const c = ip === "NA" ? 1 : await redis.sadd(`s:${title}`, ip);
  if (c === 0) {
    redis.quit();
    res.json({
      error: "You can not vote an item multiple times",
    });
  } else {
    const v = await redis.zincrby("roadmap", 1, title);
    redis.quit();
    res.json({
      body: v,
    });
  }
};
