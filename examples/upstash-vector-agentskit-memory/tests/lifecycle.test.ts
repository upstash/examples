import { describe, expect, it, vi } from 'vitest'
import { upstashVector } from '@agentskit/memory'
import { runMemoryLifecycle, sampleDocuments } from '../src/lifecycle.js'

describe('Upstash Vector memory lifecycle', () => {
  it('stores, retrieves, and removes the example documents', async () => {
    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const path = new URL(String(input)).pathname
      const body = path.endsWith('/query')
        ? {
            result: [
              {
                id: 'portable-runtime',
                score: 0.99,
                metadata: {
                  content: sampleDocuments[0].content,
                  topic: 'portability',
                },
              },
            ],
          }
        : { result: 'Success' }

      return new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    })
    const memory = upstashVector({
      url: 'https://example-vector.upstash.io',
      token: 'test-token',
      topK: 2,
      fetch: fetchMock,
    })

    const matches = await runMemoryLifecycle(memory)

    expect(fetchMock).toHaveBeenCalledTimes(4)
    expect(fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname)).toEqual([
      '/delete',
      '/upsert',
      '/query',
      '/delete',
    ])
    expect(matches).toEqual([
      {
        id: 'portable-runtime',
        content: sampleDocuments[0].content,
        metadata: {
          content: sampleDocuments[0].content,
          topic: 'portability',
        },
        score: 0.99,
      },
    ])
  })
})
