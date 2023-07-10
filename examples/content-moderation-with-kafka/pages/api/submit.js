import { Kafka } from "@upstash/kafka";

const kafka = new Kafka({
  url: "REPLACE_HERE",
  username: "REPLACE_HERE",
  password: "REPLACE_HERE",
});

export default async function handler(req, res) {
  const p = kafka.producer();
  const l = await p.produce("comments", req.body.comment);
  console.log(l);
  res.status(200).json(l);
}
