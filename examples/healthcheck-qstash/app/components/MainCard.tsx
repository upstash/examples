import { Redis } from "@upstash/redis";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Chart } from "./Chart";
import { Toaster } from "@/components/ui/toaster";
import { EditDialog } from "./EditDialog";
import { SendPingButton } from "./SendPingButtton";
import { ResetDataButton } from "./ResetDataButton";
import { cookies } from "next/headers";
import { RedisClient } from "../libs/redis-client";

const redis = RedisClient();

export async function MainCard() {
  const sessionToken = cookies().get("session_token")?.value as string;

  const sessionData = await redis.hgetall(`session_data:${sessionToken}`);

  const urlData = sessionData?.url as string;
  const scheduleData = sessionData?.schedule as string;
  const scheduleIdData = sessionData?.scheduleId as string;

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full gap-10 mt-20">
        <Card className="p-4 mt-5 w-min">
          <CardHeader>
            <CardTitle>Health Check</CardTitle>

            <Description
              url={urlData}
              cron={scheduleData}
              scheduleId={scheduleIdData}
            />
          </CardHeader>
          <CardContent>
            <Chart
              url={urlData}
              scheduleId={scheduleIdData}
              sessionToken={sessionToken}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex justify-between gap-2 w-min">
              {sessionToken && scheduleIdData ? (
                <>
                  <SendPingButton sessionToken={sessionToken} url={urlData} />
                  <EditDialog
                    sessionToken={sessionToken}
                    url={urlData}
                    schedule={scheduleData}
                    create={false}
                  />
                  <ResetDataButton url={urlData} sessionToken={sessionToken} />
                </>
              ) : (
                <EditDialog
                  url={urlData}
                  schedule={scheduleData}
                  sessionToken={sessionToken}
                  create={true}
                />
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

function Description({
  url,
  cron,
  scheduleId,
}: {
  url?: string;
  cron?: string;
  scheduleId?: string;
}) {
  const schedules: Record<string, string> = {
    "* * * * *": "every minute",
    "*/5 * * * *": "every 5 minutes",
    "*/10 * * * *": "every 10 minutes",
    "*/15 * * * *": "every 15 minutes",
    "*/30 * * * *": "every 30 minutes",
    "0 * * * *": "every hour",
  };
  return (
    <>
      <CardDescription>
        {scheduleId && url && cron ? (
          <>
            Currently making healthcheck for{" "}
            <span className="font-bold">{url}</span> with the frequency of{" "}
            <span className="font-bold">
              {schedules[cron]} ({cron})
            </span>
          </>
        ) : (
          <>
            This is an API healthcheck example created by Upstash using QStash,
            Redis and Next.js. Create a schedule to start.
          </>
        )}
      </CardDescription>
    </>
  );
}
