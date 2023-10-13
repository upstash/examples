import redis, { databaseName } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { todo, status } = body;
    if (!todo) {
      return new NextResponse("Todo content is required", { status: 400 });
    }
    if (!params.id) {
      return new NextResponse("Todo key is required", { status: 400 });
    }
    const key = params.id;
    const newValue = JSON.stringify({ todo, status });
    await redis.hset(databaseName, { [key]: newValue });
    return NextResponse.json({ message: "Updated" });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Todo Id is required", { status: 403 });
    }
    await redis.hdel(databaseName, params.id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
