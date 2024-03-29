import create, { State } from 'zustand';
import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';
import { IPersonState, IPerson } from '../../../shared';

export interface PersonService extends State {
  state: IPersonState;

  person?: IPerson;
  setPerson: (person: IPerson) => void;
}

export const usePersonService = create<PersonService>(set => ({
  state: IPersonState.Unknown,
  setPerson: (person: IPerson) =>
    set(state => {
      return { ...state, person, state: person.state };
    })
}));

export const getMe = async () => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/people/me`, options);
  await handleAPIError(response);
  return (await response.json()) as IPerson;
};

export const getPerson = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/people/${id}`, options);
  await handleAPIError(response);
  return (await response.json()) as IPerson;
};

export const getColleague = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/people/${id}/colleague`, options);
  await handleAPIError(response);
  return (await response.json()) as IPerson;
};

export const createPerson = async (
  id: string,
  firstName: string,
  lastName: string,
  email?: string,
  phoneNumber?: string
) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const body = {
    id,
    firstName,
    lastName,
    email,
    phoneNumber
  };

  const response = await fetch(`${baseUrl}/people`, { ...options, method: 'POST', body: JSON.stringify(body) });
  await handleAPIError(response);
  return response.json();
};

export const followOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const body = {
    id,
    type: 'Organisation'
  };

  const response = await fetch(`${baseUrl}/people/me/follow`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  await handleAPIError(response);
  return response.json();
};

export const followProject = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const body = {
    id,
    type: 'Project'
  };

  const response = await fetch(`${baseUrl}/people/me/follow`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  });
  await handleAPIError(response);
  return response.json();
};
