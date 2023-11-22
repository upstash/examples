---
title: NestJS Url Shortener with Upstash Redis
products: ["redis"]
stack: ["Node.js"]
languages: ["ts"]
use_cases: ["State Store"]
author: "ogzhanolguncu"
---

# NestJS Upstash Redis URL Shortener

A simple URL shortener implemented in NestJS using Upstash Redis.

## Overview

This repo guides you through the process of building a URL shortener with NestJS and utilizing Upstash Redis for efficient storage and retrieval.

## Features

- **Shorten URL**: POST requests to `/shorten` with the original URL to get a shortened version.
- **Retrieve Shortened URL**: GET requests to `/get-shortened-url/:id` to retrieve the original URL associated with the provided ID.
- **Retrieve All Shortened URLs**: GET requests to `/get-all-shortened-url/:id` to retrieve all URLs associated with a specific ID.


See the <a href="https://upstash.com/blog/nestjs-redis-url-shortener">tutorial</a> for details.

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
