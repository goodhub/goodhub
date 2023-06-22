import jose, { type JWK, type JWS } from "node-jose";
const { JWK: jwk, JWS: jws } = jose;

import fetch from "node-fetch";

import { NotAuthorisedError } from "../common/errors";

export interface B2CToken {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  given_name: string;
  family_name: string;
  raw: string;
  extension_Organisations: string;
  extension_PersonId: string;

  personId: string;
  organisations: string[];
  emails: string[];
}

let b2cTokenStore: JWK.KeyStore;
let serverToServerTokenStore: JWK.KeyStore;

const getB2CTokenStore = async () => {
  if (b2cTokenStore) return b2cTokenStore;

  const openIdConfig = process.env.AUTH_OPEN_ID_CONFIG_URL;
  if (!openIdConfig)
    throw new NotAuthorisedError(
      "Internal configuration of authentication is not complete."
    );

  const wellknownRes = await fetch(openIdConfig);
  const openIdConnectConfiguration = await wellknownRes.json();

  const tokenStoreUrl = openIdConnectConfiguration["jwks_uri"];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  b2cTokenStore = await jwk.asKeyStore(tokenStoreJson);
  return b2cTokenStore;
};

const getServerToServerTokenStore = async () => {
  if (serverToServerTokenStore) return serverToServerTokenStore;

  const tenantId = process.env.AUTH_TENANT_ID;
  if (!tenantId)
    throw new NotAuthorisedError(
      "Internal configuration of authentication is not complete."
    );

  const openIdConfig = `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`;

  const wellknownRes = await fetch(openIdConfig);
  const openIdConnectConfiguration = await wellknownRes.json();

  const tokenStoreUrl = openIdConnectConfiguration["jwks_uri"];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  serverToServerTokenStore = await jwk.asKeyStore(tokenStoreJson);
  return serverToServerTokenStore;
};

let openIdAudience: string;

const getOpenIdAudience = async () => {
  if (openIdAudience) return openIdAudience;

  if (!process.env.AUTH_AUDIENCE_ID)
    throw new NotAuthorisedError(
      "Internal configuration of authentication is not complete."
    );
  openIdAudience = process.env.AUTH_AUDIENCE_ID;
  return openIdAudience;
};

export const verifyAuthentication = async (
  headers: any
): Promise<[B2CToken, boolean]> => {
  const authHeader = headers["authorization"];
  const serverToServer = headers["x-server-to-server"];

  if (!authHeader) {
    throw new NotAuthorisedError('No "Authorization" header found.');
  }

  const [prefix, jwt] = authHeader.split(" ");

  if (prefix !== "Bearer") {
    throw new NotAuthorisedError("Authentication is configured incorrectly.");
  }

  try {
    const keyStore = serverToServer
      ? await getServerToServerTokenStore()
      : await getB2CTokenStore();
    const key: JWS.VerificationResult = await jws.createVerify(keyStore).verify(
      jwt
    );
    const token = JSON.parse(key.payload.toString());
    if (token.exp < Math.round(new Date().getTime() / 1000)) {
      throw new NotAuthorisedError("JWT token has expired.");
    }

    const openIdAudience = await getOpenIdAudience();
    if (token.aud != openIdAudience) {
      throw new NotAuthorisedError("JWT token has an invalid audience.");
    }

    token.personId = token["extension_PersonId"];
    token.organisations = token["extension_Organisations"]
      ? token["extension_Organisations"].split(",")
      : [];
    return [token, !!serverToServer];
  } catch (e) {
    if (e instanceof NotAuthorisedError) throw e;
    throw new NotAuthorisedError("JWT token is invalid.");
  }
};

export enum AuthorisationLevel {
  OrganisationMember = "OrganisationMember",
  OrganisationAdmin = "OrganisationAdmin",
}

export const hasAuthorisation = (token: any, targetOrganisation: string) => {
  const personId = token.personId;
  if (!personId) throw new NotAuthorisedError("No person identified.");

  const organisations = token.organisations;
  if (!organisations)
    throw new NotAuthorisedError("No organisations identified.");

  if (organisations.includes(targetOrganisation))
    return [
      AuthorisationLevel.OrganisationAdmin,
      AuthorisationLevel.OrganisationMember,
    ];
  return [];
};
