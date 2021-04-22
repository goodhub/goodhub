import { AzureFunction, Context, HttpRequest } from '@azure/functions';
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


enum Status {
  Success = 200,
  Failure = 400
}

export const HandleUserSignUp: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const transaction = Sentry.startTransaction({ name: 'Handle user sign up' });
  Sentry.configureScope(scope => scope.setSpan(transaction));

  try {

    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const extensionKey = `extension_${formattedExtensionAppId}_`;


    const email = req.body?.email;
    if (!email) throw new Error('Missing email in the token body');

    const token = await authenticateWithCoreAPI();
    const invites = await getInvitesForEmail(email, token);
    const bootstrappedUser = await bootstrapUser(token)
    const { id } = bootstrappedUser;
    await Promise.all(invites.map(i => redeemInvite(i.id, id, token )));
    const organisations = invites.map(i => i.organisationId);

    const response = {
      "version": "1.0.0",
      "action": "Continue",
      [extensionKey + 'Organisations']:  organisations.join(),
      [extensionKey + 'PersonId']:  id
    }

    context.res = {
      status: Status.Success,
      body: response
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

const bootstrapUser = async (token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'connections:core:base_url' : 'connections:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/people/bootstrap`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Could not bootstrap this person: ${await response.text()}`);
  }

  const results = await response.json();
  return results;
}

const getInvitesForEmail = async (email: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'connections:core:base_url' : 'connections:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/organisations/invites?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Could not redeem invites for this person: ${await response.text()}`);
  }

  const results = await response.json();
  return results;
}

const redeemInvite = async (id: string, personId: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'connections:core:base_url' : 'connections:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/organisations/invites/${id}/redeem`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    },
    body: JSON.stringify({
      personId
    })
  })

  const results = await response.json();
  return results;
}