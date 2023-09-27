---
title: Parallel Job Running with Huey
products: ["redis"]
languages: ["py"]
stack: ["Flask"]
use_cases: ["Queue"]
author: "burak-upstash"
---

<br />
<div align="center">

  <h3 align="center">Parallel Job Running with Huey</h3>

  <p align="center">
    Flask server for concurrent processing of user-submitted tasks using huey.

  </p>
</div>

# [Huey](https://github.com/coleifer/huey) Parallel Job Running

## Simple Parallel job running, using Flask and Huey.

In this example, we are configuring a Flask server, where there is `/submit` endpoint. This endpoint takes `email` and `string_to_process` parameters.

With this example, we are emulating a working processor server. Users send the input data for large computations that they cannot process themselves. (In this instance, using sleep for showcasing difficulty.)

When the POST request is made, server creates 2 Huey tasks (reverse the string and append itself to it). Tasks can be configured such that when the task is finished, a notification can be sent via different platforms.
(For the example instance, simply console logging.)

With this configuration, we can process same input with different processing techniques, enabling concurrency. Since the background jobs, server responsiveness won't be effected much by these requests.

### Install Dependencies

`pip install -r requirements.txt`

### Run Huey Worker

`huey_consumer.py tasks.huey`

### Generate the job

`curl -X POST http://localhost:5000/submit -H 'Content-Type: application/json' -d '{"email": "<email>", "string_to_process": "<string>"}'`

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
