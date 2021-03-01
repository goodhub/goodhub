import { config } from 'dotenv';
config();

import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

import organisationRouter from './routers/organisation-router';
app.use('/api/organisations', organisationRouter);

import personRouter from './routers/person-router';
app.use('/api/people', personRouter);

console.log('[DEV] Express server starting...')
app.listen(process.env.PORT, () => {
  console.log(`[DEV] Express server started on port ${process.env.PORT}`)
})