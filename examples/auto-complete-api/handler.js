"use strict";

const Redis = require("ioredis");
if (typeof client === "undefined") {
  const client = new Redis(process.env.REDIS_URL);
}
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

module.exports.query = async (event, context, callback) => {
  if (!event.queryStringParameters || !event.queryStringParameters.term) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({
        message: "Invalid parameters. Term needed as query param.",
      }),
    };
  }
  const term = event.queryStringParameters.term.toUpperCase();
  const res = [];
  const rank = await client.zrank("terms", term);
  if (rank != null) {
    const temp = await client.zrange("terms", rank, rank + 100);
    for (const el of temp) {
      if (!el.startsWith(term)) {
        break;
      }
      if (el.endsWith("*")) {
        res.push(el.substring(0, el.length - 1));
      }
    }
  }
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `Query:${event.queryStringParameters.term}`,
      result: res,
    }),
  };
};
