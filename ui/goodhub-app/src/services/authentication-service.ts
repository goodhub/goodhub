import create, { State } from 'zustand';
import jwtDecode, { JwtPayload } from "jwt-decode";

import { NotAuthorisedError } from '../helpers/errors';
import { getSetting } from '../helpers/backstage';

export enum AuthenticationState {
  Authenticated = 'Authenticated',
  Unauthenticated = 'Unauthenticated',
  LoggingIn = 'LoggingIn',
  LoggingOut = 'LoggingOut',
  Failed = 'Failed'
}

export interface B2CToken extends JwtPayload { 
  given_name: string
  family_name: string
  raw: string
  extension_Organisations: string
  extension_PersonId: string
  emails: string[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  organisations: string[]
  token: B2CToken
  accessToken: B2CToken
}

const restoreAuthDetails = () => {

  
  try {
    const savedUser = window.localStorage.getItem('goodhub:me');
    if (!savedUser) throw new NotAuthorisedError('No saved user.');
    const user = JSON.parse(savedUser) as User;

    insecurelyVerifyToken(user.token);

    return {
      state: AuthenticationState.Authenticated,
      user
    }
  } catch {
    return {
      state: AuthenticationState.Unauthenticated
    }
  } 
}

const insecurelyVerifyToken = (token: B2CToken) => {
  // This is insecure, it doesn't verify the signing of the token
  // or the appropriate audience, issuer, etc. That is done on the server.

  if (!token.exp || !token.sub) {
    throw new NotAuthorisedError('JWT token is malformed.');
  }

  if (token.exp < Math.round((new Date()).getTime() / 1000)) {
    throw new NotAuthorisedError('JWT token has expired.');
  }
}

export interface AuthService extends State {
  state: AuthenticationState
  additionalMessage?: string

  user?: User

  setLoginURL: (loginURL: string) => void
  loginURL?: string

  onSuccessfulLogin: (token: string, accessToken: string) => void
  onFailedLogin: (error?: string, errorDescription?: string) => void
  onSuccessfulLogout: () => void
}

export const useAuthenticationService = create<AuthService>((set) => ({
  // When the page loads, try to restore authentication details from localStorage
  ...restoreAuthDetails(),

  setLoginURL: (loginURL: string) => set((state) => {
    return { ...state, loginURL }
  }),

  onSuccessfulLogin: (token: string, accessToken: string) => set(state => {
    const decodedToken = jwtDecode<B2CToken>(token);
    const decodedAccessToken = jwtDecode<B2CToken>(accessToken);

    decodedToken.raw = token;
    decodedAccessToken.raw = accessToken;

    insecurelyVerifyToken(decodedToken);
    insecurelyVerifyToken(decodedAccessToken);

    const user: User = {
      id: decodedToken['extension_PersonId'],
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      organisations: decodedToken['extension_Organisations'] ? decodedToken['extension_Organisations'].split(',') : [],
      token: decodedToken,
      email: decodedToken.emails?.[0],
      accessToken: decodedAccessToken, 
    }

    window.localStorage.setItem('goodhub:me', JSON.stringify(user));
    return { ...state, user, state: AuthenticationState.Authenticated }
  }),
  onFailedLogin: (error?: string, errorDescription?: string) => set(state => {
    return { ...state, state: AuthenticationState.Failed, additionalMessage: `${error} - ${decodeURI(errorDescription ?? '')}`}
  }),
  onSuccessfulLogout: () => set(state => {
    window.localStorage.removeItem('goodhub:me');
    return { ...state, user: undefined, state: AuthenticationState.Unauthenticated }
  })
}))

export const getDefaultFetchOptions = async () => {
  const { user } = useAuthenticationService.getState();
  const options: { headers: { [key: string]: string } } = { headers: { 'content-type': 'application/json', 'accept': 'application/json' }};
  if (user) options.headers['authorization'] = `Bearer ${user.accessToken.raw}`;
  const baseUrl = await getBaseURL();
  return { options, baseUrl };
}

let baseURL: string | undefined;
export const getBaseURL = async () => {
  if (baseURL) return baseURL;
  baseURL = await getSetting(process.env.NODE_ENV === 'production' ? 'auth:core:base_url' : 'auth:core:base_url_local');
  return baseURL;
}