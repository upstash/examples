// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch(
    "https://full-mantis-14981-us1-rest-kafka.upstash.io/produce/newtopic/MESSAGE",
    {
      headers: {
        Authorization: "Basic <YOUR_TOKEN>",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  res.status(200).json({ name: "John Doe" });
}
