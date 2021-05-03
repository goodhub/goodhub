import { IOrganisation, IProject } from '@strawberrylemonade/goodhub-lib';
import create, { State } from 'zustand';
import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export const getOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}`, options);
  await handleAPIError(response);
  return response.json();
};

export const createOrganisation = async (candidate: IOrganisation & { teamMembers: string []}) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations`, { ...options, method: 'POST', body: JSON.stringify(candidate)});
  await handleAPIError(response);
  return await response.json() as IOrganisation;
};

export const updateOrganisation = async (id: string, candidate: IOrganisation) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}`, { ...options, method: 'PUT', body: JSON.stringify(candidate)});
  await handleAPIError(response);
  return await response.json() as IOrganisation;
};

export const getExtendedOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/extended`, options);
  await handleAPIError(response);
  return response.json();
};

export const getOrganisationSensitiveInfo = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/sensitive`, options);
  await handleAPIError(response);
  return response.json();
};

export const getInvitesForOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/invites`, options);
  await handleAPIError(response);
  return response.json();
};

export const inviteTeamMember = async (id: string, invite: any) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/invites`, { ...options, method: 'POST', body: JSON.stringify(invite) });
  await handleAPIError(response);
  return await response.json();
};

export const revokeInviteById = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/invites/${id}`, { ...options, method: 'DELETE' });
  await handleAPIError(response);
  return await response.json();
};

export const getInvite = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/invites/${id}`, options);
  await handleAPIError(response);
  return response.json();
};

export const acceptInviteById = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/invites/${id}/accept`, { ...options, method: 'POST' });
  await handleAPIError(response);
  return response.json();
};

export const removeMemberById = async (orgId: string, id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${orgId}/members/${id}`, { ...options, method: 'DELETE' });
  await handleAPIError(response);
  return await response.json() as IOrganisation;
};

export const createProject = async (id: string, project: Partial<IProject>) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/projects`, { ...options, method: 'POST', body: JSON.stringify(project) });
  await handleAPIError(response);
  return await response.json() as IProject;
};


export const getProjectsForOrganisation = async (id: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/organisations/${id}/projects`, options);
  await handleAPIError(response);
  return await response.json() as IProject[];
};


enum OrganisationState {
  Unknown = 'Unknown',
  Loading = 'Loading',
  Identified = 'Identified'
}

export interface OrganisationService extends State {
  state: OrganisationState

  organisation?: IOrganisation
  setOrganisation: (organisation?: IOrganisation) => void
}

export const useOrganisationService = create<OrganisationService>((set) => ({
  state: OrganisationState.Unknown,
  setOrganisation: (organisation?: IOrganisation) => set(state => ({ ...state, state: OrganisationState.Identified, organisation }))
}))
