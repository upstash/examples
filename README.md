<div align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="118" height="118" fill="none">
    <g clip-path="url(#upstash_icon_white_bg)">
        <path fill="#00C98D" d="M15.105 102.66c19.416 19.416 50.895 19.416 70.311 0 19.416-19.415 19.416-50.895 0-70.31l-8.789 8.788c14.562 14.562 14.562 38.172 0 52.733-14.562 14.562-38.171 14.562-52.733 0l-8.789 8.789Z"/>
        <path fill="#00C98D" d="M32.683 85.083c9.708 9.707 25.447 9.707 35.155 0 9.708-9.708 9.708-25.448 0-35.156l-8.788 8.789c4.854 4.854 4.854 12.724 0 17.578-4.855 4.854-12.724 4.854-17.578 0l-8.79 8.789Z"/>
        <path fill="#00C98D" d="M102.994 14.771c-19.416-19.415-50.895-19.415-70.311 0-19.416 19.416-19.416 50.896 0 70.312l8.788-8.79c-14.561-14.561-14.561-38.17 0-52.733 14.562-14.562 38.172-14.562 52.734 0l8.789-8.789Z"/>
        <path fill="#00C98D" d="M85.416 32.35c-9.708-9.709-25.448-9.709-35.156 0-9.708 9.707-9.708 25.447 0 35.155l8.79-8.79c-4.855-4.853-4.855-12.723 0-17.577 4.853-4.854 12.723-4.854 17.577 0l8.789-8.789Z"/>
        <path fill="#fff" fill-opacity=".4" d="M102.994 14.771c-19.416-19.415-50.896-19.415-70.312 0-19.416 19.416-19.416 50.896 0 70.312l8.79-8.79c-14.563-14.561-14.563-38.17 0-52.733 14.561-14.562 38.17-14.562 52.732 0l8.79-8.789Z"/>
        <path fill="#fff" fill-opacity=".4" d="M85.416 32.35c-9.708-9.709-25.448-9.709-35.156 0-9.708 9.707-9.708 25.447 0 35.155l8.79-8.79c-4.855-4.853-4.855-12.723 0-17.577 4.853-4.854 12.723-4.854 17.577 0l8.789-8.789Z"/>
    </g>
    <defs>
        <clipPath id="upstash_icon_white_bg">
            <path fill="#fff" d="M15 0h88v117.333H15z"/>
        </clipPath>
    </defs>
</svg>
    <h1 align="center">Upstash Examples</h1>
</div>

<br/>

A collection of examples to show how to use Upstash with different technologies.

These examples will automatically be featured on our website and will be used in our documentation.


[Go to examples](https://github.com/upstash/examples/blob/main/examples)







## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/upstash/examples/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/upstash/examples/pull) to add new examples/make quality-of-life improvements/fix bugs.


## Adding an example

You can add a new example by creating a directory inside [/examples](https://github.com/upstash/examples/tree/main/examples/).

Please give the directory a descriptive name, it should include the product used and the most relevant tech and/or usecase.

To create an example, you can create an app inside this folder, for example via `npm create-next-app ...` or similar and make the necessary changes to the code.

### README.md
Please ensure you update the `README.md` with the necessary metadata, an explanation of what it does and instructions on how to run the example.

The metadata needs be in the following format at the very top of the README:
```md
---
title: The name of the example
products: ["redis", "kafka", "qstash"]
stack: ["Next.js", "Vercel", "Supabase", "Deno"]
use_cases: ["Caching", "Ratelimiting"]
author: "your_github_username"
---
```

An example for the the README can be found [here](https://github.com/upstash/examples/blob/main/.github/README_TEMPLATE.md)


### .env

Almost all examples will need some sort of secret to run, for example a Redis url or token. Please make sure your example includes a `.env.example` file with the necessary environment variable names. For example:

```
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

## Authors


<a href="https://github.com/upstash/examples/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=upstash/examples" />
</a>
