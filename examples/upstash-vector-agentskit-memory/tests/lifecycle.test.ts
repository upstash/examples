import { describe, expect, it, vi } from 'vitest'
import { upstashVector } from '@agentskit/memory'
import { runMemoryLifecycle, sampleDocuments } from '../src/lifecycle.js'

describe('Upstash Vector memory lifecycle', () => {
  function createMemory(queryResults: Array<Array<Record<string, unknown>>>) {
    let queryCall = 0
    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const path = new URL(String(input)).pathname
      const body = path.endsWith('/query')
        ? { result: queryResults[queryCall++] ?? [] }
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

    return { fetchMock, memory }
  }

  const match = {
    id: 'portable-runtime',
    score: 0.99,
    metadata: {
      content: sampleDocuments[0].content,
      topic: 'portability',
    },
  }

  it('stores, retrieves, and removes immediately visible documents', async () => {
    const { fetchMock, memory } = createMemory([[match]])

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

  it('retries while stored documents are still being indexed', async () => {
    const { fetchMock, memory } = createMemory([[], [match]])
    const sleep = vi.fn(async () => {})

    const matches = await runMemoryLifecycle(memory, {
      maxSearchAttempts: 3,
      retryDelayMs: 25,
      sleep,
    })

    expect(fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname)).toEqual([
      '/delete',
      '/upsert',
      '/query',
      '/query',
      '/delete',
    ])
    expect(sleep).toHaveBeenCalledOnce()
    expect(sleep).toHaveBeenCalledWith(25)
    expect(matches[0]?.id).toBe('portable-runtime')
  })

  it('cleans up and fails after the search retry budget is exhausted', async () => {
    const { fetchMock, memory } = createMemory([[], [], []])
    const sleep = vi.fn(async () => {})

    await expect(runMemoryLifecycle(memory, {
      maxSearchAttempts: 3,
      retryDelayMs: 25,
      sleep,
    })).rejects.toThrow('Stored documents were not visible after 3 search attempts')

    expect(fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname)).toEqual([
      '/delete',
      '/upsert',
      '/query',
      '/query',
      '/query',
      '/delete',
    ])
    expect(sleep).toHaveBeenCalledTimes(2)
  })
})
