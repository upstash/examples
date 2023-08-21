import { NextResponse } from "next/server";

import redis, { databaseName } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { todo } = body;

    if (!todo) {
      return new NextResponse("Todo content is required", { status: 400 });
    }
    const newId = Date.now().toString();
    const todos = JSON.stringify({ todo, status: false });
    await redis.hset(databaseName, { [newId]: todos });

    return NextResponse.json({ message: "Created" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
