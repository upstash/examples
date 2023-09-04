---
title: Ratelimiting python serverless functions on Vercel
products: ["redis"]
stack: ["Flask"]
languages: ["py"]
platforms: ["Vercel"]
use_cases: ["Ratelimit", "OpenAI"]
preview_url: "https://examples-ratelimiting-python-vercel.vercel.app"
author: "chronark"
---

<br />
<div align="center">

  <h3 align="center">Ratelimiting python serverless functions on Vercel</h3>

  <p align="center">
    Using Upstash Redis to add ratelimiting in python.

  </p>
</div>

## Demo

[Demo on Vercel](https://examples-ratelimiting-python-vercel.vercel.app)

## Getting Started

### Prerequisites

In order to run this locally, you will need python installed and an Upstash Redis database.
If you don't have a database ready, you can learn how to do it [here](https://docs.upstash.com/redis)

### Quickstart

1. Clone the repo
   ```sh
   $ git clone https://github.com/upstash/examples.git
   $ cd examples/ratelimiting-python-vercel
   ```
2. Create the project on Vercel

   ```sh
   $ vercel
   ```

3. Enter your secrets in Vercel
   ```.env
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""
   ```
4. Deploy to production

   ```sh
   $ vercel --prod
   ```

5. Visit the URL provided by Vercel and refresh a few times until you get ratelimited

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
