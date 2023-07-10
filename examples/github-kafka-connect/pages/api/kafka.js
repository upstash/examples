const address = "https://full-mantis-14289-us1-kafka.upstash.io:9092";
const user = "ZnVsbC1tYW50aXMtMTQyODkkimaEsuUsiT9TGk3OFdjveYHBV9Jjzow03SnUtRQ";
const pass = "4-R-fmtoalXnoeu9TjQBOOL4njfSKwEsE10YvHMiW63hFljqUrrq5_yAq4TPGd9c6JbqfQ==";
const auth = Buffer.from(`${user}:${pass}`).toString("base64");
const topic = "github-events";

export default async function handler(req, res) {
  const eventData = JSON.stringify(req.body);
  const x = await fetch(`${address}/produce/${topic}`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body: JSON.stringify({ value: eventData }),
  });
  const response = await x.json();
  console.log(response);
  res.status(200).json({ name: "kafka success-7" });
}
