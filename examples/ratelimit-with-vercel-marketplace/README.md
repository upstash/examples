---
title: Ratelimiting with Upstash Redis on Vercel
products: ["redis"]
stack: ["Next.js"]
platforms: ["Vercel"]
languages: ["ts"]
use_cases: ["Ratelimit"]
preview_url: "https://ratelimit-with-vercel-kv.vercel.app/"
author: "chronark"
---

<br />
<div align="center">

  <h3 align="center">Ratelimiting with Upstash Redis on Vercel</h3>

  <p align="center">
    Ratelimit your serverless and edge functions with Upstash Redis on Vercel

  </p>
</div>

This example showcases how you can add serverless ratelimiting to a Next.js app on Vercel using [@upstash/ratelimit](https://github.com/upstash/ratelimit-js) and [@upstash/redis](https://github.com/upstash/redis-js).

## Demo

[ratelimit-with-vercel-kv.vercel.app](https://ratelimit-with-vercel-kv.vercel.app/)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fupstash%2Fexamples%2Ftree%2Fmain%2Fexamples%2Fratelimit-with-vercel-marketplace&project-name=ratelimit-with-vercel-marketplace&repository-name=ratelimit-with-vercel-marketplace&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22upstash%22%2C%22productSlug%22%3A%22upstash-kv%22%2C%22protocol%22%3A%22storage%22%7D%5D)

The button creates an Upstash Redis database through the Upstash integration and connects it to the new project.

## Getting Started

### Prerequisites

An Upstash Redis database, created either in the [Upstash Console](https://console.upstash.com) or through the [Upstash integration on Vercel](https://vercel.com/marketplace/upstash).

### Quickstart

1. Clone the repo
   ```sh
   git clone https://github.com/upstash/examples.git
   cd examples/examples/ratelimit-with-vercel-marketplace
   ```
2. Install packages
   ```sh
   pnpm install
   ```
3. Copy `.env.example` to `.env.local` and enter your database's REST URL and token. On Vercel, `vercel env pull .env.local` fills in the variables the integration set.

   ```.env
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""
   ```

4. Run the app
   ```sh
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://upstash.com/docs)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
