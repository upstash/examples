import { Kafka } from "@upstash/kafka";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  console.log("START", request);

  const kafka = new Kafka({
    url: UPSTASH_KAFKA_REST_URL,
    username: UPSTASH_KAFKA_REST_USERNAME,
    password: UPSTASH_KAFKA_REST_PASSWORD,
  });

  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/favicon")) {
    return fetch(request);
  }
  const p = kafka.producer();
  const message = { hello: "world" }; // Objects will get serialized using `JSON.stringify`
  const response = await p.produce("mytopic", message);

  return new Response(JSON.stringify(response));
}
