import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

export const HandleUserSignUp: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const extensionKey = `extension_${formattedExtensionAppId}_`;


    context.log(req.body);
    const email = req.body?.email;
    if (!email) throw new Error('Missing email in the token body');

    const token = await authenticateWithCoreAPI();
    const invites = await getInvitesForEmail(email, token);
    const bootstrappedUser = await bootstrapUser(token)
    context.log(bootstrappedUser);
    const { id } = bootstrappedUser;
    await Promise.all(invites.map(i => redeemInvite(i.id, token, id)));
    const organisations = invites.filter(i => i.status === 'Pending').map(i => i.organisationId);

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

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

const authenticateWithCoreAPI = async () => {
  const tenant = await getSetting('infra:azure_b2c:tenant_id')
  const appId = await getSetting('infra:azure_b2c:management_app_id');
  const appPassword = await getSetting('infra:azure_b2c:management_app_password')
  const grantType = 'client_credentials';
  const scope = encodeURIComponent('https://goodhubplayground.onmicrosoft.com/0323bd63-fd18-4eea-89bc-ffc18d48da5f/.default');
  
  const authReponse = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
    body: `grant_type=${grantType}&client_id=${appId}&scope=${scope}&client_secret=${appPassword}`
  })
  
  const token = await authReponse.json();
  return token;
}

const bootstrapUser = async (token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/people/bootstrap`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  const results = await response.json();
  return results;
}

const getInvitesForEmail = async (email: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/organisations/invites?email=${encodeURIComponent(email)}`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  const results = await response.json();
  return results;
}

const redeemInvite = async (id: string, personId: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');

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