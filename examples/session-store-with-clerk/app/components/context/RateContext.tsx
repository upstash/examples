"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { useToast } from "@/components/ui/use-toast";
import UserStateContext from "./UserStateContext";

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "10 s"),
  analytics: true,
});

interface RateContextProps {
  itemRates: string[];
  rateItem: (id: string, rate: string) => Promise<void>;
  resetItemRates: () => Promise<void>;
}
const RateContext = createContext<RateContextProps>({
  itemRates: [],
  rateItem: async (id: string, rate: string) => {},
  resetItemRates: async () => {},
});

export const RateProvider: any = ({
  children,
  userId,
}: {
  children: any;
  userId: string;
}) => {
  let itemCount = 0;

  const [itemRates, setItemRates] = useState<string[]>([]);
  const { triggerEvent } = useContext(UserStateContext);

  const identifier = userId;

  const { toast } = useToast();

  useEffect(() => {
    fetchItemRates();
  }, [itemCount]);

  const fetchItemRates = async () => {
    const itemRateData = await redis.lrange("item_rates", 0, -1);

    setItemRates(itemRateData);
  };

  const resetItemRates = async () => {
    redis.del("item_rates");
    redis.lpush("item_rates", 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5);

    fetchItemRates();
  };

  const rateItem = async (id: string, rate: string) => {
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      toast({
        title: "Ratelimited!",
        description:
          "You've reached the limit for rating an item. Please try again later!",
        variant: "destructive",
      });

      return;
    }
    await redis.lset("item_rates", parseInt(id) - 1, rate);
    triggerEvent("rate", parseInt(id));

    fetchItemRates();
  };

  return (
    <RateContext.Provider
      value={{
        itemRates,
        rateItem,
        resetItemRates,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

export default RateContext;
