import { NextRequest, NextResponse } from "next/server";
import { RedisClient } from "@/app/libs/redis-client";
import type { CreateScheduleRequest } from "@upstash/qstash";

const qstashRestToken = process.env.QSTASH_REST_TOKEN as string;

const redis = RedisClient();

const listSchedules = async () => {
  const res = await fetch("https://qstash.upstash.io/v2/schedules", {
    headers: {
      Authorization: `Bearer ${qstashRestToken}`,
    },
  });
  const schedules = await res.json();
  return schedules;
};

const removeSchedule = async (scheduleId: string) => {
  const res = await fetch(
    `https://qstash.upstash.io/v2/schedules/${scheduleId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${qstashRestToken}`,
      },
    }
  );
  return res;
};

const getSchedule = async (scheduleId: string) => {
  const res = await fetch(
    `https://qstash.upstash.io/v2/schedules/${scheduleId}`,
    {
      headers: {
        Authorization: `Bearer ${qstashRestToken}`,
      },
    }
  );
  const schedule = await res.json();
  return schedule;
};

const createSchedule = async (
  schedule: CreateScheduleRequest,
  sessionToken: string
) => {
  const res = await fetch(
    `https://qstash.upstash.io/v2/schedules/${process.env.APP_URL}/edge/ping`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${qstashRestToken}`,
        "Upstash-Cron": schedule.cron,
      },
      body: JSON.stringify({
        url: schedule.destination,
        sessionToken: sessionToken,
      }),
    }
  );

  const createdScheduleId = await res.json();

  return createdScheduleId;
};
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sessionToken, create } = body;

  if (!create) {
    const currentScheduleId = (await redis.hget(
      `session_data:${sessionToken}`,
      "scheduleId"
    )) as string;
    const lastSchedule = await getSchedule(currentScheduleId);

    await removeSchedule(lastSchedule.scheduleId);
  }

  const newSchedule = await createSchedule(body, sessionToken);

  await redis.hset(`session_data:${sessionToken}`, {
    scheduleId: newSchedule.scheduleId,
    url: body.destination,
    schedule: body.cron,
  });

  const finalSchedules = await listSchedules();

  return NextResponse.json({ finalSchedules });
}
