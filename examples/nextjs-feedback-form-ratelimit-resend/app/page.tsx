import { FeedbackForm } from "@/components/feedback-form";
import { ModeToggle } from "@/components/mode-toggle";
import FeedbackFormEmail from "@/email/create-email-from-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <ModeToggle />
      <h1 className="text-xl font-semibold">Feedback Form</h1>
      <FeedbackForm />
      {/* <FeedbackFormEmail
        message="something"
        email="xyz@gmail.com"
        name="Trace"
        number="123456789"
      /> */}
    </main>
  );
}
