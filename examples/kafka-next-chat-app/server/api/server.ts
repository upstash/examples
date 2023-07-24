import { WebSocket } from "ws";

import * as http from "http";
import { Kafka } from "@upstash/kafka";
import { Redis } from "@upstash/redis";

const server = http.createServer();
const wss = new WebSocket.Server({ server });

server.listen(8080, () => {
    console.log("Server is running on port 6060");
});


const kafka = new Kafka({
    url: process.env.UPSTASH_KAFKA_REST_URL as string,
    username: process.env.UPSTASH_KAFKA_REST_USERNAME as string,
    password: process.env.UPSTASH_KAFKA_REST_PASSWORD as string,
});


const redis = Redis.fromEnv()

const consumer = kafka.consumer();

const producer = kafka.producer();

const clients = new Set<WebSocket>();

async function run() {
    while (true) {
        const messages = await consumer.consume({
            consumerGroupId: "group_1",
            instanceId: "instance_1",
            topics: ["chat"],
            autoOffsetReset: "earliest",
        });

        if (messages.length != 0) {
            for (let i = 0; i < messages.length; i++) {
                await redis.lpush("messagesList", messages[i].value);
                console.log(`Message sending: ${messages[i].value}`);

                clients.forEach((connection: WebSocket) => {
                    connection.send(messages[i].value);
                });
            }
        }

        console.log("run!");

        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

run().catch((error) => {
    console.log(`Error running the consumer: ${error}`);
});

wss.on("connection", async (connection, req) => {

    clients.add(connection);

    console.log(`New client connected:`);

    connection.on("message", async (message) => {
        const jsonMessage = message.toString();

        console.log("Received message:", JSON.parse(jsonMessage));

        producer.produce("chat", jsonMessage);
    });

    connection.on("close", () => {
        console.log(`Client disconnected:`);
        clients.delete(connection);
    });
});
