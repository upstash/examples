// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch("https://full-mantis-14981-us1-rest-kafka.upstash.io/produce/newtopic/MESSAGE", {
    headers: {
      Authorization: "Basic Wm5Wc2JDMXRZVzR2szT0ZkanZlWUhCVjlKanpvdzAzU25VdFJROjQtUi9ldTlUalFCT09MNG5qZlNLd0VzRTEwWXZITWlXNjNoRmxqcVVycnE1X3lBcTRUUEdkOWM2SmJxZlE9PQ=="
    }
  }).then(response => response.json())
      .then(data => {
        console.log(data)
      });

  res.status(200).json({ name: 'John Doe' })
}
