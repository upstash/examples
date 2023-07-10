import { getServerSession } from "next-auth";
import { DoAuth } from "./components/do-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	return (
		<main className="flex min-h-screen flex-col items-center bg-slate-900 text-gray-100 gap-y-20 p-24">
			<h1 className="md:leading-snug text-3xl max-w-[1000px] md:text-5xl  [&>a]:text-green-500 font-bold text-center">
				<a href="https://nextjs.org" target="_blank">
					Next.js
				</a>{" "}
				Authentication with{" "}
				<a href="https://next-auth.js.org/" target="_blank">
					NextAuth.js{" "}
				</a>{" "}
				+{" "}
				<a href="https://upstash.com/" target="_blank">
					Serverless Redis by Upstash
				</a>
			</h1>

			<DoAuth session={session} />
		</main>
	);
}
