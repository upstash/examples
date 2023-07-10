addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === "GET") {
    return getLeaderboard();
  } else if (request.method === "POST") {
    return addScore(request);
  } else {
    return new Response("Invalid Request!");
  }
}

async function getLeaderboard() {
  const url = `https://us1-full-bug-31874.upstash.io/zrevrange/scores/0/1000/WITHSCORES/?_token=${TOKEN}`;

  const res = await fetch(new Request(url), {
    cf: {
      cacheTtl: 10,
      cacheEverything: true,
      cacheKey: url,
    },
  });
  return res;
}

async function addScore(request) {
  const { searchParams } = new URL(request.url);
  const player = searchParams.get("player");
  const score = searchParams.get("score");
  const url = `https://us1-full-bug-31874.upstash.io/zadd/scores/${score}/${player}?_token=${TOKEN}`;
  const res = await fetch(url);
  return new Response(await res.text());
}
