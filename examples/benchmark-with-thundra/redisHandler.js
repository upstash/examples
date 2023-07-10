"use strict";

const Redis = require("ioredis");
const client = new Redis(process.env.REDIS_URL);
const thundra = require("@thundra/core")({ apiKey: process.env.THUNDRA_KEY });

module.exports.load = thundra(async (event) => {
  const section = process.env.SECTION;
  const data = await client.zrevrange(section, 0, 9);
  const items = [];
  for (let i = 0; i < data.length; i++) {
    items.push(JSON.parse(data[i]));
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      data: {
        Items: items,
      },
    }),
  };
});
