const fetch = require("node-fetch");

module.exports.hello = async (event) => {
  const url =
    "https://us1-last-panther-33618.upstash.io/incr/counter?_token=AYNMzYyNGM0OGMtZWQ3TRlLWFmOGEtODc3ZWQxYWQyZGJjZjgyOTlxNGU5NDhhZWE3OTJlNmE2NGVjNGM=";
  const data = await fetch(url);
  const result = await data.text();
  return { statusCode: 200, body: result };
};
