import { Toaster } from "@/components/ui/toaster";
import { UpstashLogo } from "@/public/upstash-logo";
import { MainCard } from "./components/MainCard";

export default function Home() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-between w-full h-screen">
        <MainCard />
        <p className="mt-5 text-center">
          This application is using QStash for serverless task scheduling, and
          Upstash Redis for storing the state. <br /> You can see the Github
          repository{" "}
          <a href="https://github.com" className="font-bold text-blue-500">
            here
          </a>{" "}
          to learn how to utilize Upstash products with Next.js Server Side
          Rendering.
        </p>
        <footer className="flex items-center justify-center w-full gap-3 py-4 bg-black">
          <span className="font-bold text-white">Powered by</span>
          <a href="https://www.upstash.com" target="_blank">
            <UpstashLogo />
          </a>
        </footer>
      </div>
    </>
  );
}
