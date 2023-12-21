"use client";

import { Button } from "@/components/ui/button";
import { RedisClient } from "../libs/redis-client";

const redis = RedisClient();

export const ResetDataButton = ({
  sessionToken,
  url,
}: {
  sessionToken: string;
  url: string;
}) => {
  const resetPingData = async () => {
    const res = await redis.json.clear(`ping_data:${sessionToken}:${url}`, "$");
    return res;
  };
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        resetPingData();
      }}
    >
      Reset
    </Button>
  );
};
