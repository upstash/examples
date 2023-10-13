import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type FeedbackFormEmailProps = {
  message: string;
  email: string;
  name: string;
  number: string;
};

export default function FeedbackFormEmail({
  message,
  email,
  name,
  number,
}: FeedbackFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your site</Preview>
      <Tailwind>
        <Body className="bg-gray-200 text-zinc-700">
          <Container>
            <Section className="bg-neutral-100 border border-gray-700 my-10 px-10 py-4 rounded-md">
              <Heading className="px-5 py-3">
                You received the following message from {name}
              </Heading>
              <Text className="px-5 capitalize">Sender's name: {name}</Text>
              <Hr />
              <Text className="px-5">Sender's number: {number}</Text>
              <Text className="px-5">Sender's email is: {email}</Text>
              <Hr />
              <Text className="px-5">Message: {message}</Text>
              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// This is what you email will receive look like.
