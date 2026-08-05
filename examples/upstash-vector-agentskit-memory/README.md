---
title: "Agent memory with AgentsKit and Upstash Vector"
products: ["vector"]
stack: ["Node.js", "TypeScript", "AgentsKit"]
languages: ["ts"]
use_cases: ["Vector Search", "AI Agents"]
author: "EmersonBraun"
---

# Agent memory with AgentsKit and Upstash Vector

This minimal TypeScript example uses Upstash Vector as a serverless memory
backend for an agent. It exercises the complete lifecycle: store three
documents, retrieve the closest context, print the result, and remove the demo
documents.

The example uses small deterministic vectors so the memory boundary is easy to
inspect. Replace them with vectors from any embedding provider in an
application; the Upstash index and AgentsKit memory contract stay unchanged.

## Prerequisites

- Node.js 20 or newer
- An Upstash Vector index configured for three-dimensional vectors

## Run the example

```bash
cp .env.example .env
npm install
node --env-file=.env --import tsx src/index.ts
```

Set `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` in `.env` before
running. Upstash Vector indexes new records asynchronously, so the example
retries the search at one-second intervals for up to five attempts while the
stored records become
queryable. It deletes its sample records before and after the run, including
when indexing does not complete within that retry window, so repeated
executions do not leave demo data behind.

## Validate without credentials

```bash
npm run typecheck
npm test
```

The deterministic test exercises the Upstash REST boundary and verifies the
store, query, and cleanup sequence without contacting a live index.

## Learn more

- [Upstash Vector documentation](https://upstash.com/docs/vector)
- [AgentsKit memory documentation](https://www.agentskit.io/docs/memory)
