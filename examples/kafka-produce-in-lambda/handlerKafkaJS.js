"use strict";
const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  // REPLACE YOUR ENDPOINT BELOW
  brokers: ["full-mantis-14289-us1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    // REPLACE YOUR USERNAME BELOW
    username: "REPLACE YOUR USERNAME",
    // REPLACE YOUR PASSWORD BELOW
    password: "REPLACE YOUR PASSWORD",
  },
  ssl: true,
});

module.exports.hello = async (event) => {
  const start = new Date();
  const producer = kafka.producer();
  await producer.connect();
  const msg = { value: "Hello" };
  const res = await producer.send({
    topic: "newtopic",
    messages: [msg],
  });
  await producer.disconnect();
  const latency = new Date() - start;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        header: "Pushed this message to Upstash Kafka with KafkaJS!",
        message: msg,
        response: res,
        latency: latency,
      },
      null,
      2,
    ),
  };
};
