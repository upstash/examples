import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Example = defineDocumentType(() => ({
  name: "Example",
  filePathPattern: "./**/README.md",

  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    blog_url: { type: "string", required: false },
    preview_url: { type: "string", required: false },
    products: {
      type: "list",
      of: { type: "enum", options: ["redis", "kafka", "qstash"] },
      required: true,
    },
    stack: {
      type: "list",
      of: {
        type: "enum",
        options: [
          "Next.js",
          "Node.js",
          "React",
          "Svelte",
          "Remix",
          "React Native",
          "Serverless",
          "WebSocket",
          "Flask",
          "Nuxt.js",
          "Vue.js",
          "Redisson",
        ],
      },
      required: true,
    },
    platforms: {
      type: "list",
      of: {
        type: "enum",
        options: [
          "AWS",
          "Cloudflare",
          "Deno Deploy",
          "fly.io",
          "GCP",
          "Koyeb",
          "Netlify",
          "Vercel",
        ],
      },
      required: false,
    },
    languages: {
      type: "list",
      of: {
        type: "enum",
        options: ["ts", "js", "rs", "go", "py", "java"],
      },
      required: true,
    },
    use_cases: {
      type: "list",
      of: {
        type: "enum",
        options: [
          "Cache",
          "Ratelimit",
          "Data Storage",
          "Autocomplete",
          "Queue",
          "Counter",
          "State Store",
          "Session Management",
          "OpenAI",
          "Analytics",
          "Leaderboard",
          "Logging",
          "Authentication",
          "Web3",
          "Data Streaming",
        ],
      },
      required: true,
    },
    draft: { type: "boolean" },
    author: { type: "string", required: true },
  },
  computedFields: {
    github_url: {
      type: "string",
      resolve: (doc: any) =>
        `https://github.com/upstash/examples/blob/main/examples/${doc._raw.flattenedPath}.md`,
    },
  },
}));

export default makeSource({
  contentDirPath: "../examples",
  contentDirExclude: ["**/node_modules", "."],
  documentTypes: [Example],
});
