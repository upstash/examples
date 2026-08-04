import { upstashVector } from '@agentskit/memory'
import { runMemoryLifecycle } from './lifecycle.js'

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}`)
  return value
}

const memory = upstashVector({
  url: required('UPSTASH_VECTOR_REST_URL'),
  token: required('UPSTASH_VECTOR_REST_TOKEN'),
  topK: 2,
})
const matches = await runMemoryLifecycle(memory)

console.log(JSON.stringify(matches, null, 2))
