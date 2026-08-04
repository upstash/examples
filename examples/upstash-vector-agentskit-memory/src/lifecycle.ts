import type { upstashVector } from '@agentskit/memory'

type UpstashMemory = ReturnType<typeof upstashVector>

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

export async function runMemoryLifecycle(memory: UpstashMemory) {
  const ids = sampleDocuments.map((document) => document.id)
  const remove = memory.delete
  if (!remove) throw new Error('This example requires a memory backend with delete support')

  await remove(ids)
  await memory.store(sampleDocuments)

  try {
    return await memory.search([1, 0, 0], { topK: 2 })
  } finally {
    await remove(ids)
  }
}
