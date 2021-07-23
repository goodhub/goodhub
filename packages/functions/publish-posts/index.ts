import { AzureFunction, Context } from '@azure/functions';
import fetch from 'node-fetch';

import * as Sentry from '@sentry/node';

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

const PublishPosts: AzureFunction = async function (context: Context): Promise<void> {

  const transaction = Sentry.startTransaction({ name: 'Publish pending posts' });
  Sentry.configureScope(scope => scope.setSpan(transaction));

  try {

    const token = await authenticateWithCoreAPI();
    const result = await publishPendingPosts(token);
    context.log(result);
    Sentry.captureMessage(result.message);

  } catch (e) {

    Sentry.captureException(e);
  }

  transaction.finish();
  await Sentry.flush(2000)
};

export default PublishPosts;

const authenticateWithCoreAPI = async () => {
  const tenant = await getSetting('infra:azure_b2c:tenant_id')
  const appId = await getSetting('infra:azure_b2c:management_app_id');
  const appPassword = await getSetting('infra:azure_b2c:management_app_password')
  const grantType = 'client_credentials';
  const scope = encodeURIComponent('https://goodhubplayground.onmicrosoft.com/0323bd63-fd18-4eea-89bc-ffc18d48da5f/.default');
  
  const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
    body: `grant_type=${grantType}&client_id=${appId}&scope=${scope}&client_secret=${appPassword}`
  })
  
  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Communication with Azure B2C failed: ${await response.text()}`);
  }

  const token = await response.json();
  return token;
}

const publishPendingPosts = async (token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'connections:core:base_url' : 'connections:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/posts/publish`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Could not publish posts: ${await response.text()}`);
  }

  const results = await response.json();
  return results;
}