import { auth, signIn, signOut } from "@/lib/auth";
import Form from "next/form";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-900 text-gray-100 gap-y-20 p-24">
      <h1 className="md:leading-snug text-3xl max-w-[1000px] md:text-5xl  [&>a]:text-green-500 font-bold text-center">
        <a href="https://nextjs.org" target="_blank">
          Next.js
        </a>{" "}
        Authentication with{" "}
        <a href="https://authjs.dev/" target="_blank">
          Auth.js{" "}
        </a>{" "}
        +{" "}
        <a href="https://upstash.com/" target="_blank">
          Upstash Redis
        </a>
      </h1>

      {session ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-xl font-bold">{session.user?.name}</span>
            <span className="text-gray-400">{session.user?.email}</span>
          </div>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignOutButton() {
  return (
    <Form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="bg-slate-800 w-full hover:bg-slate-700 text-gray-100 font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign out
      </button>
    </Form>
  );
}

function SignInButton() {
  return (
    <Form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <button
        className="bg-slate-800 hover:bg-slate-700 text-gray-100 font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign in with GitHub
      </button>
    </Form>
  );
}
