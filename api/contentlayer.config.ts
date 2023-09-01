import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Example = defineDocumentType(() => ({
  name: "Example",
  filePathPattern: "./**/README.md",

  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    blog_url: { type: "string", required: false },
    preview_url: { type: "string", required: false },
    products: { type: "list", of: { type: "enum", options: ["redis", "kafka", "qstash"] }, required: true },
    stack: {
      type: "list", of: {
        type: "enum", options: [
          "Next.js",
          "Remix",
          "Node.js",
          "Serverless",


        ]
      }, required: true
    },
    platforms: {
      type: "list", of: {
        type: "enum", options: [
          "AWS",
          "Cloudflare",
          "Deno Deploy",
          "fly.io",
          "GCP",
          "Koyeb",
          "Netlify",
          "Vercel",
        ]
      }, required: true
    },
    languages: {
      type: "list", of: {
        type: "enum", options: [
          "ts",
          "js",
          "rs",
          "go",
          "py"
        ]
      }, required: true
    },
    use_cases: {
      type: "list", of: {
        type: "enum", options: [
          "Cache",
          "Ratelimit",

        ]
      }, required: true
    },
    draft: { type: "boolean" },
    author: { type: "string", required: true },
  },
  computedFields: {
    github_url: {
      type: "string",
      resolve: (doc: any) => `https://github.com/upstash/examples/blob/main/examples/${doc._raw.flattenedPath}.md`,
    },
  },
}));

export default makeSource({
  contentDirPath: "../examples",
  contentDirExclude: ["**/node_modules", "."],
  documentTypes: [Example],
});

