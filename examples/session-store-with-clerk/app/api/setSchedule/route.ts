import { NextResponse } from "next/server";
import { EmailTemplate } from "@/app/components/email-template";
import { auth } from "@clerk/nextjs";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(request: Request) {
  const body = await request.text();
  const { mail_type, delay, user, items } = JSON.parse(body);
  const mailID = await redis.get(`${mail_type}:${user.ID}`);
  if (mailID) return;

  const APP_URL = "https://shop.upstash.app/api/send";
  const res = await fetch(`https://qstash.upstash.io/v1/publish/${APP_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      "Upstash-Delay": delay,
    },
    body: JSON.stringify({
      mail_type,
      itemIDs: items,
      user,
    }),
  });

  redis.set(`${mail_type}:${user.ID}`, res);

  return NextResponse.json("OK");
}

export async function DELETE(request: Request) {
  const body = await request.text();
  const { mail_type, user } = JSON.parse(body);

  const MESSAGE_ID = redis.get(`${mail_type}:${user.ID}`);

  const res = await fetch(
    `https://qstash.upstash.io/v1/messages/${MESSAGE_ID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      },
    }
  );

  return NextResponse.json("OK");
}
