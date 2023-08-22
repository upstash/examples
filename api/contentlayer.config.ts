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
    stack: { type: "list", of: { type: "string" }, required: true },
    use_cases: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean" },
    author: { type: "string", required: true },
  },
  computedFields: {
    github_url: {
      type: "string",
      resolve: (doc: any) => `https://github.com/upstash/examples/blob/main/examples/${doc._raw.flattenedPath}.md`,
    }, //   https://github.com/upstash/examples/blob/main/examples/redis-with-nextjs/README.md
  },
}));

export default makeSource({
  contentDirPath: "../examples",
  contentDirExclude: ["**/node_modules", "."],
  documentTypes: [Example],
});
