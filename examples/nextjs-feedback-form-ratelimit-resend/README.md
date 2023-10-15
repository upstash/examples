---
title: Rate-limiting a feedback form.
products: ["redis"]
stack: ["Next.js"]
use_cases: ["Ratelimit"]
languages: ["ts"]
author: "trace2798"
---

This example show a way of how you can implement [rate-limiting](https://github.com/upstash/ratelimit) using Upstash. In this example the feedback form is rate-limited.

### Demo

[Demo]()

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/upstash/examples.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RESEND_API_KEY=

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `build` | To build your application                |
| `start` | Starts a production instance of the app  |

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
