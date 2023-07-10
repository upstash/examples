"use strict";

const axios = require("axios");
const FormData = require("form-data");
const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: "REPLACE_HERE",
  token: "REPLACE_HERE",
});

module.exports.consume = async (event) => {
  if (!event.records) {
    return { response: "no kafka event" };
  }

  for (const messages of Object.values(event.records)) {
    for (const msg of messages) {
      const buff = Buffer.from(msg.value, "base64");
      const text = buff.toString("ascii");

      const res = await filterContent(text);
      if (res === "none") {
        await redis.lpush("comments", text);
      } else {
        await redis.lpush("rejected-comments", text);
      }
    }
  }
  return { response: "success" };
};

async function filterContent(text) {
  const data = new FormData();
  data.append("text", text);
  data.append("lang", "en");
  data.append("mode", "standard");
  data.append("api_user", "REPLACE_HERE");
  data.append("api_secret", "REPLACE_HERE");

  const res = await axios({
    url: "https://api.sightengine.com/1.0/text/check.json",
    method: "post",
    data: data,
    headers: data.getHeaders(),
  });
  if (res.data.profanity.matches.length > 0) return "profanity";
  else if (res.data.personal.matches.length > 0) return "personal";
  else return "none";
}
