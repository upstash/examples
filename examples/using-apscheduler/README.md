---
title: Apscheduler with Upstash Redis
products: ["redis"]
stack: ["Python","Apscheduler"]
use_cases: ["scheduling", "Coin price monitoring", "notification"]
author: "burak-upstash"
---


<br />
<div align="center">


  <h3 align="center">Apscheduler with Upstash Redis</h3>

  <p align="center">
    Flask & Celery job processing with Upstash Redis for background tasks and result storage.

  </p>
</div>


[Apscheduler](https://github.com/agronholm/apscheduler) with Upstash Redis

For this example, we are running scheduled processing, where we fetch 'eth' and 'btc' coin prices (mocked up by random int generation - since many APIs exist).

Whenever the current value is above the threshold value, the process sends a notification to the email given (emulated by console logging.)

### Install Dependencies
`pip install -r requirements.txt`

### Start the process
`python3 main.py --clear` (remove `--clear` not to erase scheduled jobs)

### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
