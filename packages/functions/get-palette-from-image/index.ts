import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as Tracing from '@sentry/tracing';
import * as Sentry from '@sentry/node';

import Vibrant = require('node-vibrant')

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

(async () => {
  const dsn = await getSetting('connections:sentry:microservices_dsn');
  const environmentName = process.env.ENVIRONMENT_NAME || process.env.NODE_ENV;

  Sentry.init({
    dsn,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true })
    ],
    environment: process.env.NODE_ENV === 'production' ? environmentName : 'local'
  });
})()

const GetPaletteFromImage: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const traceId = req.headers['sentry-trace'];
  const options = (() => {
    if (!traceId) return {};
    return Tracing.extractTraceparentData(traceId);
  })()
  const transaction = Sentry.startTransaction({ name: 'Uploading image...', ...options });
  Sentry.configureScope(scope => scope.setSpan(transaction));

  try {

    const palette = await Vibrant.from(req.body.url).getPalette()
    context.res = {
      status: Status.Success,
      body: {
        color: palette.Vibrant.hex
      }
    };

  } catch (e) {

    Sentry.captureException(e);
    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

  transaction.finish();
  await Sentry.flush(2000)

};

export default GetPaletteFromImage;