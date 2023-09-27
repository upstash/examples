---
title: Ratelimiting with Vercel KV
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

  <h3 align="center">Ratelimiting with Vercel KV</h3>

  <p align="center">
    Ratelimit your serverless and edge functions with Vercel KV

  </p>
</div>

This example showcases how you can add serverless ratelimiting using [@upstash/ratelimit](https://github.com/upstash/ratelimit) and Vercel KV.

## Demo

[ratelimit-with-vercel-kv.vercel.app](https://ratelimit-with-vercel-kv.vercel.app/)

## Getting Started

### Prerequisites

All you need is a Vercel account and [Vercel KV database](https://vercel.com/storage/kv)

### Quickstart

1. Clone the repo
   ```sh
   git clone https://github.com/upstash/examples.git
   cd examples/examples
   ```
2. Install packages
   ```sh
   pnpm install
   ```
3. Enter your secrets in `.env`

   ```.env
   KV_URL=""
   KV_REST_API_URL=""
   KV_REST_API_TOKEN=""
   KV_REST_API_READ_ONLY_TOKEN=""

   ```

4. Run the app
   ```sh
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
