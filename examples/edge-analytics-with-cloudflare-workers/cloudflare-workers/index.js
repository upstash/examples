addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request).catch((err) => new Response(err.stack, { status: 500 })));
});

const endpoint = "REPLACE_UPSTASH_REST_ENDPOINT";
const token = "REPLACE_UPSTASH_REST_TOKEN";

async function recordRequest(request) {
  const d = new Date();
  const datestr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const data = [["url", request.url], ...request.headers];
  const url = `${endpoint}/lpush/${datestr}`;
  const init = {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(url, init);
}

async function handleRequest(request) {
  recordRequest(request);
  return new Response("My Awesome Website");
}
