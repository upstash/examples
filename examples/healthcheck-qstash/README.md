---
title: Health Check Application
products: ["redis", "qstash"]
languages: ["ts"]
stack: ["Next.js"]
platforms: ["Vercel"]
use_cases: ["Task Scheduling", "State Store"]
preview_url: https://healthcheck.upstash.app
deploy_to_vercel_url: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fupstash%2Fhealthcheck-example&env=QSTASH_CURRENT_SIGNING_KEY,QSTASH_NEXT_SIGNING_KEY,NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN,QSTASH_REST_TOKEN,APP_URL
"
author: "fahreddinozcan"
---

<br />
<div align="center">

  <h3 align="center">Health Check Application</h3>

  <p align="center">
    Create an serverless health check service using QStash and Upstash Redis
  </p>
</div>

Welcome! This example showcases a uptime monitoring system to observe the stability of your API endpoints and web applications. It uses QStash for task scheduling, Upstash Redis as state store and Next.js, combined with beautiful ShadnUI.

# Project Details

The goal of this project is to create a serverless uptime status checker, without any long running server. To achieve this, we deploy Vercel Edge functions with Next.js, and schedule a job to this endpoints with QStash. Within these functions, we perform the ping operation and write the results to Upstash Redis using the proper data structures. On visit, we retrieve the data in Redis and render the page with Server Side Rendering. There are some additional features that uses Upstash management APIs.

## Scheduling Health Check for Specific Endpoint

We will develop a system designed to consistently monitor the uptime of your endpoint or website. This includes the capability to create, modify, and delete schedules in QStash using its management API. The health and latency data collected will be securely stored in our Redis database, ensuring efficient tracking and accessibility.

## Storing the Data

In this project, we'll utilize redis extensively. Initially, we'll implement state management using tokens. Each user, upon their first visit, will receive a unique token. This token will be instrumental in associating and storing user-specific data. We plan to utilize the Redis JSON structure to store our latency data along with precise timestamps, ensuring structured and searchable data storage. For the client-side, a long polling method will be employed to seamlessly fetch and update this data on our Next.js frontend, enabling real-time data interaction and display.

# Deployment

You can deploy the project using the **Deploy to Vercel** button located in the left sidebar. Alternatively, you can initiate the deployment by creating a new repository from the source code. To deploy, you'll need the credentials below in your environment variables. It's possible to get the necessary credentials from Upstash Console.

```
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
NEXT_PUBLIC_UPSTASH_REDIS_REST_URL=
NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN=
QSTASH_REST_TOKEN=
APP_URL=<YOUR_DEPLOYMENT_URL>
```

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
