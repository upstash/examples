"use strict";

const Redis = require("ioredis");

module.exports.hello = async (event) => {
  const client = new Redis(process.env.REDIS_URL);
  await client.set("hello", "world");
  const response = await client.get("hello");
  await client.quit();
  return { response: response };
};
