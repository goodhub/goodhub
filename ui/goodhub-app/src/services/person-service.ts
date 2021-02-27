import create, { State } from 'zustand';
import { handleAPIError } from '../helpers/errors';
import { getBaseURL, getDefaultFetchOptions } from './authentication-service';

export interface Person {
  id: string
  oid: string
  firstName: string
  lastName: string
  organisations: string[]
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


export const getPersonByUserOid = async (oid: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/people?oid=${oid}`, options);
  handleAPIError(response);
  return response.json();
};