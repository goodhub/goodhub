import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

export const HandleUserSignUp: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    console.log(req.body);
    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const organisationsKey = `extension_${formattedExtensionAppId}_Organisations`;

    const [ email ] = req.body.emails ?? [];    

    const token = await authenticateWithCoreAPI();
    const invites = await getInvitesForEmail(email, token);

    await Promise.all(invites.map(i => redeemInvite(i.id, token)));
    const organisations = invites.filter(i => i.status === 'Pending').map(i => i.organisationId);

    const response = {
      "version": "1.0.0",
      "action": "Continue",
      [organisationsKey]:  organisations.join()
    }

    console.log(status)

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

const getInvitesForEmail = async (email: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/organisations/invites?email=${email}`, {
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

const redeemInvite = async (id: string, token: any) => {
  const apiBaseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');

  const response = await fetch(`${apiBaseURL}/organisations/invites/${id}/redeem`, {
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