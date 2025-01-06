---
title: Serverless WebSocket Chat on CF Workers
products: ["redis"]
languages: ["ts"]
stack: ["React", "WebSocket"]
platforms: ["Cloudflare"]
use_cases: ["State Store"]
author: "fahreddinozcan"
preview_url: "https://486e5d1a.client-260.pages.dev"
---

<br />
<div align="center">

  <h3 align="center">Real-time WebSocket Chat</h3>

  <p align="center">
    Build a real-time chat application using Cloudflare Workers, WebSocket API, and Upstash Redis
  </p>
</div>

This example demonstrates how to create a serverless real-time chat application using Cloudflare Workers WebSocket API for real-time communication and Upstash Redis for message persistence. The frontend is built with React and deployed on Cloudflare Pages.

You can see the demo [here](https://486e5d1a.client-260.pages.dev)

# Project Details

The goal of this project is to create a serverless chat application without maintaining any traditional WebSocket servers. To achieve this, we use Cloudflare Workers with its WebSocket API for handling real-time connections, and Upstash Redis sorted sets for message persistence. The frontend is a React application that connects to the Worker via WebSocket.

## Real-time Communication with WebSocket

The application uses Cloudflare Workers' WebSocket API to handle real-time bidirectional communication. Each client maintains a WebSocket connection to the Worker, which handles message broadcasting and persistence. The system includes:

- Real-time message delivery
- Automatic reconnection handling
- Connection status indicators
- Message history on connection

## Message Storage with Redis

We use Upstash Redis sorted sets to store chat messages with timestamps as scores. This provides:

- Efficient message storage and retrieval
- Automatic message ordering by timestamp
- Easy pagination for message history
- Message persistence across connections

## Features

- Real-time bidirectional communication
- Message persistence with Redis sorted sets
- Automatic reconnection handling
- Connection status indicators
- Message history on connection
- Clean mobile-responsive UI
- Modern chat bubble interface
- Typing indicators (optional)

# Deployment

## Prerequisites

1. Upstash Redis database
2. Cloudflare account
3. wrangler CLI installed (`npm i -g wrangler`)

## Environment Variables

Edit the environment variables in the `wrangler.toml` file of your `worker` directory:

```toml
name = "chat-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
UPSTASH_REDIS_REST_URL = "YOUR_REDIS_URL"
UPSTASH_REDIS_REST_TOKEN = "YOUR_REDIS_TOKEN"
```

## Deploy the Worker

```bash
cd worker
pnpm install
npm run deploy
```

## Deploy the Frontend

```bash
cd client
pnpm install
pnpm run deploy
```

### Learn More

To learn more about the technologies used, check out:

- [Upstash Redis Documentation](https://docs.upstash.com/redis)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Cloudflare WebSocket API](https://developers.cloudflare.com/workers/runtime-apis/websockets)
- [Upstash Discord](https://upstash.com/discord)
