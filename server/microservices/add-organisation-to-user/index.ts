import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import fetch from 'node-fetch';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

export const AddOrganisationToUser: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {
    
    const oId = req.body?.oId;
    const organisationId = req.body?.organisationId;
  
    if (!oId || !organisationId) throw new Error('Not all required parameters have been supplied.');
    
    const token = await authenticateWithGraph();
  
    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const organisationsKey = `extension_${formattedExtensionAppId}_Organisations`;
  
    const organisations = await getOrganisationsForUser(oId, organisationsKey, token);
    const existingIndex = organisations.findIndex(o => o === organisationId); 
    if (existingIndex === -1) organisations.push(organisationId)
    
    const results = updateOrganisationForUser(oId, organisationsKey, organisations, token);

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
  
  const authReponse = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
    body: `grant_type=${grantType}&client_id=${appId}&scope=${scope}&client_secret=${appPassword}`
  })
  
  const token = await authReponse.json();
  return token;
}

export const getOrganisationsForUser = async (oId: string, key: string, token: any) => {
  const userResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${oId}?$select=${key}`, {
    headers: { 'Content-Type': 'application/json', 'Authorization' : `${token.token_type} ${token.access_token}` }
  })

  const user = await userResponse.json();
  const existingOrganisations: string[] = user[key] ? user[key].split(',') : [];
  return existingOrganisations;
}

export const updateOrganisationForUser = async (oId: string, key: string, organisations: string[], token: any) => {
  const formattedBody = {
    [key]: `${organisations.join()}`
  }

  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${oId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Authorization' : `${token.token_type} ${token.access_token}` },
    body: JSON.stringify(formattedBody)
  })

  const results = await response.text();
  return results;
}