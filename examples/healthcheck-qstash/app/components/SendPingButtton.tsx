"use client";

import { Button } from "@/components/ui/button";

export const SendPingButton = ({
  url,
  sessionToken,
}: {
  url: string;
  sessionToken: string;
}) => {
  return (
    <Button
      variant={"default"}
      onClick={async () => {
        await fetch("/api/ping", {
          method: "POST",
          body: JSON.stringify({ url, sessionToken }),
        });
      }}
      className="whitespace-nowrap"
    >
      Send Ping
    </Button>
  );
};
