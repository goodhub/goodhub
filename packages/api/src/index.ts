import { config } from 'dotenv';
config();

import { getSetting } from './helpers/backstage';

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import organisationRouter from './routers/organisation-router';
import personRouter from './routers/person-router';
import feedRouter from './routers/feed-router';
import forumRouter from './routers/forum-router';
import postRouter from './routers/post-router';

import db from  './services/database-client';

(async () => {
  const dsn = await getSetting('connections:sentry:core_dsn');
  const environmentName = process.env.ENVIRONMENT_NAME || process.env.NODE_ENV;

  // Database needs to be initialised before Sentry to ensure accurate logging of Postgres
  await db();

  // Initialise logging & tracing
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV === 'production' ? environmentName : 'local',
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app: app }),
      new Tracing.Integrations.Postgres()
    ]
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());


  // Initialise all routers
  app.use('/api/organisations', organisationRouter);
  app.use('/api/people', personRouter);
  app.use('/api/feed', feedRouter);
  app.use('/api/forum', forumRouter);
  app.use('/api/posts', postRouter);

  console.log('[DEV] Express server starting...')
  app.listen(process.env.PORT, () => {
    Sentry.captureEvent({ message: 'Server successfully started.'});
    console.log(`[DEV] Express server started on port ${process.env.PORT}`)
  })

})()
