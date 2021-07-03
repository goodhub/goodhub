import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as sendGrid from '@sendgrid/mail';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { getSetting } from '../backstage';

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

enum Status {
  Success = 200,
  Failure = 400
}

const SendEmail: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const traceId = req.headers['sentry-trace'];
  const options = Tracing.extractTraceparentData(traceId);
  const transaction = Sentry.startTransaction({ name: 'Sending email (SendGrid)', ...options });
  Sentry.configureScope(scope => scope.setSpan(transaction));

  try {

    const to = req.body?.to;
    const from = req.body?.from;
    const body = req.body?.body;
  
    if (!to || !from || !body) throw new Error('Not all required parameters have been supplied.');
    
    const apiKey = await getSetting('email:sendgrid:api_key');
    sendGrid.setApiKey(apiKey);

    const fromDomain = await getSetting('email:sendgrid:from_domain');

    const email = {
      to: to,
      from: `${from}@${fromDomain}`,
      subject: 'A new message from GoodHub',
      html: body,
    }

    await sendGrid.send(email)

    context.res = {
      status: Status.Success,
      body: {}
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
  console.log('Done!');
};

export default SendEmail;