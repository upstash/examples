import FeedbackFormEmail from "@/email/create-email-from-form";
import ResponseBackEmail from "@/email/response-back";
import { rateLimit } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const id = req.ip ?? "anonymous";
    const { success } = await rateLimit(id);
    if (!success) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const { email, message, name, number } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!number) {
      return new NextResponse("Number is required", { status: 400 });
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@upstash.app>",
      to: "YOUR_EMAIL_WITH_WHICH_YOU_HAVE_CREATED_THE_ACCOUNT_IN_RESEND[If you are using the free plan and do not have verified domain]",
      subject: `${name} send you this message.`,
      reply_to: email,
      react: React.createElement(FeedbackFormEmail, {
        message: message,
        email: email,
        name: name,
        number: number,
      }),
    });

    await resend.emails.send({
      from: "Upstash Team <feedback@upstash.app>",
      to: `${email}`,
      subject: "Submission Confirmation From Upstash Team",
      react: React.createElement(ResponseBackEmail, {
        name: name,
      }),
    });
    return NextResponse.json("SUBMITTED");
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
