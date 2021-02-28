import { JWK, JWS } from 'node-jose';
import fetch from 'node-fetch';

import { NotAuthorisedError } from '../common/errors';
import { getSetting } from './backstage';

let b2cTokenStore: JWK.KeyStore;
let serverToServerTokenStore: JWK.KeyStore;

const getB2CTokenStore = async () => {
  if (b2cTokenStore) return b2cTokenStore;

  const openIdConfig = await getSetting('auth:azure_b2c:openid_config_url');
  if (!openIdConfig) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

  const wellknownRes = await fetch(openIdConfig);
  const openIdConnectConfiguration = await wellknownRes.json();

  const tokenStoreUrl = openIdConnectConfiguration['jwks_uri'];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  b2cTokenStore = await JWK.asKeyStore(tokenStoreJson);
  return b2cTokenStore;
}

const getServerToServerTokenStore = async () => {
  if (serverToServerTokenStore) return serverToServerTokenStore;

  const tenantId = await getSetting('infra:azure_b2c:tenant_id');
  if (!tenantId) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

  const openIdConfig = `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`;

  const wellknownRes = await fetch(openIdConfig);
  const openIdConnectConfiguration = await wellknownRes.json();

  const tokenStoreUrl = openIdConnectConfiguration['jwks_uri'];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  serverToServerTokenStore = await JWK.asKeyStore(tokenStoreJson);
  return serverToServerTokenStore;
}

let openIdAudience: string;

const getOpenIdAudience = async () => {
  if (openIdAudience) return openIdAudience;

  openIdAudience = await getSetting('auth:azure_b2c:openid_audience');
  if (!openIdAudience) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');
  return openIdAudience;
}

export const verifyAuth = async (headers: any) => {
  const authHeader = headers['authorization']
  const serverToServer = headers['x-server-to-server'];
  
  if (!authHeader) {
    throw new NotAuthorisedError('No "Authorization" header found.');
  }

  const [prefix, jwt] = authHeader.split(' ');

  if (prefix !== 'Bearer') {
    throw new NotAuthorisedError('Authentication is configured incorrectly.');
  }


  try {
    const keyStore = serverToServer ? await getServerToServerTokenStore() : await getB2CTokenStore()
    const key: JWS.VerificationResult = await JWS.createVerify(keyStore).verify(jwt);
    const token = JSON.parse(key.payload.toString());
    if (token.exp < Math.round((new Date).getTime() / 1000)) {
      throw new NotAuthorisedError('JWT token has expired.');
    }

    const openIdAudience = await getOpenIdAudience();
    if (token.aud != openIdAudience) {
      throw new NotAuthorisedError('JWT token has an invalid audience.');
    }
  } catch (e) {
    if (e instanceof NotAuthorisedError) throw e;
    throw new NotAuthorisedError('JWT token is invalid.');
  }
}
