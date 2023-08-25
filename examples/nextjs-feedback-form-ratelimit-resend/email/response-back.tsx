import { Body, Head, Html, Link, Preview } from "@react-email/components";

type ResponseBackEmailProps = {
  name: string;
};

export default function ResponseBackEmail({ name }: ResponseBackEmailProps) {
  return (
    <Html>
      <Head>
        <Preview>Thank you for the Feedback</Preview>
        <Body>
          Hey {name}!
          <br />
          <br />
          Thank you for you feedback.
          <br />
          <br />
          <br />
          Upstash Team
          <br />
        </Body>
      </Head>
    </Html>
  );
}
