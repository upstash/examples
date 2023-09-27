import { allExamples } from "contentlayer/generated";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type ExampleResponseObject = {
  id: string;
  title: string;
  products: string[];
  stack: string[];
  useCases: string[];
  languages: string[];
  platforms?: string[];
  body: string;
  githubUrl: string;
  author: string;
  previewUrl?: string;
  blogUrl?: string;
};

export function GET(req: NextRequest) {
  return NextResponse.json(
    allExamples.map((e) => {
      let exampleObject: ExampleResponseObject = {
        id: e._id,
        title: e.title,
        products: e.products,
        stack: e.stack,
        useCases: e.use_cases,
        languages: e.languages,
        body: e.body.raw,
        githubUrl: e.github_url,
        author: e.author,
      };

      if (e.preview_url) {
        exampleObject.previewUrl = e.preview_url;
      }

      if (e.blog_url) {
        exampleObject.blogUrl = e.blog_url;
      }

      if (e.platforms) {
        exampleObject.platforms = e.platforms;
      }

      return exampleObject;
    })
  );
}
