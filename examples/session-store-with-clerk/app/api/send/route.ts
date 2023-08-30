import { EmailTemplate } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { items } from "@/public/items";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

const redis = Redis.fromEnv()


const resend = new Resend(process.env.RESEND_API_KEY);

type mailType =
  | "item-interest"
  | "shipment"
  | "items-to-rate"
  | "forgot-items-in-cart";
export async function POST(request: Request) {
  const mailSubject: Record<mailType, string> = {
    "item-interest": "Item Interest",
    shipment: "Your items are shipped!",
    "forgot-items-in-cart": "Come back!",
    "items-to-rate": "Would you like to rate your purchase?",
  };
  const body = await request.text();
  const { mail_type, itemIDs, user } = JSON.parse(body);

  let itemsData;
  if (mail_type === "shipment") {
    itemsData = itemIDs.map((itemID: string) => {
      return items.find((i) => i.id.toString() == itemID);
    });
  } else {
    itemsData = redis.smembers(`${mail_type}:${user.userID}`);
  }
  redis.del(`${mail_type}:${user.userID}`);

  const data = await resend.emails.send({
    from: "ShopStash <onboarding@resend.dev>",
    to: [user.emailAddress],
    subject: mailSubject[mail_type as mailType],
    react: EmailTemplate({ user, mail_type, itemsData }),
    text: "text",
  });

  return NextResponse.json("OK");
}
