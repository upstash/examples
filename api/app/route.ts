import { allExamples } from "contentlayer/generated";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  return NextResponse.json(
    allExamples.map((e) => {
      var exampleItem = {
        id: e._id,
        title: e.title,
        products: e.products,
        stack: e.stack,
        useCases: e.use_cases,
        body: e.body.raw,
        githubUrl: e.github_url,
        author: e.author,
      }
      
      if (e.preview_url) {
        exampleItem.previewUrl = e.preview_url
      }

      if (e.blog_url) {
        exampleItem.blogUrl = e.blog_url
      }

      return exampleItem;
    }),
  );
}
