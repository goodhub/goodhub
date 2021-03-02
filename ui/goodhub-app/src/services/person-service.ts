import create, { State } from 'zustand';
import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export interface Person {
  id: string
  oid: string
  firstName: string
  lastName: string
  organisations: string[]

  profilePicture?: string
  email?: string
  phoneNumber?: string
}

export enum PersonState {
  Unknown = 'Unknown',
  RequiresOnboarding = 'RequiresOnboarding',
  Identified = 'Identified'
}

export interface PersonService extends State {
  state: PersonState

  person?: Person
  setPerson: (person: Person) => void
  setRequiresOnboarding: () => void
}

export const usePersonService = create<PersonService>((set) => ({
  state: PersonState.Unknown,
  setPerson: (person: Person) => set(state => {
    return { ...state, person, state: PersonState.Identified }
  }),
  setRequiresOnboarding: () => set(state => {
    return { ...state, state: PersonState.RequiresOnboarding }
  })
}))


export const getPerson = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/people?oId=${id}`, options);
  await handleAPIError(response);
  return response.json();
};

export const createPerson = async (id: string, firstName: string, lastName: string, email?: string, phoneNumber?: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const body = {
    id, firstName, lastName, email, phoneNumber
  }

  const response = await fetch(`${baseUrl}/people`, { ...options, method: 'POST', body: JSON.stringify(body) });
  await handleAPIError(response);
  return response.json();
};