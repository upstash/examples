"use client";
import { useEffect, useState } from "react";
import { checkRatelimit, RatelimitResponse } from "./ratelimit";
import { useCountdown } from "usehooks-ts";
import { differenceInSeconds } from "date-fns";
import CodeBlock from "@/components/codeblock";
import Link from "next/link";

export default function Home() {
  const [state, setState] = useState<RatelimitResponse>();
  const [loading, setLoading] = useState(false);

  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: differenceInSeconds(new Date(state?.reset || new Date()), new Date()),
    intervalMs: 1000,
    countStop: 0,
  });

  // Function to handle the button click and make a new request
  const handleCheckRateLimit = async () => {
    stopCountdown();
    setLoading(true);

    const ratelimitResponse = await checkRatelimit();
    console.log("ratelimitResponse", ratelimitResponse);
    setState(ratelimitResponse);

    setLoading(false);
  };

  useEffect(() => {
    resetCountdown();
    startCountdown();
  }, [state]);

  return (
    <div className="text-stone-800 max-w-screen-sm mx-auto px-8 h-screen py-24 flex flex-col items-start gap-6">
      <h1 className="text-3xl font-bold">
        @upstash/ratelimit <br /> @upstash/redis
      </h1>
      <p className="text-balance">
        Rate limiting is a technique used to control the rate of traffic sent or received by a network.
      </p>

      <h3 className="text-xl font-bold">Code</h3>
      <CodeBlock>
        {`import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "30s"),
});

await ratelimit.limit(ip);
`}
      </CodeBlock>

      <h3 className="text-xl font-bold">Demo</h3>

      <div className="bg-stone-800 text-white p-6 rounded-xl w-full">
        <table className="w-full text-left text-sm font-mono">
          <thead>
            <tr>
              <th className="font-normal py-1 px-4 opacity-60">Success</th>
              <th className="font-normal py-1 px-4 opacity-60">Limit</th>
              <th className="font-normal py-1 px-4 opacity-60">Remaining</th>
              <th className="font-normal py-1 px-4 opacity-60">Reset</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-mono font-bold text-xl">
              <td className="py-1 px-4">{state ? state.success.toString() : "-"}</td>
              <td className="py-1 px-4">{state ? state.limit : "-"}</td>
              <td className="py-1 px-4">{state ? state.remaining : "-"}</td>
              <td className="py-1 px-4">{state ? count : "-"}</td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={handleCheckRateLimit}
          disabled={loading}
          className={`mt-4 px-6 h-10 w-full bg-white text-stone-800 font-bold rounded-lg ${loading && "opacity-50"}`}
        >
          Check Rate Limit
        </button>
      </div>

      <h3 className="text-xl font-bold">Links</h3>
      <div className="flex gap-x-2">
        <Link
          target="_blank"
          className="inline-flex items-center gap-2 bg-stone-200 font-bold rounded-lg px-5 h-10"
          href="https://github.com/upstash/examples/tree/main/examples/ratelimit-with-redis"
        >
          <svg viewBox="0 0 24 24" version="1.1" width="24" className="fill-current">
            <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z" />
          </svg>
          Source Code
        </Link>
        <Link
          target="_blank"
          className="inline-flex items-center gap-2 bg-stone-200 font-bold rounded-lg px-5 h-10"
          href="https://github.com/upstash/ratelimit-js"
        >
          <svg viewBox="0 0 24 24" version="1.1" width="24" className="fill-current">
            <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z" />
          </svg>
          Ratelimit SDK
        </Link>
        <Link
          target="_blank"
          className="inline-flex items-center gap-2 bg-stone-200 font-bold rounded-lg px-5 h-10"
          href="https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted"
        >
          <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-description">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" />
          </svg>
          Documentation
        </Link>
      </div>
      
    </div>
  );
}
