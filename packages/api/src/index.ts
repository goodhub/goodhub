import { config } from "dotenv";
config();

import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import organisationRouter from "./routers/organisation-router";
import personRouter from "./routers/person-router";
import feedRouter from "./routers/feed-router";
import forumRouter from "./routers/forum-router";
import postRouter from "./routers/post-router";
import iamRouter from "./routers/iam-router";
import imageRouter from "./routers/image-router";

import db from "./services/database-client";
import { adapter } from "./routers/trpc/adapter";

(async () => {
  await db();

  // Initialise logging & tracing
  // TODO: Move to application insights

  // Initialise all routers
  app.use("/api/organisations", organisationRouter);
  app.use("/api/people", personRouter);
  app.use("/api/feed", feedRouter);
  app.use("/api/forum", forumRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/iam", iamRouter);
  app.use("/api/images", imageRouter);

  app.use("/api/trpc", adapter);

  console.log("[DEV] Express server starting...");
  app.listen(process.env.PORT, () => {
    Sentry.captureEvent({ message: "Server successfully started." });
    console.log(`[DEV] Express server started on port ${process.env.PORT}`);
  });
})();
