"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export function DoAuth({ session }: { session: Session | null }) {
	const [loading, setLoading] = useState(false);
	return (
		<>
			{session ? (
				<div className="space-y-4">
					<div className="flex flex-col items-center gap-y-2">
						<div className="relative w-40 h-40">
							<Image fill src={session.user?.image as string} alt={session.user?.name as string} />
						</div>
						<span className="text-xl font-bold">{session.user?.name}</span>
						<span className="text-gray-400">{session.user?.email}</span>
					</div>
					<button
						className="bg-slate-800 w-full hover:bg-slate-700 text-gray-100 font-bold py-2 px-4 rounded"
						onClick={() => signOut()}
					>
						Sign out
					</button>
				</div>
			) : (
				<button
					className="bg-slate-800 hover:bg-slate-700 text-gray-100 font-bold py-2 px-4 rounded"
					onClick={() => {
						signIn("github");
						setLoading(true);
					}}
					disabled={loading}
				>
					{loading ? "Sigining in..." : "Sign in with GitHub"}
				</button>
			)}
		</>
	);
}
