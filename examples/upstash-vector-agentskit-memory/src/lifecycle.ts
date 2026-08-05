import type { upstashVector } from '@agentskit/memory'

type UpstashMemory = ReturnType<typeof upstashVector>

type LifecycleOptions = {
  maxSearchAttempts?: number
  retryDelayMs?: number
  sleep?: (delayMs: number) => Promise<void>
}

export const sampleDocuments = [
  {
    id: 'portable-runtime',
    content: 'Keep the agent runtime independent from the model provider.',
    embedding: [1, 0, 0],
    metadata: { topic: 'portability' },
  },
  {
    id: 'serverless-memory',
    content: 'Use an HTTP vector database for serverless agent memory.',
    embedding: [0.9, 0.1, 0],
    metadata: { topic: 'memory' },
  },
  {
    id: 'evaluation-loop',
    content: 'Measure agent behavior before replacing a component.',
    embedding: [0, 0, 1],
    metadata: { topic: 'evaluation' },
  },
]

export async function runMemoryLifecycle(memory: UpstashMemory, options: LifecycleOptions = {}) {
  const ids = sampleDocuments.map((document) => document.id)
  const remove = memory.delete
  if (!remove) throw new Error('This example requires a memory backend with delete support')

  const maxSearchAttempts = options.maxSearchAttempts ?? 5
  const retryDelayMs = options.retryDelayMs ?? 1_000
  const sleep = options.sleep ?? ((delayMs: number) => new Promise((resolve) => setTimeout(resolve, delayMs)))

  await remove(ids)
  await memory.store(sampleDocuments)

  try {
    for (let attempt = 1; attempt <= maxSearchAttempts; attempt += 1) {
      const matches = await memory.search([1, 0, 0], { topK: 2 })
      if (matches.some((match) => ids.includes(match.id))) return matches
      if (attempt < maxSearchAttempts) await sleep(retryDelayMs)
    }

    throw new Error(`Stored documents were not visible after ${maxSearchAttempts} search attempts`)
  } finally {
    await remove(ids)
  }
}
