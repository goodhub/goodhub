import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

export const AddOrganisationToUser: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {
    
    const personId = req.body?.personId;
    const organisationId = req.body?.organisationId;
  
    if (!personId || !organisationId) throw new Error('Not all required parameters have been supplied.');
    
    const token = await authenticateWithGraph();
  
    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const customPrefix = `extension_${formattedExtensionAppId}_`;
  
    const user = await getOrganisationsForUser(personId, customPrefix, token);
    const existingIndex = user.organisations.findIndex(o => o === organisationId); 
    if (existingIndex === -1) user.organisations.push(organisationId)
    
    const results = await updateOrganisationForUser(user.id, customPrefix, user.organisations, token);

    context.res = {
      status: Status.Success,
      body: results
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

export const authenticateWithGraph = async () => {
  const tenant = await getSetting('infra:azure_b2c:tenant_id')
  const appId = await getSetting('infra:azure_b2c:management_app_id');
  const appPassword = await getSetting('infra:azure_b2c:management_app_password')
  const grantType = 'client_credentials';
  const scope = encodeURIComponent('https://graph.microsoft.com/.default');
  
  const authResponse = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
    body: `grant_type=${grantType}&client_id=${appId}&scope=${scope}&client_secret=${appPassword}`
  })
  
  const token = await authResponse.json();
  return token;
}

export const getOrganisationsForUser = async (personId: string, prefix: string, token: any) => {
  const url = `https://graph.microsoft.com/v1.0/users?$filter=${encodeURIComponent(`${prefix}PersonId eq `)}%27${personId}%27&$select=id,${prefix}Organisations`;
  const userResponse = await fetch(url, {
    headers: { 'Content-Type': 'application/json', 'Authorization' : `${token.token_type} ${token.access_token}` }
  })

  const response = await userResponse.json();
  const [user] = response.value;
  user.organisations = user[`${prefix}Organisations`] ? user[`${prefix}Organisations`].split(',') : [];
  return user;
}

export const updateOrganisationForUser = async (oId: string, prefix: string, organisations: string[], token: any) => {
  const formattedBody = {
    [`${prefix}Organisations`]: `${organisations.join()}`
  }

  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${oId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization' : `${token.token_type} ${token.access_token}` },
    body: JSON.stringify(formattedBody)
  })

  const results = await response.text();
  return results;
}