"use strict";

const Redis = require("ioredis");

const time = new Date();

if (typeof client === "undefined") {
  const client = new Redis(process.env.REDIS_URL);
}

module.exports.hello = async (event) => {
  console.log("hello");
  await client.set("hello", "world");
  const response = await client.get("hello");
  return { response: `${response}-${time}` };
};
