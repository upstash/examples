"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditForm } from "./EditForm";
import { useToast } from "@/components/ui/use-toast";
import * as zod from "zod";
import { CreateScheduleRequest } from "@upstash/qstash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RedisClient } from "../libs/redis-client";

const redis = RedisClient();

export const EditDialog = ({
  sessionToken,
  url,
  schedule,
  create,
}: {
  sessionToken: string;
  url: string;
  schedule: string;
  create: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = async (
    scheduleRequest: CreateScheduleRequest,
    create: boolean
  ) => {
    await fetch("/api/updateSchedule", {
      method: "POST",
      body: JSON.stringify({ ...scheduleRequest, sessionToken, create }),
    });
    if (url !== scheduleRequest.destination || create) {
      await redis.json.set(
        `ping_data:${sessionToken}:${scheduleRequest.destination}`,
        "$",
        []
      );
    }

    await redis.hset(`session_data:${sessionToken}`, {
      url: scheduleRequest.destination,
    });

    router.refresh();
  };

  function onSubmitCreate(data: zod.infer<typeof formSchema>) {
    handleSubmit(
      {
        destination: data.url,
        cron: data.schedule,
      },
      true
    );
    toast({
      title: "Success!",
      description: "Your healthcheck has been updated.",
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  const formSchema = zod.object({
    url: zod
      .string({ required_error: "Please input an URL." })
      .url({ message: "Please input a valid URL." }),
    schedule: zod.string(),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmitEdit(data: zod.infer<typeof formSchema>) {
    handleSubmit(
      {
        destination: data.url,
        cron: data.schedule,
      },
      false
    );

    if (data.url !== url) {
      redis.hset(`session_data:${sessionToken}`, { url: data.url });
    }
    if (data.schedule !== schedule) {
      redis.hset(`session_data:${sessionToken}`, { schedule: data.schedule });
    }
    toast({
      title: "Success!",
      description: "Your healthcheck has been updated.",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={create ? "default" : "outline"}
          className="whitespace-nowrap"
        >
          {create ? "Create Schedule" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Healthcheck</DialogTitle>
          <DialogDescription>
            Make changes to the healthcheck here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <EditForm
          onSubmit={create ? onSubmitCreate : onSubmitEdit}
          url={url}
          schedule={schedule}
          form={form}
          isValid={form.formState.isValid}
          create={create}
        />
      </DialogContent>
    </Dialog>
  );
};
