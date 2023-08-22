---
title: Chat Application with Next.js and Upstash Kafka
products: ["redis", "kafka"]
stack: ["Next.js", "WebSocket", "Fly.io", "TypeScript"]
use_cases: ["Chat Application"]
author: "fahreddinozcan"
---

<br />
<div align="center">

  <h3 align="center">Chat Application with Next.js and Upstash Kafka</h3>

  <p align="center">
    Create a real-time chat application using Next.js, Upstash Kafka and Upstash Redis. This project enables user to create clients, chat room with scalable performance. Guide also includes deployment to Fly.io
  </p>
</div>

Welcome! This example showcases an interactive messaging platform that harnesses the power of Upstash Kafka, Upstash Redis, and Next.js. Through this example, you will gain hands-on experience in utilizing Upstash Redis and Upstash Kafka for a robust real-time communication system and learn to integrate various technologies with Upstash.

## Demo

To see the demo version of this project, please navigate to [here](https://next-message.fly.dev/).

You can also build your own demo following the [blogpost of this project](https://upstash.com/blog/author/fahreddin/next-chatapp-with-kafka). It describes the development and deployment process in detail.

## Project Overview

The goal of this example is to develop a real-time chat application that allows users to communicate through multiple clients, each with a unique username. The application consists of two main pages: client registration and chat room.

### Client Registration

The client registration page allows users to create multiple clients, each with a unique username. Upon clicking a client's username, users are directed to a dedicated chat room associated with that specific client.

### Chat Room

The chat room page enables real-time communication between clients. When users click on a client's username and enter a chat room, they can send and receive messages in real time. Users can also access the history of the chatroom.

### Application Logic

The chat application's logic is as follows:

- Users create multiple clients on the index page, each with a unique username.
- Clicking on a client's username opens a new tab with a separate client and a unique path.
- Each client establishes a WebSocket connection to a message server.
- Messages sent from a client are directed to the associated message server via WebSocket.
- Message servers handle the message traffic by routing messages to a Kafka Broker.
- Each message server runs a Node.js thread to manage incoming messages.
- Consumed messages from Kafka are sent to clients through WebSocket connections.
- The react-use-websocket library is used to consume incoming messages on the client side.

### Data Storage

Upstash Redis: The application utilizes Upstash Redis to store message history. Messages produced to Kafka are also persisted in the Redis database. Old messages are retrieved from Upstash Redis upon creating a new client and are displayed in the chat interface.

### Deployment

The current version of this example is deployed to Fly.io. You can checkout the [blogpost](upstash.com/blog/author/fahreddin/next-chatapp-with-kafka) to learn about the deployment process.

## Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
