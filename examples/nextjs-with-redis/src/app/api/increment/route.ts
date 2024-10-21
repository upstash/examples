import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis
const redis = Redis.fromEnv()

export const GET = async () => {
  const identifier = 'api_call_counter';

  try {
    // Increment the API call counter and get the updated value
    const count = await redis.incr(identifier);

    // Optionally, you can also retrieve other information like the last time it was called
    const lastCalled = await redis.get('last_called');
    const lastCalledAt = lastCalled || 'Never';

    // Store the current timestamp as the last called time
    await redis.set('last_called', new Date().toISOString());

    // Return the count and last called time
    return new NextResponse(
      JSON.stringify({
        success: true,
        count: count,
        lastCalled: lastCalledAt,
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error('Redis error:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Error interacting with Redis',
      }),
      { status: 500 }
    )
  }
}
