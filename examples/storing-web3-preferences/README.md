---
title: Web3 Preferences
products: ["redis"]
stack: ["Next.js", "metamask"]
use_cases: ["Storage"]
author: "burak-upstash"
---


<br />
<div align="center">


  <h3 align="center">Web3 Preferences</h3>

  <p align="center">
    Store user preferences in Upstash Redis for Web3 applications

  </p>
</div>


Web app that users connect to via Metamask. Using public adresses of the wallet, stores cross or in-platform preferences.



## Demo

<!-- Add a link to the deployed example, reach out to @chronark for help -->
[url](url)




## Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fupstash%2Fexamples%2Ftree%2Fmaster%2Fexamples%2Fweb3-preferences&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17)

Or run manually:

1. Clone the repo
   ```sh
   git clone https://github.com/upstash/examples.git
   cd examples/storing-web3-preferences
   ```
2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Enter your secrets in `.env`
   ```.env
   UPSTASH_REDIS_REST_URL=""
   UPSTASH_REDIS_REST_TOKEN=""
   ```

4. Run the app
   ```sh
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




### Learn More

To learn more about Upstash and its services, check out the following resources:

- [Documentation](https://docs.upstash.com)
- [Website](https://upstash.com)
- [Blog](https://upstash.com/blog)
- [Console](https://console.upstash.com)
- [Discord](https://upstash.com/discord)
