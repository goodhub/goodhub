import { JWK, JWS } from 'node-jose';
import fetch from 'node-fetch';

import { NotAuthorisedError } from '../common/errors';
import { getSetting } from './backstage';

let jwtTokenStore: JWK.KeyStore;

async function getTokenStore() {
  if (jwtTokenStore) return jwtTokenStore;

  const openIdConfig = await getSetting('auth:azure_b2c:openid_config_url');
  if (!openIdConfig) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');

  const wellknownRes = await fetch(openIdConfig);
  const openIdConnectConfiguration = await wellknownRes.json();

  const tokenStoreUrl = openIdConnectConfiguration['jwks_uri'];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  jwtTokenStore = await JWK.asKeyStore(tokenStoreJson);
  return jwtTokenStore;
}

let openIdAudience: string;

const getOpenIdAudience = async () => {
  if (openIdAudience) return openIdAudience;

  openIdAudience = await getSetting('auth:azure_b2c:openid_audience');
  if (!openIdAudience) throw new NotAuthorisedError('Internal configuration of authentication is not complete.');
}

export const verifyAuth = async (headers: any) => {
  const authHeader = headers['authorization']
  
  if (!authHeader) {
    throw new NotAuthorisedError('No "Authorization" header found.');
  }

  const [prefix, jwt] = authHeader.split(' ');

  if (prefix !== 'Bearer') {
    throw new NotAuthorisedError('Authentication is configured incorrectly.');
  }


  try {
    const keyStore = await getTokenStore()
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
