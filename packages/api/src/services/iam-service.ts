import { getInvitesByEmail, redeemInvites } from './invite-service';
import { bootstrapPerson } from './person-service';
import fetch from 'node-fetch';
import { MissingParameterError } from '../common/errors';

export const addOrganisationToUser = async (personId: string, organisationId: string) => {
  if (!personId || !organisationId) throw new MissingParameterError('Not all required parameters have been supplied.');
  
  const token = await authenticateWithGraph();

  const extensionAppId = process.env.AUTH_EXTENSION_ID
  const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
  const customPrefix = `extension_${formattedExtensionAppId}_`;

  const user = await getOrganisationsForUser(personId, customPrefix, token);
  const existingIndex = user.organisations.findIndex((o: string) => o === organisationId); 
  if (existingIndex === -1) user.organisations.push(organisationId)
  
  return await updateOrganisationForUser(user.id, customPrefix, user.organisations, token);
}

export const removeOrganisationFromUser = async (personId: string, organisationId: string) => {
  if (!personId || !organisationId) throw new MissingParameterError('Not all required parameters have been supplied.');

  const token = await authenticateWithGraph();
  
  const extensionAppId = process.env.AUTH_EXTENSION_ID
  const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
  const organisationsKey = `extension_${formattedExtensionAppId}_`;

  const user = await getOrganisationsForUser(personId, organisationsKey, token);
  const organisations = user.organisations.filter((o: string) => o !== organisationId);
  
  return updateOrganisationForUser(user.id, organisationsKey, organisations, token);
}

export const handleUserSignUp = async (email: string) => {
  const extensionAppId = process.env.AUTH_EXTENSION_ID
  const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
  const extensionKey = `extension_${formattedExtensionAppId}_`;


  if (!email) throw new Error('Missing email in the token body');

  const invites = await getInvitesByEmail(email);
  const user = await bootstrapPerson()
  await redeemInvites(invites.map(i => i.id), user.id)
  const organisations = invites.map(i => i.organisationId);

  const response = {
    "version": "1.0.0",
    "action": "Continue",
    [extensionKey + 'Organisations']: organisations.join(),
    [extensionKey + 'PersonId']: user.id
  }
  return response;
}


const authenticateWithGraph = async () => {
  const tenant = process.env.AUTH_TENANT_ID
  const appId = process.env.AUTH_GRAPH_MANAGEMENT_ID
  const appPassword = process.env.AUTH_GRAPH_MANAGEMENT_PASSWORD
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

const getOrganisationsForUser = async (personId: string, prefix: string, token: any) => {
  const url = `https://graph.microsoft.com/v1.0/users?$filter=${encodeURIComponent(`${prefix}PersonId eq `)}%27${personId}%27&$select=id,${prefix}Organisations`;
  const userResponse = await fetch(url, {
    headers: { 'Content-Type': 'application/json', 'Authorization' : `${token.token_type} ${token.access_token}` }
  })

  const response = await userResponse.json();
  const [user] = response.value;
  user.organisations = user[`${prefix}Organisations`] ? user[`${prefix}Organisations`].split(',') : [];
  return user;
}

const updateOrganisationForUser = async (oId: string, prefix: string, organisations: string[], token: any) => {
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