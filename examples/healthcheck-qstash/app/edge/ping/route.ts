import { NextResponse, NextRequest } from "next/server";
import { verifySignatureEdge } from "@upstash/qstash/dist/nextjs";
import axios from "axios";
import { RedisClient } from "@/app/libs/redis-client";

const redis = RedisClient();

export const POST = verifySignatureEdge(handler);

async function handler(request: NextRequest) {
  const { url, sessionToken } = await request.json();

  const currentDate = new Date();
  const time =
    currentDate.getHours().toString().padStart(2, "0") +
    ":" +
    currentDate.getMinutes().toString().padStart(2, "0");
  const currentTime = Date.now();

  await axios.get(`${url}`);
  const pingTime = Date.now() - currentTime;

  const pingData = {
    time: time,
    ping: pingTime,
  };

  await redis.json.arrappend(
    `ping_data:${sessionToken}:${url}`,
    "$",
    JSON.stringify(pingData)
  );

  return NextResponse.json({ ping: pingTime, time: time });
}
