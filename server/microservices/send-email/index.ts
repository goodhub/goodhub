import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as sendGrid from '@sendgrid/mail';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

const SendEmail: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const to = req.body?.to;
    const from = req.body?.from;
  
    if (false) throw new Error('Not all required parameters have been supplied.');
    
    const apiKey = await getSetting('email:sendgrid:api_key');
    sendGrid.setApiKey(apiKey);

    const fromDomain = await getSetting('email:sendgrid:from_domain');

    const email = {
      to: to,
      from: `${from}@${fromDomain}`,
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    await sendGrid.send(email)

    context.res = {
      status: Status.Success,
      body: {}
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

export default SendEmail;