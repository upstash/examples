---
title: Rate Limiting OpenAI Requests
products: ["redis"]
stack: ["Flask"]
use_cases: ["Ratelimit", "OpenAI"]
languages: ["py"]
author: "fahreddinozcan"
---

<br />
<div align="center">

  <h3 align="center">Ratelimiting OpenAI Requests</h3>

  <p align="center">
    This Flask project implements a rate-limited OpenAI story generation API using Upstash Redis for rate limiting and OpenAI GPT-3 for generating complete stories.

  </p>
</div>

## Getting Started

### Prerequisites

In order to run this locally, you will need python installed and an Upstash Redis database.
If you don't have a database ready, you can learn how to do it [here](https://docs.upstash.com/redis)

### Quickstart

1. Clone the repo

   ```sh
   $ git clone https://github.com/upstash/examples.git
   $ cd examples/ratelimiting-python-openai
   ```

2. Install the requirements
   ```sh
   $ pip install -r requirements.txt
   ```
3. Create the environment variables
   ```sh
   $ export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
   $ export UPSTASH_REDIS_REST_URL=<YOUR_UPSTASH_REDIS_REST_URL>
   $ export UPSTASH_REDIS_REST_TOKEN=<YOUR_UPSTASH_REDIS_REST_TOKEN>
   ```
4. Run the Flask server

   ```sh
   $ cd api
   $ flask --app server run
   ```

5. Send requests repeatedly and test the rate limit
   ```sh
   $ curl http://127.0.0.1:5000/openai
   ```

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
