import * as cdk from "@aws-cdk/core";
import { HttpApiStack } from "./stack";

class ApiStack extends HttpApiStack {}

const app = new cdk.App();

new ApiStack(app, "upstashApi", {
  description: "Testing HTTP Api GET with Upstash",
});

app.synth();
