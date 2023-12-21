import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { RedisClient } from "@/app/libs/redis-client";

const redis = RedisClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { sessionToken } = data;
  const currentDate = new Date();
  const time =
    currentDate.getHours().toString().padStart(2, "0") +
    ":" +
    currentDate.getMinutes().toString().padStart(2, "0");

  const currentTime = Date.now();
  await axios.get(`${data.url}`);
  const pingTime = Date.now() - currentTime;

  const pingData = {
    time: time,
    ping: pingTime,
  };

  await redis.json.arrappend(
    `ping_data:${sessionToken}:${data.url}`,
    "$",
    JSON.stringify(pingData)
  );
  return NextResponse.json({ ping: pingTime, time: time });
}
